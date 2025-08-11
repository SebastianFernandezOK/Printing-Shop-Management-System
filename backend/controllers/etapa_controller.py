from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from backend.schemas.etapa_schema import Etapa, EtapaCreate, EtapaUpdate
from backend.services.etapa_service import (
    get_etapas_service,
    get_etapa_service,
    create_etapa_service,
    update_etapa_service,
    delete_etapa_service,
)
from typing import List

router = APIRouter(prefix="/etapas", tags=["Etapas"])

@router.get("/", response_model=List[Etapa])
async def read_etapas(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await get_etapas_service(db, skip, limit)

@router.get("/{etapa_id}", response_model=Etapa)
async def read_etapa(etapa_id: int, db: AsyncSession = Depends(get_db)):
    etapa = await get_etapa_service(db, etapa_id)
    if etapa is None:
        raise HTTPException(status_code=404, detail="Etapa not found")
    return etapa

@router.post("/", response_model=Etapa, status_code=status.HTTP_201_CREATED)
async def create_etapa(etapa: EtapaCreate, db: AsyncSession = Depends(get_db)):
    return await create_etapa_service(db, etapa)

@router.put("/{etapa_id}", response_model=Etapa)
async def update_etapa(etapa_id: int, etapa: EtapaUpdate, db: AsyncSession = Depends(get_db)):
    updated = await update_etapa_service(db, etapa_id, etapa)
    if updated is None:
        raise HTTPException(status_code=404, detail="Etapa not found")
    return updated

@router.delete("/{etapa_id}", response_model=Etapa)
async def delete_etapa(etapa_id: int, db: AsyncSession = Depends(get_db)):
    deleted = await delete_etapa_service(db, etapa_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Etapa not found")
    return deleted
