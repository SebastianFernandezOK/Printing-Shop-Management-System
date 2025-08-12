from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from backend.models.control_post_prensa_model import ControlPostPrensa

async def get_control_post_prensas(db: AsyncSession) -> List[ControlPostPrensa]:
    result = await db.execute(select(ControlPostPrensa))
    return result.scalars().all()

async def get_control_post_prensa_by_id(db: AsyncSession, id_control_post_prensa: int) -> Optional[ControlPostPrensa]:
    result = await db.execute(select(ControlPostPrensa).where(ControlPostPrensa.id_control_post_prensa == id_control_post_prensa))
    return result.scalars().first()

async def create_control_post_prensa(db: AsyncSession, data: dict) -> ControlPostPrensa:
    obj = ControlPostPrensa(**data)
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj

async def update_control_post_prensa(db: AsyncSession, id_control_post_prensa: int, data: dict) -> Optional[ControlPostPrensa]:
    result = await db.execute(select(ControlPostPrensa).where(ControlPostPrensa.id_control_post_prensa == id_control_post_prensa))
    obj = result.scalars().first()
    if obj is None:
        return None
    for key, value in data.items():
        setattr(obj, key, value)
    await db.commit()
    await db.refresh(obj)
    return obj

async def delete_control_post_prensa(db: AsyncSession, id_control_post_prensa: int) -> bool:
    result = await db.execute(select(ControlPostPrensa).where(ControlPostPrensa.id_control_post_prensa == id_control_post_prensa))
    obj = result.scalars().first()
    if obj is None:
        return False
    await db.delete(obj)
    await db.commit()
    return True
