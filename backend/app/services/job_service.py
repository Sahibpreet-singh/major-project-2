
from backend.app.models.job import Job


def save_jobs(db, jobs):

    for job in jobs:
        db_job = Job(
            title=job.get("title"),
            company=job.get("company_name"),
            location=job.get("candidate_required_location"),
            job_type=job.get("job_type"),
            category=job.get("category"),
            salary=job.get("salary")
        )

        db.add(db_job)

    db.commit()