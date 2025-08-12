from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.repositories.control_calidad_repository import (
    get_controles_calidad,
    get_control_calidad_by_id,
    create_control_calidad,
    update_control_calidad,
    delete_control_calidad,
)
from backend.schemas.control_calidad_schema import (
    ControlCalidadFinalCreate,
    ControlCalidadFinalUpdate,
    ControlCalidadFinalOut,
)

def map_control_calidad_to_schema(obj) -> ControlCalidadFinalOut:
    return ControlCalidadFinalOut.model_validate(obj)

async def listar_controles_calidad(db: AsyncSession) -> List[ControlCalidadFinalOut]:
    objs = await get_controles_calidad(db)
    return [map_control_calidad_to_schema(obj) for obj in objs]

async def obtener_control_calidad(db: AsyncSession, id_control_calidad: int) -> Optional[ControlCalidadFinalOut]:
    obj = await get_control_calidad_by_id(db, id_control_calidad)
    if obj is None:
        return None
    return map_control_calidad_to_schema(obj)

async def crear_control_calidad(db: AsyncSession, data: ControlCalidadFinalCreate) -> ControlCalidadFinalOut:
    obj = await create_control_calidad(db, data.model_dump())
    return map_control_calidad_to_schema(obj)

async def actualizar_control_calidad(db: AsyncSession, id_control_calidad: int, data: ControlCalidadFinalUpdate) -> Optional[ControlCalidadFinalOut]:
    obj = await update_control_calidad(db, id_control_calidad, data.model_dump(exclude_unset=True))
    if obj is None:
        return None
    return map_control_calidad_to_schema(obj)

async def eliminar_control_calidad(db: AsyncSession, id_control_calidad: int) -> bool:
    return await delete_control_calidad(db, id_control_calidad)
