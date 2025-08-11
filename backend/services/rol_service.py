from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from backend.repositories.rol_repository import get_roles
from backend.schemas.rol_schema import RolRead

def map_rol_to_schema(rol) -> RolRead:
    return RolRead.model_validate(rol)

async def listar_roles(db: AsyncSession) -> List[RolRead]:
    roles = await get_roles(db)
    return [map_rol_to_schema(rol) for rol in roles]
