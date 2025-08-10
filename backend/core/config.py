from pydantic_settings import BaseSettings
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

class Settings(BaseSettings):
    DB_HOST: str 
    DB_PORT: str 
    DB_USER: str 
    DB_PASSWORD: str 
    DB_NAME: str 
    DATABASE_URL: str = ""

    class Config:
        env_file = ".env"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.DATABASE_URL = (
            f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

settings = Settings()

# Crear el engine y el sessionmaker asíncronos
engine = create_async_engine(settings.DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Declarative base para los modelos
Base = declarative_base()

# Dependencia para obtener la sesión en los endpoints
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
