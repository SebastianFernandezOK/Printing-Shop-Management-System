from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from backend.schemas.sistema_schema import SistemaOut
from backend.services.sistema_service import SistemaService
from typing import List

router = APIRouter(prefix="/sistemas", tags=["sistemas"])

@router.get("/", response_model=List[SistemaOut])
async def list_sistemas(
    skip: int = Query(0, alias="offset"),
    limit: int = Query(100),
    db: AsyncSession = Depends(get_db),
):
    sistemas = await SistemaService.get_all(db, skip=skip, limit=limit)
    return [SistemaOut.model_validate(s) for s in sistemas]

@router.get("/{id_sistema_impresion}", response_model=SistemaOut)
async def get_sistema(id_sistema_impresion: int, db: AsyncSession = Depends(get_db)):
    sistema = await SistemaService.get_by_id(db, id_sistema_impresion)
    if not sistema:
        raise HTTPException(status_code=404, detail="Sistema not found")
    return SistemaOut.model_validate(sistema)
