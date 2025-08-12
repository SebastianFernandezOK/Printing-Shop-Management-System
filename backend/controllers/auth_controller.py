from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from backend.models.usuario_model import Usuario
from sqlalchemy.future import select
from pydantic import BaseModel
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class TokenResponse(BaseModel):
    token: str

@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    # Busca el usuario por nombre de usuario
    result = await db.execute(select(Usuario).where(Usuario.nombre == form_data.username))
    user = result.scalars().first()
    if not user or not pwd_context.verify(form_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")
    # Devuelve un token simple (en producción usa JWT)
    return {"token": f"fake-token-for-{user.nombre}"}
