from fastapi import FastAPI
from backend.app.services.fetch_jobs import fetch_jobs
from backend.app.services.cleaned import clean_all_jobs
from fastapi import Depends
from sqlalchemy.orm import Session
from backend.app.schemas.job_schema import JobResponse
from sqlalchemy.orm import Session
from fastapi import Depends
from backend.app.services.job_service import get_all_jobs
from backend.app.dependencies import get_db
from backend.app.services.job_service import save_jobs
from backend.app.services.analytic import overview
from backend.app.scheduler.job_scheduler import start_scheduler

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    start_scheduler()

@app.get("/")
def root():
    return {"message": "Backend is running!"}


@app.get("/jobs")
def get_jobs(
    db: Session = Depends(get_db)
):
    return get_all_jobs(db)

@app.get("/clean-jobs")
async def print_jobs():
    jobs=await clean_all_jobs()
    return jobs

@app.get("/analytic/overview")
async def analytics_overview():
    jobs=await fetch_jobs()
    cleaned_jobs=cleaned_jobs(jobs)
    return await overview(cleaned_jobs)

@app.post("/jobs/save")
async def save_jobs_to_db(db: Session = Depends(get_db)):

    jobs = await fetch_jobs()
    
    count = save_jobs(db, jobs)

    return {
        "message": "Jobs saved",
        "count": count
    }


