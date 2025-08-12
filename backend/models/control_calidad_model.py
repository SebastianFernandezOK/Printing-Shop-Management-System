from sqlalchemy import Column, Integer, Boolean, String, Text, ForeignKey, DateTime
from backend.core.config import Base

class ControlCalidadFinal(Base):
    __tablename__ = "ControlCalidadFinal"

    id_control_calidad = Column(Integer, primary_key=True, index=True)
    id_orden_trabajo = Column(Integer, ForeignKey("OrdenTrabajo.id_orden_trabajo"), nullable=False)
    fecha_control = Column(DateTime, nullable=True)
    aprobado = Column(Boolean, nullable=True)
    cantidad_inspeccionada = Column(Integer, nullable=True)
    cantidad_defectuosa = Column(Integer, nullable=True)
    observaciones = Column(Text, nullable=True)
    id_usuario = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
