from backend.app.services.fetch_jobs import fetch_jobs
from backend.app.services.normalize import (
    normalize_remotive,
    normalize_arbeitnow,
)

import asyncio


async def clean_all_jobs():

    data = await fetch_jobs()

    cleaned_jobs = []

    cleaned_jobs.extend(
        normalize_remotive(job)
        for job in data["remotive"]
    )

    cleaned_jobs.extend(
        normalize_arbeitnow(job)
        for job in data["arbeitnow"]
    )

    return cleaned_jobs


if __name__ == "__main__":
    result = asyncio.run(clean_all_jobs())
    print(result[0])
    print(f"Total cleaned jobs: {len(result)}")