import httpx


async def fetch_arbeitnow_jobs():

    url = "https://www.arbeitnow.com/api/job-board-api"

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(url)
        response.raise_for_status()

    data = response.json()

    return data["data"]

import asyncio
from backend.app.services.ingestion.arbeitnow import fetch_arbeitnow_jobs


if __name__ == "__main__":
    jobs = asyncio.run(fetch_arbeitnow_jobs())
    print(len(jobs))
    print(jobs[0].keys())