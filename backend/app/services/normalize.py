import re
from datetime import datetime
def clean_text(text):
    if not text:
        return ""

    text = re.sub("<.*?>", "", text)
    text = text.replace("\n", " ")

    return text.strip()


def normalize_remotive(job):
    return {
        "source": "remotive",
        "source_id": str(job["id"]),
        "title": job["title"].strip(),
        "company": job["company_name"].strip(),
        "company_logo": job.get("company_logo"),
        "job_url": job["url"],
        "category": job["category"],
        "job_type": job["job_type"],
        "location": job["candidate_required_location"],
        "salary": job.get("salary"),
        "description": clean_text(job["description"]),
        "published_date": job["publication_date"],
        "tags": job.get("tags", []),
    }

def normalize_arbeitnow(job):

    return {
        "source": "arbeitnow",
        "source_id": str(job["slug"]),

        "title": job["title"].strip(),
        "company": job["company_name"].strip(),

        "company_logo": None,

        "job_url": job["url"],

        "category": "Unknown",

        "job_type": ", ".join(job.get("job_types", [])),

        "location": job["location"],

        "salary": None,

        "description": clean_text(job["description"]),

        "published_date": datetime.fromtimestamp(job["created_at"]),

        "tags": job.get("tags", [])
    }