from langchain_core.tools import tool
from sqlalchemy import or_

from backend.app.db.database import SessionLocal
from backend.app.models.job import Job


@tool
def search_jobs(query: str):
    """
    Search jobs by title, company or location.
    """

    db = SessionLocal()

    try:

        jobs = (
            db.query(Job)
            .filter(
                or_(
                    Job.title.ilike(f"%{query}%"),
                    Job.company.ilike(f"%{query}%"),
                    Job.location.ilike(f"%{query}%"),
                )
            )
            .limit(10)
            .all()
        )

        return [
            {
                "id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "job_type": job.job_type,
            }
            for job in jobs
        ]

    finally:
        db.close()

from langchain_core.tools import tool
from backend.app.db.database import SessionLocal
from backend.app.services.get_job_detail import get_job_details

@tool
def job_details(job_id: int):
    """
    Return complete details for a job using its ID.
    """

    db = SessionLocal()

    try:
        return get_job_details(db, job_id)

    finally:
        db.close()

def get_recent_jobs(db, limit: int = 10):
    jobs = (
        db.query(Job)
        .order_by(Job.published_date.desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "job_type": job.job_type,
            "published_date": job.published_date,
        }
        for job in jobs
    ]

@tool
def recent_jobs(limit: int = 10):
    """
    Returns the newest jobs ordered by published date.

    Args:
        limit: Maximum number of jobs to return.

    Returns:
        A list containing:
        - job id
        - title
        - company
        - location
        - job type
        - published date
    """

    db = SessionLocal()

    try:
        return get_recent_jobs(db, limit)

    finally:
        db.close()



