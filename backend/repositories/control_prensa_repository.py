from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import insert, update, delete
from backend.models.control_prensa_model import ControlPrensa
from typing import List, Optional

async def get_control_prensas(db: AsyncSession) -> List[ControlPrensa]:
    result = await db.execute(select(ControlPrensa))
    return result.scalars().all()

async def get_control_prensa_by_id(db: AsyncSession, id_control_prensa: int) -> Optional[ControlPrensa]:
    result = await db.execute(select(ControlPrensa).where(ControlPrensa.id_control_prensa == id_control_prensa))
    return result.scalars().first()

async def create_control_prensa(db: AsyncSession, control_prensa: dict) -> ControlPrensa:
    obj = ControlPrensa(**control_prensa)
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj

async def update_control_prensa(db: AsyncSession, id_control_prensa: int, control_prensa: dict) -> Optional[ControlPrensa]:
    result = await db.execute(select(ControlPrensa).where(ControlPrensa.id_control_prensa == id_control_prensa))
    obj = result.scalars().first()
    if obj is None:
        return None
    for key, value in control_prensa.items():
        setattr(obj, key, value)
    await db.commit()
    await db.refresh(obj)
    return obj

async def delete_control_prensa(db: AsyncSession, id_control_prensa: int) -> bool:
    result = await db.execute(select(ControlPrensa).where(ControlPrensa.id_control_prensa == id_control_prensa))
    obj = result.scalars().first()
    if obj is None:
        return False
    await db.delete(obj)
    await db.commit()
    return True
