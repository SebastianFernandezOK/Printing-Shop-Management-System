from pydantic import BaseModel
from typing import Optional

class ControlPostPrensaBase(BaseModel):
    id_orden_trabajo: int
    id_maquina: Optional[int] = None
    id_usuario: int
    stamping_color: Optional[bool] = None
    stamping_registro: Optional[bool] = None
    medio_corte_medida: Optional[bool] = None
    medio_corte_liner: Optional[bool] = None
    relieve_registro: Optional[bool] = None
    relieve_altura: Optional[bool] = None
    relieve_liner: Optional[bool] = None
    serigrafia_shablon_nro: Optional[bool] = None
    serigrafia_volumen: Optional[bool] = None
    serigrafia_control_frote: Optional[bool] = None
    serigrafia_registro: Optional[bool] = None
    exam_impresion: Optional[bool] = None
    exam_stamping: Optional[bool] = None
    exam_relieve: Optional[bool] = None
    exam_serigrafia: Optional[bool] = None
    exam_troquelado: Optional[bool] = None
    exam_cantidad: Optional[bool] = None
    firma_stamping: Optional[str] = None
    firma_relieve: Optional[str] = None
    firma_serigrafia: Optional[str] = None
    firma_medio_corte: Optional[str] = None
    firma_examinadora: Optional[str] = None
    observaciones: Optional[str] = None

class ControlPostPrensaCreate(ControlPostPrensaBase):
    pass

class ControlPostPrensaUpdate(ControlPostPrensaBase):
    pass

class ControlPostPrensaOut(ControlPostPrensaBase):
    id_control_post_prensa: int

    class Config:
        from_attributes = True
