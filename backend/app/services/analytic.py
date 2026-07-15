from sqlalchemy import func

from backend.app.models.job import Job
from backend.app.models.skill import Skill
from backend.app.models.job_skill import JobSkill


def get_overview(db):

    return {
        "total_jobs": db.query(Job).count(),
        "total_companies": db.query(Job.company).distinct().count(),
        "total_skills": db.query(Skill).count()
    }


def get_top_skills(db, limit=10):

    results = (
        db.query(
            Skill.name,
            func.count(JobSkill.job_id).label("jobs")
        )
        .join(JobSkill, Skill.id == JobSkill.skill_id)
        .group_by(Skill.id, Skill.name)
        .order_by(func.count(JobSkill.job_id).desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "skill": skill,
            "jobs": jobs
        }
        for skill, jobs in results
    ]


def get_top_companies(db, limit=10):

    results = (
        db.query(
            Job.company,
            func.count(Job.id).label("jobs")
        )
        .group_by(Job.company)
        .order_by(func.count(Job.id).desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "company": company,
            "jobs": jobs
        }
        for company, jobs in results
    ]


def get_top_categories(db, limit=10):

    results = (
        db.query(
            Job.category,
            func.count(Job.id).label("jobs")
        )
        .group_by(Job.category)
        .order_by(func.count(Job.id).desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "category": category,
            "jobs": jobs
        }
        for category, jobs in results
    ]


def get_top_locations(db, limit=10):

    results = (
        db.query(
            Job.location,
            func.count(Job.id).label("jobs")
        )
        .group_by(Job.location)
        .order_by(func.count(Job.id).desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "location": location,
            "jobs": jobs
        }
        for location, jobs in results
    ]


def get_job_types(db):

    results = (
        db.query(
            Job.job_type,
            func.count(Job.id).label("jobs")
        )
        .group_by(Job.job_type)
        .order_by(func.count(Job.id).desc())
        .all()
    )

    return [
        {
            "job_type": job_type,
            "jobs": jobs
        }
        for job_type, jobs in results
    ]


def get_salary_overview(db):

    with_salary = (
        db.query(Job)
        .filter(Job.salary.isnot(None))
        .count()
    )

    without_salary = (
        db.query(Job)
        .filter(Job.salary.is_(None))
        .count()
    )

    return {
        "with_salary": with_salary,
        "without_salary": without_salary,
        "total_jobs": with_salary + without_salary
    }