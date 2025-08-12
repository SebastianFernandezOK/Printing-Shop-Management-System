from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from backend.core.config import get_db
from backend.schemas.control_calidad_schema import (
    ControlCalidadFinalCreate,
    ControlCalidadFinalUpdate,
    ControlCalidadFinalOut,
)
from backend.services.control_calidad_service import (
    listar_controles_calidad,
    obtener_control_calidad,
    crear_control_calidad,
    actualizar_control_calidad,
    eliminar_control_calidad,
)

router = APIRouter(prefix="/controles_calidad", tags=["controles_calidad"])

@router.get("/", response_model=List[ControlCalidadFinalOut])
async def get_controles_calidad(session: AsyncSession = Depends(get_db)):
    return await listar_controles_calidad(session)

@router.get("/{id_control_calidad}", response_model=ControlCalidadFinalOut)
async def get_control_calidad(id_control_calidad: int, session: AsyncSession = Depends(get_db)):
    obj = await obtener_control_calidad(session, id_control_calidad)
    if obj is None:
        raise HTTPException(status_code=404, detail="ControlCalidadFinal no encontrado")
    return obj

@router.post("/", response_model=ControlCalidadFinalOut)
async def create_control_calidad(data: ControlCalidadFinalCreate, session: AsyncSession = Depends(get_db)):
    return await crear_control_calidad(session, data)

@router.put("/{id_control_calidad}", response_model=ControlCalidadFinalOut)
async def update_control_calidad(id_control_calidad: int, data: ControlCalidadFinalUpdate, session: AsyncSession = Depends(get_db)):
    obj = await actualizar_control_calidad(session, id_control_calidad, data)
    if obj is None:
        raise HTTPException(status_code=404, detail="ControlCalidadFinal no encontrado")
    return obj

@router.delete("/{id_control_calidad}")
async def delete_control_calidad(id_control_calidad: int, session: AsyncSession = Depends(get_db)):
    ok = await eliminar_control_calidad(session, id_control_calidad)
    if not ok:
        raise HTTPException(status_code=404, detail="ControlCalidadFinal no encontrado")
    return {"ok": True}
