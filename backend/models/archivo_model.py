from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from backend.core.config import Base

class ArchivoModel(Base):
    __tablename__ = "Archivo"

    id_archivo = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=True)
    tipo = Column(String(50), nullable=True)
    ruta = Column(String(255), nullable=False)
    fecha_subida = Column(TIMESTAMP, nullable=True)
    orden_id = Column(Integer, ForeignKey("OrdenTrabajo.id_orden_trabajo", ondelete="CASCADE"), nullable=True)
    tamaño = Column(Integer, nullable=True)
    descripcion = Column(String(255), nullable=True)
    usuario_id = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=True)

    orden = relationship("OrdenTrabajo", back_populates="archivos")
    usuario = relationship("Usuario", back_populates="archivos")
