from pydantic import BaseModel
from typing import Optional

class EstadoBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None

class EstadoCreate(EstadoBase):
    pass

class EstadoRead(EstadoBase):
    id_estado: int

    class Config:
        orm_mode = True
