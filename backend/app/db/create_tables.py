from backend.app.db.database import engine, Base
from backend.app.models.job import Job


print("Creating tables...")

Base.metadata.create_all(bind=engine)

print("Tables created!")