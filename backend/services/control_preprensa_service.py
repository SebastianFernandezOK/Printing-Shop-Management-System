from backend.repositories.control_preprensa_repository import ControlPrePrensaRepository
from backend.schemas.control_preprensa_schema import ControlPrePrensaCreate, ControlPrePrensaUpdate
from backend.models.control_preprensa_model import ControlPrePrensa
from sqlalchemy.ext.asyncio import AsyncSession

class ControlPrePrensaService:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 10):
        return await ControlPrePrensaRepository.get_all(db, skip, limit)

    @staticmethod
    async def get_by_id(db: AsyncSession, id_control_preprensa: int):
        return await ControlPrePrensaRepository.get_by_id(db, id_control_preprensa)

    @staticmethod
    async def create(db: AsyncSession, obj_in: ControlPrePrensaCreate):
        return await ControlPrePrensaRepository.create(db, obj_in.model_dump())

    @staticmethod
    async def update(db: AsyncSession, db_obj: ControlPrePrensa, obj_in: ControlPrePrensaUpdate):
        return await ControlPrePrensaRepository.update(db, db_obj, obj_in.model_dump())

    @staticmethod
    async def delete(db: AsyncSession, db_obj: ControlPrePrensa):
        return await ControlPrePrensaRepository.delete(db, db_obj)
