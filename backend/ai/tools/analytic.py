from langchain_core.tools import tool

from backend.app.db.database import SessionLocal
from backend.app.services.analytic import (
    get_overview,
    get_top_skills,
    get_top_companies,
)


@tool
def overview():
    """Return overall statistics about the job database."""

    db = SessionLocal()
    try:
        return get_overview(db)
    finally:
        db.close()


@tool
def top_skills():
    """Return the most demanded skills."""

    db = SessionLocal()
    try:
        return get_top_skills(db)
    finally:
        db.close()


@tool
def top_companies():
    """Return companies posting the most jobs."""

    db = SessionLocal()
    try:
        return get_top_companies(db)
    finally:
        db.close()