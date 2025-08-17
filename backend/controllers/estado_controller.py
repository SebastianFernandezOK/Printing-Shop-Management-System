from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from backend.schemas.estado_schema import EstadoCreate, EstadoRead
from backend.services.estado_service import EstadoService
from typing import List

router = APIRouter(prefix="/estados", tags=["estados"])

@router.get("/", response_model=List[EstadoRead])
async def list_estados(db: AsyncSession = Depends(get_db)):
    return await EstadoService.get_all(db)

@router.get("/{id_estado}", response_model=EstadoRead)
async def get_estado(id_estado: int, db: AsyncSession = Depends(get_db)):
    estado = await EstadoService.get_by_id(db, id_estado)
    if not estado:
        raise HTTPException(status_code=404, detail="Estado not found")
    return estado

@router.post("/", response_model=EstadoRead, status_code=status.HTTP_201_CREATED)
async def create_estado(estado_in: EstadoCreate, db: AsyncSession = Depends(get_db)):
    return await EstadoService.create(db, estado_in)

@router.put("/{id_estado}", response_model=EstadoRead)
async def update_estado(id_estado: int, estado_in: EstadoCreate, db: AsyncSession = Depends(get_db)):
    db_estado = await EstadoService.get_by_id(db, id_estado)
    if not db_estado:
        raise HTTPException(status_code=404, detail="Estado not found")
    return await EstadoService.update(db, db_estado, estado_in)

@router.delete("/{id_estado}", response_model=EstadoRead)
async def delete_estado(id_estado: int, db: AsyncSession = Depends(get_db)):
    db_estado = await EstadoService.get_by_id(db, id_estado)
    if not db_estado:
        raise HTTPException(status_code=404, detail="Estado not found")
    return await EstadoService.delete(db, db_estado)
