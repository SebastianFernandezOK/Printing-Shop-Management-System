from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.repositories.control_post_prensa_repository import (
    get_control_post_prensas,
    get_control_post_prensa_by_id,
    create_control_post_prensa,
    update_control_post_prensa,
    delete_control_post_prensa,
)
from backend.schemas.control_post_prensa_schema import (
    ControlPostPrensaCreate,
    ControlPostPrensaUpdate,
    ControlPostPrensaOut,
)

def map_control_post_prensa_to_schema(obj) -> ControlPostPrensaOut:
    return ControlPostPrensaOut.model_validate(obj)

async def listar_control_post_prensas(db: AsyncSession) -> List[ControlPostPrensaOut]:
    objs = await get_control_post_prensas(db)
    return [map_control_post_prensa_to_schema(obj) for obj in objs]

async def obtener_control_post_prensa(db: AsyncSession, id_control_post_prensa: int) -> Optional[ControlPostPrensaOut]:
    obj = await get_control_post_prensa_by_id(db, id_control_post_prensa)
    if obj is None:
        return None
    return map_control_post_prensa_to_schema(obj)

async def crear_control_post_prensa(db: AsyncSession, data: ControlPostPrensaCreate) -> ControlPostPrensaOut:
    obj = await create_control_post_prensa(db, data.model_dump())
    return map_control_post_prensa_to_schema(obj)

async def actualizar_control_post_prensa(db: AsyncSession, id_control_post_prensa: int, data: ControlPostPrensaUpdate) -> Optional[ControlPostPrensaOut]:
    obj = await update_control_post_prensa(db, id_control_post_prensa, data.model_dump(exclude_unset=True))
    if obj is None:
        return None
    return map_control_post_prensa_to_schema(obj)

async def eliminar_control_post_prensa(db: AsyncSession, id_control_post_prensa: int) -> bool:
    return await delete_control_post_prensa(db, id_control_post_prensa)
