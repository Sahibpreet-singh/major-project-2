from fastapi import FastAPI
from backend.app.services.job_service import get_job_by_id
from backend.app.services.fetch_jobs import fetch_jobs
from backend.app.services.clean_jobs import clean_all_jobs
from fastapi import Depends
from sqlalchemy.orm import Session
from backend.app.schemas.job_schema import JobResponse
from sqlalchemy.orm import Session
from fastapi import Depends
from backend.app.services.job_service import get_all_jobs
from backend.app.dependencies import get_db
from backend.app.services.job_service import save_jobs
from backend.app.scheduler.job_scheduler import start_scheduler
from backend.app.services.job_service import search_jobs
from backend.app.services.analytic import (
    get_overview,
    get_top_skills,
    get_top_companies,
    get_top_categories,
    get_top_locations,
    get_job_types,
    get_salary_overview
)
from fastapi.middleware.cors import CORSMiddleware
#ai
from backend.ai.prompts import SYSTEM_PROMPT
from backend.ai.providers.llm import get_llm
from backend.ai.agent import run_agent
from backend.ai.schemas import ChatRequest


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    start_scheduler()

@app.get("/")
def root():
    return {"message": "Backend is running!"}

@app.get("/clean-jobs")
async def print_jobs():
    jobs=await clean_all_jobs()
    return jobs

@app.get("/analytics/overview")
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

@app.get("/jobs")
def get_jobs(
    search: str | None = None,
    company: str | None = None,
    location: str | None = None,
    category: str | None = None,
    job_type: str | None = None,
    skill: str | None = None,
    sort: str = "newest",
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db)
):

    return search_jobs(
        db=db,
        search=search,
        company=company,
        location=location,
        category=category,
        job_type=job_type,
        skill=skill,
        sort=sort,
        page=page,
        limit=limit,
    )

@app.get("/jobs/{job_id}", response_model=JobResponse)
def job_details(
    job_id: int,
    db: Session = Depends(get_db)
):
    return get_job_by_id(db, job_id)



@app.post("/chat")
def chat(request: ChatRequest):
    try:
        print("Received:", request.message)

        answer = run_agent(request.message)

        print("Answer:", answer)

        return {"answer": answer}

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise