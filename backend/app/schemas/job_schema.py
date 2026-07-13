from pydantic import BaseModel


class JobResponse(BaseModel):
    id: int
    title: str
    company: str | None
    location: str | None
    job_type: str | None
    category: str | None
    salary: str | None

    class Config:
        from_attributes = True