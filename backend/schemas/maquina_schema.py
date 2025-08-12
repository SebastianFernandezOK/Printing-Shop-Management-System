from pydantic import BaseModel
from typing import Optional

class MaquinaBase(BaseModel):
    nombre: str
    tipo: Optional[str] = None

class MaquinaCreate(MaquinaBase):
    pass

class MaquinaUpdate(MaquinaBase):
    pass

class MaquinaOut(MaquinaBase):
    id_maquina: int

    class Config:
        from_attributes = True
