from backend.repositories.troquelado_repository import TroqueladoRepository
from backend.schemas.troquelado_schema import TroqueladoCreate, TroqueladoUpdate
from backend.models.troquelado_model import Troquelado
from sqlalchemy.ext.asyncio import AsyncSession

class TroqueladoService:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 100):
        return await TroqueladoRepository.get_all(db, skip, limit)

    @staticmethod
    async def get_by_id(db: AsyncSession, id_troquelado: int):
        return await TroqueladoRepository.get_by_id(db, id_troquelado)
