from backend.repositories.estado_repository import EstadoRepository
from backend.schemas.estado_schema import EstadoCreate
from backend.models.estado_model import Estado
from sqlalchemy.ext.asyncio import AsyncSession

class EstadoService:
    @staticmethod
    async def get_all(db: AsyncSession):
        return await EstadoRepository.get_all(db)

    @staticmethod
    async def get_by_id(db: AsyncSession, id_estado: int):
        return await EstadoRepository.get_by_id(db, id_estado)

    @staticmethod
    async def create(db: AsyncSession, estado_in: EstadoCreate):
        return await EstadoRepository.create(db, estado_in.model_dump())

    @staticmethod
    async def update(db: AsyncSession, db_estado: Estado, estado_in: EstadoCreate):
        return await EstadoRepository.update(db, db_estado, estado_in.model_dump())

    @staticmethod
    async def delete(db: AsyncSession, db_estado: Estado):
        return await EstadoRepository.delete(db, db_estado)
