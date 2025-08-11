from backend.repositories.sistema_repository import SistemaRepository
from backend.schemas.sistema_schema import SistemaCreate, SistemaUpdate
from backend.models.sistema_model import Sistema
from sqlalchemy.ext.asyncio import AsyncSession

class SistemaService:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 100):
        return await SistemaRepository.get_all(db, skip, limit)

    @staticmethod
    async def get_by_id(db: AsyncSession, id_sistema_impresion: int):
        return await SistemaRepository.get_by_id(db, id_sistema_impresion)
