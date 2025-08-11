from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from backend.schemas.control_preprensa_schema import ControlPrePrensaCreate, ControlPrePrensaUpdate, ControlPrePrensaOut
from backend.services.control_preprensa_service import ControlPrePrensaService
from typing import List

router = APIRouter(prefix="/controles_preprensa", tags=["ControlPrePrensa"])

@router.get("/", response_model=List[ControlPrePrensaOut])
async def read_all(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    return await ControlPrePrensaService.get_all(db, skip, limit)

@router.get("/{id_control_preprensa}", response_model=ControlPrePrensaOut)
async def read_one(id_control_preprensa: int, db: AsyncSession = Depends(get_db)):
    obj = await ControlPrePrensaService.get_by_id(db, id_control_preprensa)
    if obj is None:
        raise HTTPException(status_code=404, detail="ControlPrePrensa not found")
    return obj

@router.post("/", response_model=ControlPrePrensaOut, status_code=status.HTTP_201_CREATED)
async def create(obj_in: ControlPrePrensaCreate, db: AsyncSession = Depends(get_db)):
    return await ControlPrePrensaService.create(db, obj_in)

@router.put("/{id_control_preprensa}", response_model=ControlPrePrensaOut)
async def update(id_control_preprensa: int, obj_in: ControlPrePrensaUpdate, db: AsyncSession = Depends(get_db)):
    db_obj = await ControlPrePrensaService.get_by_id(db, id_control_preprensa)
    if db_obj is None:
        raise HTTPException(status_code=404, detail="ControlPrePrensa not found")
    return await ControlPrePrensaService.update(db, db_obj, obj_in)

@router.delete("/{id_control_preprensa}", response_model=ControlPrePrensaOut)
async def delete(id_control_preprensa: int, db: AsyncSession = Depends(get_db)):
    db_obj = await ControlPrePrensaService.get_by_id(db, id_control_preprensa)
    if db_obj is None:
        raise HTTPException(status_code=404, detail="ControlPrePrensa not found")
    return await ControlPrePrensaService.delete(db, db_obj)
