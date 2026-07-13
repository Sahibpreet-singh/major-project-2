from backend.app.services.fetch_jobs import fetch_jobs
from backend.app.services.job_service import save_jobs
from backend.app.db.database import SessionLocal
from apscheduler.schedulers.asyncio import AsyncIOScheduler

scheduler=AsyncIOScheduler()

async def update_jobs():
    db=SessionLocal()
    try:
        jobs=await fetch_jobs()
        save_jobs(db, jobs)
        print("jobs updated")

    finally:
        db.close()

def start_scheduler():
    scheduler.add_job(
        update_jobs,
        "interval",
        hours=24
    )

    scheduler.start()
    
