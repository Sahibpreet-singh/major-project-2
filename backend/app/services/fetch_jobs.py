from backend.app.services.ingestion.remotive import fetch_remotive_jobs
from backend.app.services.ingestion.arbeitnow import fetch_arbeitnow_jobs


async def fetch_jobs():

    remotive_jobs = await fetch_remotive_jobs()
    arbeitnow_jobs = await fetch_arbeitnow_jobs()

    return {
        "remotive": remotive_jobs,
        "arbeitnow": arbeitnow_jobs
    }