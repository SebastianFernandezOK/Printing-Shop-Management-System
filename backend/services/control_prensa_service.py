from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.repositories.control_prensa_repository import (
    get_control_prensas,
    get_control_prensa_by_id,
    create_control_prensa,
    update_control_prensa,
    delete_control_prensa,
)
from backend.schemas.control_prensa_schema import (
    ControlPrensaCreate,
    ControlPrensaUpdate,
    ControlPrensaOut,
)

def map_control_prensa_to_schema(obj) -> ControlPrensaOut:
    return ControlPrensaOut.model_validate(obj)

async def listar_control_prensas(db: AsyncSession) -> List[ControlPrensaOut]:
    objs = await get_control_prensas(db)
    return [map_control_prensa_to_schema(obj) for obj in objs]

async def obtener_control_prensa(db: AsyncSession, id_control_prensa: int) -> Optional[ControlPrensaOut]:
    obj = await get_control_prensa_by_id(db, id_control_prensa)
    if obj is None:
        return None
    return map_control_prensa_to_schema(obj)

async def crear_control_prensa(db: AsyncSession, data: ControlPrensaCreate) -> ControlPrensaOut:
    obj = await create_control_prensa(db, data.model_dump())
    return map_control_prensa_to_schema(obj)

async def actualizar_control_prensa(db: AsyncSession, id_control_prensa: int, data: ControlPrensaUpdate) -> Optional[ControlPrensaOut]:
    obj = await update_control_prensa(db, id_control_prensa, data.model_dump(exclude_unset=True))
    if obj is None:
        return None
    return map_control_prensa_to_schema(obj)

async def eliminar_control_prensa(db: AsyncSession, id_control_prensa: int) -> bool:
    return await delete_control_prensa(db, id_control_prensa)
