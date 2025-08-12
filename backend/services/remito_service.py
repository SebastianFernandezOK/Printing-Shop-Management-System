from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.repositories.remito_repository import (
    get_remitos,
    get_remito_by_id,
    create_remito,
    update_remito,
    delete_remito,
)
from backend.schemas.remito_schema import (
    RemitoCreate,
    RemitoUpdate,
    RemitoOut,
)

def map_remito_to_schema(obj) -> RemitoOut:
    return RemitoOut.model_validate(obj)

async def listar_remitos(db: AsyncSession) -> List[RemitoOut]:
    objs = await get_remitos(db)
    return [map_remito_to_schema(obj) for obj in objs]

async def obtener_remito(db: AsyncSession, id_remito: int) -> Optional[RemitoOut]:
    obj = await get_remito_by_id(db, id_remito)
    if obj is None:
        return None
    return map_remito_to_schema(obj)

async def crear_remito(db: AsyncSession, data: RemitoCreate) -> RemitoOut:
    obj = await create_remito(db, data.model_dump())
    return map_remito_to_schema(obj)

async def actualizar_remito(db: AsyncSession, id_remito: int, data: RemitoUpdate) -> Optional[RemitoOut]:
    obj = await update_remito(db, id_remito, data.model_dump(exclude_unset=True))
    if obj is None:
        return None
    return map_remito_to_schema(obj)

async def eliminar_remito(db: AsyncSession, id_remito: int) -> bool:
    return await delete_remito(db, id_remito)
