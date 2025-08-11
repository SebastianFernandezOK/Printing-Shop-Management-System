from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.troquelado_model import Troquelado

class TroqueladoRepository:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 100):
        result = await db.execute(select(Troquelado).offset(skip).limit(limit))
        return result.scalars().all()

    @staticmethod
    async def get_by_id(db: AsyncSession, id_troquelado: int):
        return await db.get(Troquelado, id_troquelado)
