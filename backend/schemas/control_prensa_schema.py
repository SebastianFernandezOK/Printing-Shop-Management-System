from pydantic import BaseModel
from typing import Optional

class ControlPrensaBase(BaseModel):
    id_orden_trabajo: int
    id_maquina: Optional[int] = None
    id_usuario: int
    polimeros: Optional[bool] = None
    textos: Optional[bool] = None
    color: Optional[bool] = None
    registro: Optional[bool] = None
    resistencia_frote: Optional[bool] = None
    medidas: Optional[bool] = None
    liner: Optional[bool] = None
    metros_impresos: Optional[bool] = None
    cantidad_tinta: Optional[bool] = None
    cantidad_barniz: Optional[bool] = None
    bobina_1: Optional[bool] = None
    bobina_2: Optional[bool] = None
    bobina_3: Optional[bool] = None
    bobina_4: Optional[bool] = None
    bobina_5: Optional[bool] = None
    bobina_6: Optional[bool] = None
    bobina_7: Optional[bool] = None
    bobina_8: Optional[bool] = None
    bobina_9: Optional[bool] = None
    bobina_10: Optional[bool] = None
    bobina_11: Optional[bool] = None
    bobina_12: Optional[bool] = None
    bobina_13: Optional[bool] = None
    bobina_14: Optional[bool] = None
    bobina_15: Optional[bool] = None
    bobina_16: Optional[bool] = None
    bobina_17: Optional[bool] = None
    bobina_18: Optional[bool] = None
    observaciones: Optional[str] = None

class ControlPrensaCreate(ControlPrensaBase):
    pass

class ControlPrensaUpdate(ControlPrensaBase):
    pass

class ControlPrensaOut(ControlPrensaBase):
    id_control_prensa: int

    class Config:
        from_attributes = True
