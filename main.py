from fastapi import FastAPI
from backend.app.services.fetch_jobs import fetch_jobs
from backend.app.services.cleaned import clean_all_jobs
from fastapi import Depends
from sqlalchemy.orm import Session

from backend.app.dependencies import get_db
from backend.app.services.job_service import save_jobs
from backend.app.services.analytic import overview
app = FastAPI()


@app.get("/")
def root():
    return {"message": "Backend is running!"}


@app.get("/jobs")
async def get_jobs():
    return await fetch_jobs()

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

    save_jobs(db, jobs)

    return {
        "message": "Jobs saved successfully",
        "count": len(jobs)
    }