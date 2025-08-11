from backend.repositories.orden_trabajo_repository import OrdenTrabajoRepository
from backend.schemas.orden_trabajo_schema import OrdenTrabajoCreate, OrdenTrabajoUpdate
from backend.models.orden_trabajo_model import OrdenTrabajo
from sqlalchemy.ext.asyncio import AsyncSession

class OrdenTrabajoService:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 10):
        return await OrdenTrabajoRepository.get_all(db, skip, limit)

    @staticmethod
    async def get_by_id(db: AsyncSession, id_orden_trabajo: int):
        return await OrdenTrabajoRepository.get_by_id(db, id_orden_trabajo)

    @staticmethod
    async def create(db: AsyncSession, orden_in: OrdenTrabajoCreate):
        return await OrdenTrabajoRepository.create(db, orden_in.model_dump())

    @staticmethod
    async def update(db: AsyncSession, db_orden: OrdenTrabajo, orden_in: OrdenTrabajoUpdate):
        return await OrdenTrabajoRepository.update(db, db_orden, orden_in.model_dump())

    @staticmethod
    async def delete(db: AsyncSession, db_orden: OrdenTrabajo):
        return await OrdenTrabajoRepository.delete(db, db_orden)
