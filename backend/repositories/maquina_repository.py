from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from backend.models.maquina_model import Maquina

async def get_maquinas(db: AsyncSession) -> List[Maquina]:
    result = await db.execute(select(Maquina))
    return result.scalars().all()

async def get_maquina_by_id(db: AsyncSession, id_maquina: int) -> Optional[Maquina]:
    result = await db.execute(select(Maquina).where(Maquina.id_maquina == id_maquina))
    return result.scalars().first()

async def create_maquina(db: AsyncSession, data: dict) -> Maquina:
    obj = Maquina(**data)
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj

async def update_maquina(db: AsyncSession, id_maquina: int, data: dict) -> Optional[Maquina]:
    result = await db.execute(select(Maquina).where(Maquina.id_maquina == id_maquina))
    obj = result.scalars().first()
    if obj is None:
        return None
    for key, value in data.items():
        setattr(obj, key, value)
    await db.commit()
    await db.refresh(obj)
    return obj

async def delete_maquina(db: AsyncSession, id_maquina: int) -> bool:
    result = await db.execute(select(Maquina).where(Maquina.id_maquina == id_maquina))
    obj = result.scalars().first()
    if obj is None:
        return False
    await db.delete(obj)
    await db.commit()
    return True
