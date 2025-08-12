from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from backend.core.config import get_db
from backend.schemas.remito_schema import (
    RemitoCreate,
    RemitoUpdate,
    RemitoOut,
)
from backend.services.remito_service import (
    listar_remitos,
    obtener_remito,
    crear_remito,
    actualizar_remito,
    eliminar_remito,
)

router = APIRouter(prefix="/remitos", tags=["remitos"])

@router.get("/", response_model=List[RemitoOut])
async def get_remitos(session: AsyncSession = Depends(get_db)):
    return await listar_remitos(session)

@router.get("/{id_remito}", response_model=RemitoOut)
async def get_remito(id_remito: int, session: AsyncSession = Depends(get_db)):
    obj = await obtener_remito(session, id_remito)
    if obj is None:
        raise HTTPException(status_code=404, detail="Remito no encontrado")
    return obj

@router.post("/", response_model=RemitoOut)
async def create_remito(data: RemitoCreate, session: AsyncSession = Depends(get_db)):
    return await crear_remito(session, data)

@router.put("/{id_remito}", response_model=RemitoOut)
async def update_remito(id_remito: int, data: RemitoUpdate, session: AsyncSession = Depends(get_db)):
    obj = await actualizar_remito(session, id_remito, data)
    if obj is None:
        raise HTTPException(status_code=404, detail="Remito no encontrado")
    return obj

@router.delete("/{id_remito}")
async def delete_remito(id_remito: int, session: AsyncSession = Depends(get_db)):
    ok = await eliminar_remito(session, id_remito)
    if not ok:
        raise HTTPException(status_code=404, detail="Remito no encontrado")
    return {"ok": True}
