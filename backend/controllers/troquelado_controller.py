from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from backend.schemas.troquelado_schema import TroqueladoOut
from backend.services.troquelado_service import TroqueladoService
from typing import List

router = APIRouter(prefix="/troquelados", tags=["troquelados"])

@router.get("/", response_model=List[TroqueladoOut])
async def list_troquelados(
    skip: int = Query(0, alias="offset"),
    limit: int = Query(100),
    db: AsyncSession = Depends(get_db),
):
    troquelados = await TroqueladoService.get_all(db, skip=skip, limit=limit)
    return [TroqueladoOut.model_validate(t) for t in troquelados]

@router.get("/{id_troquelado}", response_model=TroqueladoOut)
async def get_troquelado(id_troquelado: int, db: AsyncSession = Depends(get_db)):
    troquelado = await TroqueladoService.get_by_id(db, id_troquelado)
    if not troquelado:
        raise HTTPException(status_code=404, detail="Troquelado not found")
    return TroqueladoOut.model_validate(troquelado)
