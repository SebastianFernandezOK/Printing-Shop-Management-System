from backend.models.archivo_model import ArchivoModel
from sqlalchemy.ext.asyncio import AsyncSession
from backend.schemas.archivo_schema import ArchivoCreate
from sqlalchemy.future import select

class ArchivoRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, archivo: ArchivoCreate) -> ArchivoModel:
        db_archivo = ArchivoModel(**archivo.dict())
        self.db.add(db_archivo)
        await self.db.commit()
        await self.db.refresh(db_archivo)
        return db_archivo

    async def get_by_id(self, id_archivo: int) -> ArchivoModel:
        result = await self.db.execute(
            select(ArchivoModel).where(ArchivoModel.id_archivo == id_archivo)
        )
        return result.scalar_one_or_none()

    async def get_by_orden(self, orden_id: int):
        result = await self.db.execute(
            select(ArchivoModel).where(ArchivoModel.orden_id == orden_id)
        )
        return result.scalars().all()

    async def delete(self, id_archivo: int):
        archivo = await self.get_by_id(id_archivo)
        if archivo:
            await self.db.delete(archivo)
            await self.db.commit()
        return archivo
