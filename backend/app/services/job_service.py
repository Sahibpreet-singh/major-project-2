from sqlalchemy import or_
from backend.app.models.job import Job
from backend.app.models.skill import Skill
from backend.app.models.job_skill import JobSkill
from fastapi import HTTPException

def get_job_by_id(db, job_id):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job

def save_jobs(db, jobs):

    saved = 0

    for item in jobs:

        exists = (
            db.query(Job)
            .filter(Job.source_id == item["source_id"])
            .first()
        )

        if exists:
            continue

        new_job = Job(
            source=item["source"],
            source_id=item["source_id"],
            title=item["title"],
            company=item["company"],
            company_logo=item.get("company_logo"),
            job_url=item["job_url"],
            category=item["category"],
            job_type=item["job_type"],
            location=item["location"],
            salary=item.get("salary"),
            description=item.get("description"),
            published_date=item.get("published_date")
        )

        db.add(new_job)
        db.flush()

        for tag in item.get("tags", []):

            skill = (
                db.query(Skill)
                .filter(Skill.name == tag)
                .first()
            )

            if not skill:
                skill = Skill(name=tag)
                db.add(skill)
                db.flush()

            db.add(
                JobSkill(
                    job_id=new_job.id,
                    skill_id=skill.id
                )
            )

        saved += 1

    db.commit()

    return saved


def get_all_jobs(db):

    return db.query(Job).all()



from sqlalchemy import or_
from backend.app.models.job import Job
from backend.app.models.skill import Skill
from backend.app.models.job_skill import JobSkill


def search_jobs(
    db,
    search=None,
    company=None,
    location=None,
    category=None,
    job_type=None,
    skill=None,
    sort="newest",
    page=1,
    limit=20,
):

    query = db.query(Job)

    if skill:
        query = (
            query.join(JobSkill)
                 .join(Skill)
                 .filter(Skill.name.ilike(f"%{skill}%"))
        )

    if search:
        query = query.filter(
            or_(
                Job.title.ilike(f"%{search}%"),
                Job.company.ilike(f"%{search}%"),
                Job.description.ilike(f"%{search}%")
            )
        )

    if company:
        query = query.filter(Job.company.ilike(f"%{company}%"))

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    if category:
        query = query.filter(Job.category.ilike(f"%{category}%"))

    if job_type:
        query = query.filter(Job.job_type.ilike(f"%{job_type}%"))

    if sort == "newest":
        query = query.order_by(Job.id.desc())

    elif sort == "oldest":
        query = query.order_by(Job.id.asc())

    elif sort == "company":
        query = query.order_by(Job.company.asc())

    total = query.count()

    jobs = (
        query.offset((page - 1) * limit)
             .limit(limit)
             .all()
    )

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "results": jobs
    }