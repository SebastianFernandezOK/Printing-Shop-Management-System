from pydantic import BaseModel
from typing import Optional

class ControlPrePrensaBase(BaseModel):
    id_orden_trabajo: int
    id_usuario: int
    tipo_curvas: Optional[bool] = None
    banda_2mm_troq: Optional[bool] = None
    img_incrustadas: Optional[bool] = None
    circulo_en_banda: Optional[bool] = None
    etiq_centrada: Optional[bool] = None
    todos_elementos_etiqueta: Optional[bool] = None
    grosor_textos: Optional[bool] = None
    guillotinado: Optional[bool] = None
    seg_color_textos_revertidos: Optional[bool] = None
    polimero_barniz: Optional[bool] = None
    reduccion: Optional[bool] = None
    eliminar_puntos_menos_5: Optional[bool] = None
    trapping: Optional[bool] = None
    logo_zeus: Optional[bool] = None
    observaciones: Optional[str] = None

class ControlPrePrensaCreate(ControlPrePrensaBase):
    pass

class ControlPrePrensaUpdate(ControlPrePrensaBase):
    pass

class ControlPrePrensaOut(ControlPrePrensaBase):
    id_control_preprensa: int
    class Config:
        from_attributes = True
