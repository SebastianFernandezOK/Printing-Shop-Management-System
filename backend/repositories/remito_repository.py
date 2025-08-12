from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from backend.models.remito_model import Remito

async def get_remitos(db: AsyncSession) -> List[Remito]:
    result = await db.execute(select(Remito))
    return result.scalars().all()

async def get_remito_by_id(db: AsyncSession, id_remito: int) -> Optional[Remito]:
    result = await db.execute(select(Remito).where(Remito.id_remito == id_remito))
    return result.scalars().first()

async def create_remito(db: AsyncSession, data: dict) -> Remito:
    obj = Remito(**data)
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj

async def update_remito(db: AsyncSession, id_remito: int, data: dict) -> Optional[Remito]:
    result = await db.execute(select(Remito).where(Remito.id_remito == id_remito))
    obj = result.scalars().first()
    if obj is None:
        return None
    for key, value in data.items():
        setattr(obj, key, value)
    await db.commit()
    await db.refresh(obj)
    return obj

async def delete_remito(db: AsyncSession, id_remito: int) -> bool:
    result = await db.execute(select(Remito).where(Remito.id_remito == id_remito))
    obj = result.scalars().first()
    if obj is None:
        return False
    await db.delete(obj)
    await db.commit()
    return True
