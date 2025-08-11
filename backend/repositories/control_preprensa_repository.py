from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.control_preprensa_model import ControlPrePrensa

class ControlPrePrensaRepository:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 10):
        result = await db.execute(select(ControlPrePrensa).offset(skip).limit(limit))
        return result.scalars().all()

    @staticmethod
    async def get_by_id(db: AsyncSession, id_control_preprensa: int):
        return await db.get(ControlPrePrensa, id_control_preprensa)

    @staticmethod
    async def create(db: AsyncSession, data: dict):
        db_obj = ControlPrePrensa(**data)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    @staticmethod
    async def update(db: AsyncSession, db_obj: ControlPrePrensa, updates: dict):
        for key, value in updates.items():
            setattr(db_obj, key, value)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    @staticmethod
    async def delete(db: AsyncSession, db_obj: ControlPrePrensa):
        await db.delete(db_obj)
        await db.commit()
        return db_obj
