from sqlalchemy import select
from backend.app.models.job import Job


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

        db.add(
            Job(
                source_id=item["id"],
                title=item["title"],
                company=item["company_name"],
                location=item["candidate_required_location"],
                job_type=item["job_type"],
                category=item["category"],
                salary=item.get("salary"),
            )
        )

        saved += 1

    db.commit()

    return saved