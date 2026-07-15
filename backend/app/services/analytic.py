from backend.app.models.job import Job
from backend.app.models.skill import Skill
from backend.app.models.job_skill import JobSkill

def get_overview(db):
    total_jobs=db.query(Job).count()
    total_companies=(
        db.query(Job.company).distinct().count()
    )
    total_skills=db.query(Skill).count()

    return{
        "total_jobs": total_jobs,
        "total_companies": total_companies,
        "total_skills": total_skills,
    }
    
