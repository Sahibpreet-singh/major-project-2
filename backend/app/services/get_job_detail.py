from backend.app.models.job import Job

def get_job_details(db, job_id: int):
    job = (
        db.query(Job)
        .filter(Job.id == job_id)
        .first()
    )

    if not job:
        return {"error": "Job not found"}

    return {
        "id": job.id,
        "title": job.title,
        "company": job.company,
        "location": job.location,
        "category": job.category,
        "job_type": job.job_type,
        "salary": job.salary,
        "description": job.description,
        "job_url": job.job_url,
        "published_date": job.published_date,
    }

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