from pydantic import BaseModel
from typing import Optional

class ControlPrensaBase(BaseModel):
    id_orden_trabajo: int
    id_usuario: int
    metros_registro: Optional[float] = None
    metros_impresos: Optional[float] = None
    observaciones: Optional[str] = None

class ControlPrensaCreate(ControlPrensaBase):
    pass

class ControlPrensaUpdate(ControlPrensaBase):
    pass

class ControlPrensaOut(ControlPrensaBase):
    id_control_prensa: int

    class Config:
        from_attributes = True
