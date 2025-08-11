from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.sistema_model import Sistema

class SistemaRepository:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 100):
        result = await db.execute(select(Sistema).offset(skip).limit(limit))
        return result.scalars().all()

    @staticmethod
    async def get_by_id(db: AsyncSession, id_sistema_impresion: int):
        return await db.get(Sistema, id_sistema_impresion)
