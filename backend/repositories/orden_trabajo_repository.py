from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy import func
from backend.models.orden_trabajo_model import OrdenTrabajo

class OrdenTrabajoRepository:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 10):
        total_result = await db.execute(func.count(OrdenTrabajo.id_orden_trabajo))
        total = total_result.scalar()
        result = await db.execute(
            select(OrdenTrabajo)
            .options(
                selectinload(OrdenTrabajo.cliente),
                selectinload(OrdenTrabajo.estado),
                selectinload(OrdenTrabajo.archivos),  # Cargar archivos asociados
                selectinload(OrdenTrabajo.sistema)  # Cargar objeto sistema asociado
            )
            .offset(skip).limit(limit)
        )
        return result.scalars().all(), total

    @staticmethod
    async def get_by_id(db: AsyncSession, id_orden_trabajo: int):
        result = await db.execute(
            select(OrdenTrabajo)
            .options(
                selectinload(OrdenTrabajo.cliente),
                selectinload(OrdenTrabajo.estado),
                selectinload(OrdenTrabajo.archivos),  # Cargar archivos asociados
                selectinload(OrdenTrabajo.sistema)  # Cargar objeto sistema asociado
            )
            .where(OrdenTrabajo.id_orden_trabajo == id_orden_trabajo)
        )
        return result.scalars().first()

    @staticmethod
    async def create(db: AsyncSession, orden_data: dict):
        orden_data.pop('id_estado', None)
        orden_data.pop('id_etapa', None)
        orden_data.pop('fecha_creacion', None)
        db_orden = OrdenTrabajo(**orden_data)
        db.add(db_orden)
        await db.commit()
        await db.refresh(db_orden)
        
        # Recargar con relaciones
        result = await db.execute(
            select(OrdenTrabajo)
            .options(
                selectinload(OrdenTrabajo.cliente),
                selectinload(OrdenTrabajo.estado),
                selectinload(OrdenTrabajo.archivos),
                selectinload(OrdenTrabajo.sistema)
            )
            .where(OrdenTrabajo.id_orden_trabajo == db_orden.id_orden_trabajo)
        )
        return result.scalars().first()

    @staticmethod
    async def update(db: AsyncSession, db_orden: OrdenTrabajo, updates: dict):
        updates.pop('id_estado', None)
        updates.pop('id_etapa', None)
        updates.pop('fecha_creacion', None)
        for key, value in updates.items():
            setattr(db_orden, key, value)
        await db.commit()
        await db.refresh(db_orden)
        return db_orden

    @staticmethod
    async def delete(db: AsyncSession, db_orden: OrdenTrabajo):
        await db.delete(db_orden)
        await db.commit()
        return db_orden
