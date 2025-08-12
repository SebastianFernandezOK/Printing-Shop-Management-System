from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from backend.core.config import get_db
from backend.schemas.maquina_schema import (
    MaquinaCreate,
    MaquinaUpdate,
    MaquinaOut,
)
from backend.services.maquina_service import (
    listar_maquinas,
    obtener_maquina,
    crear_maquina,
    actualizar_maquina,
    eliminar_maquina,
)

router = APIRouter(prefix="/maquinas", tags=["maquinas"])

@router.get("/", response_model=List[MaquinaOut])
async def get_maquinas(session: AsyncSession = Depends(get_db)):
    return await listar_maquinas(session)

@router.get("/{id_maquina}", response_model=MaquinaOut)
async def get_maquina(id_maquina: int, session: AsyncSession = Depends(get_db)):
    obj = await obtener_maquina(session, id_maquina)
    if obj is None:
        raise HTTPException(status_code=404, detail="Maquina no encontrada")
    return obj

@router.post("/", response_model=MaquinaOut)
async def create_maquina(data: MaquinaCreate, session: AsyncSession = Depends(get_db)):
    return await crear_maquina(session, data)

@router.put("/{id_maquina}", response_model=MaquinaOut)
async def update_maquina(id_maquina: int, data: MaquinaUpdate, session: AsyncSession = Depends(get_db)):
    obj = await actualizar_maquina(session, id_maquina, data)
    if obj is None:
        raise HTTPException(status_code=404, detail="Maquina no encontrada")
    return obj

@router.delete("/{id_maquina}")
async def delete_maquina(id_maquina: int, session: AsyncSession = Depends(get_db)):
    ok = await eliminar_maquina(session, id_maquina)
    if not ok:
        raise HTTPException(status_code=404, detail="Maquina no encontrada")
    return {"ok": True}
