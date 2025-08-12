from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RemitoBase(BaseModel):
    numero_remito: str
    id_orden_trabajo: int
    fecha_emision: Optional[datetime] = None
    cantidad_entregada: Optional[int] = None
    observaciones: Optional[str] = None
    id_usuario: int

class RemitoCreate(RemitoBase):
    pass

class RemitoUpdate(RemitoBase):
    pass

class RemitoOut(RemitoBase):
    id_remito: int

    class Config:
        from_attributes = True
