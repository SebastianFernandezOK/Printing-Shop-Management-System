from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.rol_model import Rol
from typing import List, Optional

async def get_roles(db: AsyncSession) -> List[Rol]:
    result = await db.execute(select(Rol))
    return result.scalars().all()

async def get_rol_por_id(db: AsyncSession, id_rol: int) -> Optional[Rol]:
    result = await db.execute(select(Rol).where(Rol.id_rol == id_rol))
    return result.scalars().first()
