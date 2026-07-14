from backend.app.db.database import engine, Base

from backend.app.models.job import Job
from backend.app.models.skill import Skill
from backend.app.models.job_skill import JobSkill


print("Creating tables...")

Base.metadata.create_all(bind=engine)

print("Tables created!")