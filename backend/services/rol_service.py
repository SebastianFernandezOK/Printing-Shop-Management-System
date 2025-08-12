from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.repositories.rol_repository import get_roles, get_rol_por_id
from backend.schemas.rol_schema import RolRead

def map_rol_to_schema(rol) -> RolRead:
    return RolRead.model_validate(rol)

async def listar_roles(db: AsyncSession) -> List[RolRead]:
    roles = await get_roles(db)
    return [map_rol_to_schema(rol) for rol in roles]

async def obtener_rol_por_id(db: AsyncSession, id_rol: int) -> Optional[RolRead]:
    rol = await get_rol_por_id(db, id_rol)
    if rol is None:
        return None
    return map_rol_to_schema(rol)
