from sqlalchemy import Column, Integer, String, Float, ForeignKey
from backend.core.config import Base

class ControlPrensa(Base):
    __tablename__ = "ControlPrensa"

    id_control_prensa = Column(Integer, primary_key=True, index=True)
    id_orden_trabajo = Column(Integer, ForeignKey("OrdenTrabajo.id_orden_trabajo"), nullable=False)
    id_usuario = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    metros_registro = Column(Float, nullable=True)
    metros_impresos = Column(Float, nullable=True)
    observaciones = Column(String, nullable=True)
