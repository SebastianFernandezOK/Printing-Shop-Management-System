from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from backend.models.usuario_model import Usuario
from backend.schemas.usuario_schema import UsuarioCreate, UsuarioUpdate
from typing import Optional, List, Tuple

class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, user_id: int) -> Optional[Usuario]:
        result = await self.db.execute(select(Usuario).where(Usuario.id_usuario == user_id))
        return result.scalars().first()

    async def get_by_email(self, email: str) -> Optional[Usuario]:
        result = await self.db.execute(select(Usuario).where(Usuario.email == email))
        return result.scalars().first()

    async def create(self, user: UsuarioCreate, password_hash: str) -> Usuario:
        db_user = Usuario(
            id_rol=user.id_rol,
            nombre=user.nombre,
            email=user.email,
            password_hash=password_hash,
            is_activo=user.is_activo
        )
        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)
        return db_user

    async def list_users(self, limit: int = 10, offset: int = 0) -> Tuple[List[Usuario], int]:
        result = await self.db.execute(select(Usuario).offset(offset).limit(limit))
        usuarios = result.scalars().all()
        total = await self.db.scalar(select(func.count()).select_from(Usuario))
        return usuarios, total

    async def update(self, user_id: int, user: UsuarioUpdate, password_hash: Optional[str]) -> Optional[Usuario]:
        db_user = await self.get_by_id(user_id)
        if not db_user:
            return None
        db_user.id_rol = user.id_rol
        db_user.nombre = user.nombre
        db_user.email = user.email
        if password_hash:
            db_user.password_hash = password_hash
        db_user.is_activo = user.is_activo
        await self.db.commit()
        await self.db.refresh(db_user)
        return db_user

    async def delete(self, user_id: int) -> bool:
        db_user = await self.get_by_id(user_id)
        if not db_user:
            return False
        await self.db.delete(db_user)
        await self.db.commit()
        return True
