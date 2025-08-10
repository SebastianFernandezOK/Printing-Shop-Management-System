from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.backend.models.rol_model import Rol
from typing import List

async def get_roles(db: AsyncSession) -> List[Rol]:
    result = await db.execute(select(Rol))
    return result.scalars().all()
