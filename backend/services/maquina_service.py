from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.repositories.maquina_repository import (
    get_maquinas,
    get_maquina_by_id,
    create_maquina,
    update_maquina,
    delete_maquina,
)
from backend.schemas.maquina_schema import (
    MaquinaCreate,
    MaquinaUpdate,
    MaquinaOut,
)

def map_maquina_to_schema(obj) -> MaquinaOut:
    return MaquinaOut.model_validate(obj)

async def listar_maquinas(db: AsyncSession) -> List[MaquinaOut]:
    objs = await get_maquinas(db)
    return [map_maquina_to_schema(obj) for obj in objs]

async def obtener_maquina(db: AsyncSession, id_maquina: int) -> Optional[MaquinaOut]:
    obj = await get_maquina_by_id(db, id_maquina)
    if obj is None:
        return None
    return map_maquina_to_schema(obj)

async def crear_maquina(db: AsyncSession, data: MaquinaCreate) -> MaquinaOut:
    obj = await create_maquina(db, data.model_dump())
    return map_maquina_to_schema(obj)

async def actualizar_maquina(db: AsyncSession, id_maquina: int, data: MaquinaUpdate) -> Optional[MaquinaOut]:
    obj = await update_maquina(db, id_maquina, data.model_dump(exclude_unset=True))
    if obj is None:
        return None
    return map_maquina_to_schema(obj)

async def eliminar_maquina(db: AsyncSession, id_maquina: int) -> bool:
    return await delete_maquina(db, id_maquina)
