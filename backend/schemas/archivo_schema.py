from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ArchivoBase(BaseModel):
    nombre: Optional[str]
    tipo: Optional[str]
    ruta: str
    fecha_subida: Optional[datetime]
    orden_id: Optional[int]
    tamaño: Optional[int]
    descripcion: Optional[str]
    usuario_id: Optional[int]

class ArchivoCreate(ArchivoBase):
    pass

class ArchivoRead(ArchivoBase):
    id_archivo: int
    class Config:
        from_attributes = True
