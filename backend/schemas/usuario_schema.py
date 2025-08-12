from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UsuarioBase(BaseModel):
    id_rol: int
    nombre: str
    email: EmailStr
    is_activo: Optional[bool] = True

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioUpdate(UsuarioBase):
    password: Optional[str] = None

class UsuarioRead(UsuarioBase):
    id_usuario: int
    creado_en: Optional[datetime]

    class Config:
        from_attributes = True