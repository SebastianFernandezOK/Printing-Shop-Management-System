from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from backend.models.control_calidad_model import ControlCalidadFinal

async def get_controles_calidad(db: AsyncSession) -> List[ControlCalidadFinal]:
    result = await db.execute(select(ControlCalidadFinal))
    return result.scalars().all()

async def get_control_calidad_by_id(db: AsyncSession, id_control_calidad: int) -> Optional[ControlCalidadFinal]:
    result = await db.execute(select(ControlCalidadFinal).where(ControlCalidadFinal.id_control_calidad == id_control_calidad))
    return result.scalars().first()

async def create_control_calidad(db: AsyncSession, data: dict) -> ControlCalidadFinal:
    obj = ControlCalidadFinal(**data)
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj

async def update_control_calidad(db: AsyncSession, id_control_calidad: int, data: dict) -> Optional[ControlCalidadFinal]:
    result = await db.execute(select(ControlCalidadFinal).where(ControlCalidadFinal.id_control_calidad == id_control_calidad))
    obj = result.scalars().first()
    if obj is None:
        return None
    for key, value in data.items():
        setattr(obj, key, value)
    await db.commit()
    await db.refresh(obj)
    return obj

async def delete_control_calidad(db: AsyncSession, id_control_calidad: int) -> bool:
    result = await db.execute(select(ControlCalidadFinal).where(ControlCalidadFinal.id_control_calidad == id_control_calidad))
    obj = result.scalars().first()
    if obj is None:
        return False
    await db.delete(obj)
    await db.commit()
    return True
