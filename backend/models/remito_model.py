from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from backend.core.config import Base

class Remito(Base):
    __tablename__ = "Remito"

    id_remito = Column(Integer, primary_key=True, index=True)
    numero_remito = Column(String, unique=True, nullable=False)
    id_orden_trabajo = Column(Integer, ForeignKey("OrdenTrabajo.id_orden_trabajo", ondelete="CASCADE"), nullable=False)
    fecha_emision = Column(DateTime, nullable=True)
    cantidad_entregada = Column(Integer, nullable=True)
    observaciones = Column(Text, nullable=True)
    id_usuario = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
