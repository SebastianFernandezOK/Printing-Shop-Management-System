from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from backend.core.config import get_db
from backend.schemas.control_post_prensa_schema import (
    ControlPostPrensaCreate,
    ControlPostPrensaUpdate,
    ControlPostPrensaOut,
)
from backend.services.control_post_prensa_service import (
    listar_control_post_prensas,
    obtener_control_post_prensa,
    crear_control_post_prensa,
    actualizar_control_post_prensa,
    eliminar_control_post_prensa,
)

router = APIRouter(prefix="/controles_postprensa", tags=["controles_postprensa"])

@router.get("/", response_model=List[ControlPostPrensaOut])
async def get_control_post_prensas(session: AsyncSession = Depends(get_db)):
    return await listar_control_post_prensas(session)

@router.get("/{id_control_post_prensa}", response_model=ControlPostPrensaOut)
async def get_control_post_prensa(id_control_post_prensa: int, session: AsyncSession = Depends(get_db)):
    obj = await obtener_control_post_prensa(session, id_control_post_prensa)
    if obj is None:
        raise HTTPException(status_code=404, detail="ControlPostPrensa no encontrado")
    return obj

@router.post("/", response_model=ControlPostPrensaOut)
async def create_control_post_prensa(data: ControlPostPrensaCreate, session: AsyncSession = Depends(get_db)):
    return await crear_control_post_prensa(session, data)

@router.put("/{id_control_post_prensa}", response_model=ControlPostPrensaOut)
async def update_control_post_prensa(id_control_post_prensa: int, data: ControlPostPrensaUpdate, session: AsyncSession = Depends(get_db)):
    obj = await actualizar_control_post_prensa(session, id_control_post_prensa, data)
    if obj is None:
        raise HTTPException(status_code=404, detail="ControlPostPrensa no encontrado")
    return obj

@router.delete("/{id_control_post_prensa}")
async def delete_control_post_prensa(id_control_post_prensa: int, session: AsyncSession = Depends(get_db)):
    ok = await eliminar_control_post_prensa(session, id_control_post_prensa)
    if not ok:
        raise HTTPException(status_code=404, detail="ControlPostPrensa no encontrado")
    return {"ok": True}
