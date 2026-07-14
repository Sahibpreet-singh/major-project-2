from backend.app.services.fetch_jobs import fetch_jobs
import asyncio
import re


def clean_text(text):

    if not text:
        return ""

    text = re.sub("<.*?>", "", text)

    text = text.replace("\n", " ")

    return text.strip()


async def clean_all_jobs():

    jobs = await fetch_jobs()

    cleaned_jobs = []

    for job in jobs:

        cleaned_jobs.append(
           {
            "id": job["id"],
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
            "tags": job["tags"]
            }
        )

    return cleaned_jobs


if __name__ == "__main__":
    result = asyncio.run(clean_all_jobs())
    print(result[0])