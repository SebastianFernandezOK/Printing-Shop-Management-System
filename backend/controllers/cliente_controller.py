from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from backend.schemas.cliente_schema import ClienteCreate, ClienteUpdate, ClienteOut
from backend.services.cliente_service import ClienteService
from backend.models.cliente_model import Cliente
from typing import List

router = APIRouter(prefix="/clientes", tags=["clientes"])

@router.get("/", response_model=dict)
async def list_clientes(
    skip: int = Query(0, alias="offset"),
    limit: int = Query(10),
    db: AsyncSession = Depends(get_db),
):
    clientes = await ClienteService.get_all(db, skip=skip, limit=limit)
    total = len(clientes)  # Si tienes paginación real, cámbialo por un count
    clientes_out = [ClienteOut.model_validate(cliente) for cliente in clientes]
    return {"data": clientes_out, "total": total}

@router.get("/{id_cliente}", response_model=ClienteOut)
async def get_cliente(id_cliente: int, db: AsyncSession = Depends(get_db)):
    cliente = await ClienteService.get_by_id(db, id_cliente)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente not found")
    return ClienteOut.model_validate(cliente)

@router.post("/", response_model=ClienteOut, status_code=status.HTTP_201_CREATED)
async def create_cliente(cliente_in: ClienteCreate, db: AsyncSession = Depends(get_db)):
    cliente = await ClienteService.create(db, cliente_in)
    return ClienteOut.model_validate(cliente)

@router.put("/{id_cliente}", response_model=ClienteOut)
async def update_cliente(id_cliente: int, cliente_in: ClienteUpdate, db: AsyncSession = Depends(get_db)):
    db_cliente = await ClienteService.get_by_id(db, id_cliente)
    if not db_cliente:
        raise HTTPException(status_code=404, detail="Cliente not found")
    cliente = await ClienteService.update(db, db_cliente, cliente_in)
    return ClienteOut.model_validate(cliente)

@router.delete("/{id_cliente}", response_model=ClienteOut)
async def delete_cliente(id_cliente: int, db: AsyncSession = Depends(get_db)):
    db_cliente = await ClienteService.get_by_id(db, id_cliente)
    if not db_cliente:
        raise HTTPException(status_code=404, detail="Cliente not found")
    cliente = await ClienteService.delete(db, db_cliente)
    return ClienteOut.model_validate(cliente)
