from fastapi import FastAPI
from backend.app.services.fetch_jobs import fetch_jobs
from backend.app.services.print_jobs import print_all_jobs
app = FastAPI()


@app.get("/")
def root():
    return {"message": "Backend is running!"}


@app.get("/jobs")
async def get_jobs():
    return await fetch_jobs()

@app.get("/print-jobs")
async def print_jobs():
    await print_all_jobs()
    return {"message": "Jobs printed to terminal"}