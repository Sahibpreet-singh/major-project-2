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
from backend.app.scheduler.job_scheduler import start_scheduler
from backend.app.services.analytic import (
    get_overview,
    get_top_skills,
    get_top_companies,
    get_top_categories,
    get_top_locations,
    get_job_types,
    get_salary_overview
)
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
def analytics_overview(db: Session = Depends(get_db)):
    return get_overview(db)
    

@app.post("/jobs/save")
async def save_jobs_to_db(db: Session = Depends(get_db)):

    jobs = await clean_all_jobs()

    count = save_jobs(db, jobs)

    return {
        "message": "Jobs saved",
        "count": count
    }

@app.get("/analytics/top-skills")
def top_skills(db: Session = Depends(get_db)):
    return get_top_skills(db)

@app.get("/analytics/overview")
def analytics_overview(db: Session = Depends(get_db)):
    return get_overview(db)


@app.get("/analytics/top-skills")
def analytics_top_skills(db: Session = Depends(get_db)):
    return get_top_skills(db)


@app.get("/analytics/top-companies")
def analytics_top_companies(db: Session = Depends(get_db)):
    return get_top_companies(db)


@app.get("/analytics/top-categories")
def analytics_top_categories(db: Session = Depends(get_db)):
    return get_top_categories(db)


@app.get("/analytics/top-locations")
def analytics_top_locations(db: Session = Depends(get_db)):
    return get_top_locations(db)


@app.get("/analytics/job-types")
def analytics_job_types(db: Session = Depends(get_db)):
    return get_job_types(db)


@app.get("/analytics/salary-overview")
def analytics_salary_overview(db: Session = Depends(get_db)):
    return get_salary_overview(db)