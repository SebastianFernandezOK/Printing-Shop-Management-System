from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.orden_trabajo_model import OrdenTrabajo

class OrdenTrabajoRepository:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 10):
        result = await db.execute(select(OrdenTrabajo).offset(skip).limit(limit))
        return result.scalars().all()

    @staticmethod
    async def get_by_id(db: AsyncSession, id_orden_trabajo: int):
        return await db.get(OrdenTrabajo, id_orden_trabajo)

    @staticmethod
    async def create(db: AsyncSession, orden_data: dict):
        db_orden = OrdenTrabajo(**orden_data)
        db.add(db_orden)
        await db.commit()
        await db.refresh(db_orden)
        return db_orden

    @staticmethod
    async def update(db: AsyncSession, db_orden: OrdenTrabajo, updates: dict):
        for key, value in updates.items():
            setattr(db_orden, key, value)
        await db.commit()
        await db.refresh(db_orden)
        return db_orden

    @staticmethod
    async def delete(db: AsyncSession, db_orden: OrdenTrabajo):
        await db.delete(db_orden)
        await db.commit()
        return db_orden
