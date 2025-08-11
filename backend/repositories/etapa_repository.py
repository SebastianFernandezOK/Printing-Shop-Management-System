from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.etapa_model import Etapa
from backend.schemas.etapa_schema import EtapaCreate, EtapaUpdate

async def get_etapas(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(Etapa).offset(skip).limit(limit))
    return result.scalars().all()

async def get_etapa(db: AsyncSession, etapa_id: int):
    result = await db.execute(select(Etapa).where(Etapa.id_etapa == etapa_id))
    return result.scalar_one_or_none()

async def create_etapa(db: AsyncSession, etapa: EtapaCreate):
    db_etapa = Etapa(**etapa.dict())
    db.add(db_etapa)
    await db.commit()
    await db.refresh(db_etapa)
    return db_etapa

async def update_etapa(db: AsyncSession, etapa_id: int, etapa: EtapaUpdate):
    db_etapa = await get_etapa(db, etapa_id)
    if db_etapa is None:
        return None
    for key, value in etapa.dict().items():
        setattr(db_etapa, key, value)
    await db.commit()
    await db.refresh(db_etapa)
    return db_etapa

async def delete_etapa(db: AsyncSession, etapa_id: int):
    db_etapa = await get_etapa(db, etapa_id)
    if db_etapa is None:
        return None
    await db.delete(db_etapa)
    await db.commit()
    return db_etapa
