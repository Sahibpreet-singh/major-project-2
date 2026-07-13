import httpx

JOB_API = "https://remotive.com/api/remote-jobs"

async def fetch_jobs():
    async with httpx.AsyncClient() as client:
        response = await client.get(JOB_API)

        print(response.status_code)
        print(response.text[:200])

        response.raise_for_status()
    
    return response.json()["jobs"]
