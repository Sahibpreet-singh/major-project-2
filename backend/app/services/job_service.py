from backend.app.models.job import Job


def save_jobs(db, jobs):

    saved_count = 0

    for job in jobs:
        db_job = Job(
            source_id=job.get("id"),
            title=job.get("title"),
            company=job.get("company_name"),
            location=job.get("candidate_required_location"),
            job_type=job.get("job_type"),
            category=job.get("category"),
            salary=job.get("salary")
        )

        db.add(db_job)
        saved_count += 1

    db.commit()

    return saved_count

def get_all_jobs(db):

    return db.query(Job).all()