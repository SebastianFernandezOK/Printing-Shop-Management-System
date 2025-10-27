from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from backend.schemas.orden_trabajo_schema import OrdenTrabajoCreate, OrdenTrabajoUpdate, OrdenTrabajoOut
from backend.services.orden_trabajo_service import OrdenTrabajoService
from backend.models.orden_trabajo_model import OrdenTrabajo
from backend.schemas.estado_schema import EstadoRead
from typing import List

router = APIRouter(prefix="/ordenes_trabajo", tags=["ordenes_trabajo"])

@router.get("/", response_model=dict)
async def list_ordenes_trabajo(
    skip: int = Query(0, alias="offset"),
    limit: int = Query(10),
    db: AsyncSession = Depends(get_db),
):
    ordenes, total = await OrdenTrabajoService.get_all(db, skip=skip, limit=limit)
    ordenes_out = [
        OrdenTrabajoOut.model_validate(
            {**orden.__dict__, "cliente": orden.cliente, "estado": orden.estado, "sistema": orden.sistema, "archivos": getattr(orden, "archivos", [])}, from_attributes=True
        )
        for orden in ordenes
    ]
    return {"data": ordenes_out, "total": total}

@router.get("/{id_orden_trabajo}", response_model=OrdenTrabajoOut)
async def get_orden_trabajo(id_orden_trabajo: int, db: AsyncSession = Depends(get_db)):
    orden = await OrdenTrabajoService.get_by_id(db, id_orden_trabajo)
    if not orden:
        raise HTTPException(status_code=404, detail="Orden de trabajo not found")
    # Incluye los archivos asociados en la respuesta
    archivos = getattr(orden, "archivos", [])
    return OrdenTrabajoOut.model_validate({**orden.__dict__, "cliente": orden.cliente, "estado": orden.estado, "archivos": archivos}, from_attributes=True)

@router.post("/", response_model=OrdenTrabajoOut, status_code=status.HTTP_201_CREATED)
async def create_orden_trabajo(orden_in: OrdenTrabajoCreate, db: AsyncSession = Depends(get_db)):
    try:
        orden = await OrdenTrabajoService.create(db, orden_in)
        return OrdenTrabajoOut.model_validate(
            {**orden.__dict__, "cliente": orden.cliente, "estado": orden.estado, "sistema": orden.sistema, "archivos": getattr(orden, "archivos", [])}, 
            from_attributes=True
        )
    except Exception as e:
        # Capturar error de lote duplicado
        if "numero_lote" in str(e) and "UniqueViolationError" in str(e):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"El número de lote '{orden_in.numero_lote}' ya está ocupado. Por favor, use un número diferente."
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al crear la orden de trabajo"
        )

@router.put("/{id_orden_trabajo}", response_model=OrdenTrabajoOut)
async def update_orden_trabajo(id_orden_trabajo: int, orden_in: OrdenTrabajoUpdate, db: AsyncSession = Depends(get_db)):
    db_orden = await OrdenTrabajoService.get_by_id(db, id_orden_trabajo)
    if not db_orden:
        raise HTTPException(status_code=404, detail="Orden de trabajo not found")
    orden = await OrdenTrabajoService.update(db, db_orden, orden_in)
    estado = EstadoRead.model_validate(orden.estado, from_attributes=True) if hasattr(orden, "estado") and orden.estado else None
    return OrdenTrabajoOut.model_validate({**orden.__dict__, "estado": estado, "cliente": orden.cliente}, from_attributes=True)

@router.delete("/{id_orden_trabajo}", response_model=OrdenTrabajoOut)
async def delete_orden_trabajo(id_orden_trabajo: int, db: AsyncSession = Depends(get_db)):
    db_orden = await OrdenTrabajoService.get_by_id(db, id_orden_trabajo)
    if not db_orden:
        raise HTTPException(status_code=404, detail="Orden de trabajo not found")
    orden = await OrdenTrabajoService.delete(db, db_orden)
    return OrdenTrabajoOut.model_validate(orden)
