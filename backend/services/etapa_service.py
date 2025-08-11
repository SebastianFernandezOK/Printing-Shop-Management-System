from backend.repositories.etapa_repository import (
    get_etapas,
    get_etapa,
    create_etapa,
    update_etapa,
    delete_etapa,
)
from backend.schemas.etapa_schema import EtapaCreate, EtapaUpdate
from sqlalchemy.ext.asyncio import AsyncSession

async def get_etapas_service(db: AsyncSession, skip: int = 0, limit: int = 100):
    return await get_etapas(db, skip, limit)

async def get_etapa_service(db: AsyncSession, etapa_id: int):
    return await get_etapa(db, etapa_id)

async def create_etapa_service(db: AsyncSession, etapa: EtapaCreate):
    return await create_etapa(db, etapa)

async def update_etapa_service(db: AsyncSession, etapa_id: int, etapa: EtapaUpdate):
    return await update_etapa(db, etapa_id, etapa)

async def delete_etapa_service(db: AsyncSession, etapa_id: int):
    return await delete_etapa(db, etapa_id)
