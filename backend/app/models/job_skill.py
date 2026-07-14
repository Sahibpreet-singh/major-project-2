from sqlalchemy import Column, Integer, ForeignKey
from backend.app.db.database import Base


class JobSkill(Base):

    __tablename__ = "job_skills"

    id = Column(Integer, primary_key=True)

    job_id = Column(
        Integer,
        ForeignKey("jobs.id")
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id")
    )