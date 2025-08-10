from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.cliente_model import Cliente

class ClienteRepository:
    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 10):
        result = await db.execute(select(Cliente).offset(skip).limit(limit))
        return result.scalars().all()

    @staticmethod
    async def get_by_id(db: AsyncSession, id_cliente: int):
        return await db.get(Cliente, id_cliente)

    @staticmethod
    async def create(db: AsyncSession, cliente: dict):
        db_cliente = Cliente(**cliente)
        db.add(db_cliente)
        await db.commit()
        await db.refresh(db_cliente)
        return db_cliente

    @staticmethod
    async def update(db: AsyncSession, db_cliente: Cliente, updates: dict):
        for key, value in updates.items():
            setattr(db_cliente, key, value)
        await db.commit()
        await db.refresh(db_cliente)
        return db_cliente

    @staticmethod
    async def delete(db: AsyncSession, db_cliente: Cliente):
        await db.delete(db_cliente)
        await db.commit()
        return db_cliente
