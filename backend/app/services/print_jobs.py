from backend.app.services.fetch_jobs import fetch_jobs
import asyncio

async def print_all_jobs():
    jobs=await fetch_jobs()
    print( len(jobs) )

    for job in jobs:
        print(job["title"])
        print(job['company_name'])
        print(job['company_logo'])
        print(job['category'])
        print(job['tags'])
        print(job['job_type'])
        print(job['salary'])

if __name__ == "__main__":
    asyncio.run(print_all_jobs())