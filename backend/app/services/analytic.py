import pandas as pd


async def overview(jobs):
    df=pd.DataFrame(jobs)

    return {
        "total_jobs":len(df),
        "columns":df.columns.tolist(),
        "shape":df.shape,

    }
    
