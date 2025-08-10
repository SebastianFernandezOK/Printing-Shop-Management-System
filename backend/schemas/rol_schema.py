from pydantic import BaseModel, ConfigDict
from typing import Optional

class RolBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class RolRead(RolBase):
    id_rol: int

    class Config:
        from_attributes = True
