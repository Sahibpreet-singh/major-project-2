from app.db.database import SessionLocal
from app.models.job import Job


def save_jobs(jobs):

    db = SessionLocal()

    try:

        for item in jobs:

            exists = (
                db.query(Job)
                .filter(Job.job_url == item["job_url"])
                .first()
            )

            if exists:
                continue

            db.add(
                Job(
                    title=item["title"],
                    company=item["company"],
                    location=item["location"],
                    salary=item.get("salary"),
                    job_url=item["job_url"],
                )
            )

        db.commit()

    finally:
        db.close()