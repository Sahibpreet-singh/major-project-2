from backend.app.services.clean_jobs import clean_all_jobs
from backend.app.services.job_service import save_jobs
from backend.app.db.database import SessionLocal
from apscheduler.schedulers.asyncio import AsyncIOScheduler

scheduler = AsyncIOScheduler()

async def update_jobs():
    db = SessionLocal()
    try:
        jobs = await clean_all_jobs()   # <-- FIX
        save_jobs(db, jobs)
        print("Jobs updated successfully")
    finally:
        db.close()

def start_scheduler():
    scheduler.add_job(
        update_jobs,
        "interval",
        hours=24
    )
    scheduler.start()