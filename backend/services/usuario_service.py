from backend.repositories.usuario_repository import UserRepository
from backend.schemas.usuario_schema import UsuarioCreate, UsuarioUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
    def __init__(self, db: AsyncSession):
        self.repo = UserRepository(db)

    async def get_user(self, user_id: int):
        return await self.repo.get_by_id(user_id)

    async def get_user_by_email(self, email: str):
        return await self.repo.get_by_email(email)

    async def create_user(self, user: UsuarioCreate):
        password_hash = pwd_context.hash(user.password)
        return await self.repo.create(user, password_hash)

    async def list_users(self, limit: int = 10, offset: int = 0):
        return await self.repo.list_users(limit=limit, offset=offset)

    async def update_user(self, user_id: int, user: UsuarioUpdate):
        password_hash = pwd_context.hash(user.password) if user.password else None
        return await self.repo.update(user_id, user, password_hash)

    async def delete_user(self, user_id: int):
        return await self.repo.delete(user_id)
