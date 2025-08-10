from backend.repositories.cliente_repository import ClienteRepository
from backend.schemas.cliente_schema import ClienteCreate, ClienteUpdate
from backend.models.cliente_model import Cliente
from sqlalchemy.ext.asyncio import AsyncSession

class ClienteService:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 10):
        return await ClienteRepository.get_all(db, skip, limit)

    @staticmethod
    async def get_by_id(db: AsyncSession, id_cliente: int):
        return await ClienteRepository.get_by_id(db, id_cliente)

    @staticmethod
    async def create(db: AsyncSession, cliente_in: ClienteCreate):
        return await ClienteRepository.create(db, cliente_in.model_dump())

    @staticmethod
    async def update(db: AsyncSession, db_cliente: Cliente, cliente_in: ClienteUpdate):
        return await ClienteRepository.update(db, db_cliente, cliente_in.model_dump())

    @staticmethod
    async def delete(db: AsyncSession, db_cliente: Cliente):
        return await ClienteRepository.delete(db, db_cliente)
