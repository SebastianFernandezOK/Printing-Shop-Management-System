from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from backend.core.config import get_db
from backend.schemas.control_prensa_schema import (
    ControlPrensaCreate,
    ControlPrensaUpdate,
    ControlPrensaOut,
)
from backend.services.control_prensa_service import (
    listar_control_prensas,
    obtener_control_prensa,
    crear_control_prensa,
    actualizar_control_prensa,
    eliminar_control_prensa,
)
from backend.repositories.control_prensa_repository import (
    get_control_prensas as repo_get_control_prensas,
)

router = APIRouter(prefix="/controles_prensa", tags=["controles_prensa"])

@router.get("/", response_model=List[ControlPrensaOut])
async def get_control_prensas(id_orden_trabajo: int = None, session: AsyncSession = Depends(get_db)):
    if id_orden_trabajo is not None:
        objs = await repo_get_control_prensas(session)
        filtered = [obj for obj in objs if obj.id_orden_trabajo == id_orden_trabajo]
        return filtered
    # Si no se pasa el parámetro, devolver todos
    return await repo_get_control_prensas(session)

@router.get("/{id_control_prensa}", response_model=ControlPrensaOut)
async def get_control_prensa(id_control_prensa: int, session: AsyncSession = Depends(get_db)):
    obj = await obtener_control_prensa(session, id_control_prensa)
    if obj is None:
        raise HTTPException(status_code=404, detail="ControlPrensa no encontrado")
    return obj

@router.post("/", response_model=ControlPrensaOut)
async def create_control_prensa(data: ControlPrensaCreate, session: AsyncSession = Depends(get_db)):
    return await crear_control_prensa(session, data)

@router.put("/{id_control_prensa}", response_model=ControlPrensaOut)
async def update_control_prensa(id_control_prensa: int, data: ControlPrensaUpdate, session: AsyncSession = Depends(get_db)):
    obj = await actualizar_control_prensa(session, id_control_prensa, data)
    if obj is None:
        raise HTTPException(status_code=404, detail="ControlPrensa no encontrado")
    return obj

@router.delete("/{id_control_prensa}")
async def delete_control_prensa(id_control_prensa: int, session: AsyncSession = Depends(get_db)):
    ok = await eliminar_control_prensa(session, id_control_prensa)
    if not ok:
        raise HTTPException(status_code=404, detail="ControlPrensa no encontrado")
    return {"ok": True}
