from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from app.backend.services.rol_service import listar_roles
from app.backend.schemas.rol_schema import RolRead
from typing import List

router = APIRouter(prefix="/roles", tags=["roles"])

@router.get("/", response_model=List[RolRead])
async def get_roles(session: AsyncSession = Depends(get_db)):
    return await listar_roles(session)
