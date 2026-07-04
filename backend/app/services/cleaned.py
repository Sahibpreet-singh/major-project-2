from backend.app.services.fetch_jobs import fetch_jobs
import asyncio

async def clean_all_jobs():
    jobs=await fetch_jobs()
    print( len(jobs) )

    return [
            {
                "title": job["title"],
                "company": job["company_name"],
                "category": job["category"],
                "salary": job["salary"]
            }
            for job in jobs
        ]

if __name__ == "__main__":
    asyncio.run(clean_all_jobs())