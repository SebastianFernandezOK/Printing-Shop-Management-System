from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from backend.services.rol_service import listar_roles, obtener_rol_por_id
from backend.schemas.rol_schema import RolRead
from typing import List

router = APIRouter(prefix="/roles", tags=["roles"])

@router.get("/", response_model=List[RolRead])
async def get_roles(session: AsyncSession = Depends(get_db)):
    return await listar_roles(session)

@router.get("/{id_rol}", response_model=RolRead)
async def get_rol(id_rol: int, session: AsyncSession = Depends(get_db)):
    rol = await obtener_rol_por_id(session, id_rol)
    if rol is None:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    return rol
