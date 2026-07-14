from backend.app.models.job import Job
from backend.app.models.skill import Skill
from backend.app.models.job_skill import JobSkill


def save_jobs(db, jobs):

    saved = 0

    for item in jobs:

        exists = (
            db.query(Job)
            .filter(Job.source_id == item["id"])
            .first()
        )

        if exists:
            continue


        new_job = Job(
            source_id=item["id"],
            title=item["title"],
            company=item["company"],
            company_logo=item.get("company_logo"),
            job_url=item["job_url"],
            location=item["location"],
            job_type=item["job_type"],
            category=item["category"],
            salary=item.get("salary"),
            description=item.get("description"),
            published_date=item.get("published_date")
        )

        db.add(new_job)
        db.flush()


        # save skills
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