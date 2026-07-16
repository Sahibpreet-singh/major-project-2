from sqlalchemy import Column, Integer, String, DateTime
from backend.app.db.database import Base
from datetime import datetime


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False)
    source_id = Column(String, nullable=False)

    title = Column(String)
    company = Column(String)
    
    company_logo=Column(String)

    job_url=Column(String,unique=True)

    category = Column(String)
    job_type = Column(String)
    location = Column(String)
    
    salary = Column(String)

    description=Column(String)

    published_date=Column(DateTime)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )