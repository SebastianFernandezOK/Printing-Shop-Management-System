from backend.models.estado_model import Estado
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

class EstadoRepository:
    @staticmethod
    async def get_all(db: AsyncSession):
        result = await db.execute(select(Estado))
        return result.scalars().all()

    @staticmethod
    async def get_by_id(db: AsyncSession, id_estado: int):
        return await db.get(Estado, id_estado)

    @staticmethod
    async def create(db: AsyncSession, estado_data: dict):
        db_estado = Estado(**estado_data)
        db.add(db_estado)
        await db.commit()
        await db.refresh(db_estado)
        return db_estado

    @staticmethod
    async def update(db: AsyncSession, db_estado: Estado, updates: dict):
        for key, value in updates.items():
            setattr(db_estado, key, value)
        await db.commit()
        await db.refresh(db_estado)
        return db_estado

    @staticmethod
    async def delete(db: AsyncSession, db_estado: Estado):
        await db.delete(db_estado)
        await db.commit()
        return db_estado
