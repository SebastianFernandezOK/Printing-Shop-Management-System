from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ControlCalidadFinalBase(BaseModel):
    id_orden_trabajo: int
    fecha_control: Optional[datetime] = None
    aprobado: Optional[bool] = None
    cantidad_inspeccionada: Optional[int] = None
    cantidad_defectuosa: Optional[int] = None
    observaciones: Optional[str] = None
    id_usuario: int

class ControlCalidadFinalCreate(ControlCalidadFinalBase):
    pass

class ControlCalidadFinalUpdate(ControlCalidadFinalBase):
    pass

class ControlCalidadFinalOut(ControlCalidadFinalBase):
    id_control_calidad: int

    class Config:
        from_attributes = True
