from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from backend.schemas.cliente_schema import ClienteOut
from backend.schemas.estado_schema import EstadoRead
from backend.schemas.archivo_schema import ArchivoRead
from backend.schemas.sistema_schema import SistemaOut

class OrdenTrabajoBase(BaseModel):
    cliente_id: int
    id_tipo_troquelado: Optional[int] = None
    id_sistema: Optional[int] = None
    id_usuario: Optional[int] = None
    numero_lote: Optional[str] = None
    fecha_creacion: Optional[datetime] = None
    soporte: Optional[str] = None
    alto_mm: Optional[float] = None
    ancho_mm: Optional[float] = None
    z: Optional[float] = None
    desarrollo: Optional[float] = None
    alto_desarrollo: Optional[float] = None
    metros: Optional[float] = None
    demasia: Optional[float] = None
    cantidad_rollos: Optional[int] = None
    banda: Optional[int] = None
    lado: Optional[str] = None
    sentido_bobina: Optional[int] = None
    cantidad_etiquetas: Optional[int] = None
    observaciones: Optional[str] = None

class OrdenTrabajoCreate(OrdenTrabajoBase):
    pass

class OrdenTrabajoUpdate(OrdenTrabajoBase):
    pass

class OrdenTrabajoOut(OrdenTrabajoBase):
    id_orden_trabajo: int
    id_etapa: Optional[int] = None
    id_estado: Optional[int] = None
    cliente: Optional[ClienteOut] = None
    estado: Optional[EstadoRead] = None
    sistema: Optional[SistemaOut] = None
    archivos: Optional[list[ArchivoRead]] = None

    class Config:
        from_attributes = True
