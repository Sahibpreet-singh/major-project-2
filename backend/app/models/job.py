from sqlalchemy import Column, Integer, String, DateTime
from backend.app.db.database import Base
from datetime import datetime


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)
    company = Column(String)
    location = Column(String)
    job_type = Column(String)
    category = Column(String)
    salary = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )