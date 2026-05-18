from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:neuro123@localhost/neurosphere"

# Add a 5-second connect timeout so we don't hang for 60s when Postgres is offline
engine = create_engine(
    DATABASE_URL,
    connect_args={"connect_timeout": 5}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()