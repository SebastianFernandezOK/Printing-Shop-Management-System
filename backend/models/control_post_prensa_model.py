from sqlalchemy import Column, Integer, Boolean, String, Text, ForeignKey
from backend.core.config import Base

class ControlPostPrensa(Base):
    __tablename__ = "ControlPostPrensa"

    id_control_post_prensa = Column(Integer, primary_key=True, index=True)
    id_orden_trabajo = Column(Integer, ForeignKey("OrdenTrabajo.id_orden_trabajo", ondelete="CASCADE"), unique=True, nullable=False)
    id_maquina = Column(Integer, ForeignKey("Maquina.id_maquina"), nullable=True)
    id_usuario = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=False)
    # STAMPING
    stamping_color = Column(Boolean, nullable=True)
    stamping_registro = Column(Boolean, nullable=True)
    # MEDIO CORTE
    medio_corte_medida = Column(Boolean, nullable=True)
    medio_corte_liner = Column(Boolean, nullable=True)
    # RELIEVE
    relieve_registro = Column(Boolean, nullable=True)
    relieve_altura = Column(Boolean, nullable=True)
    relieve_liner = Column(Boolean, nullable=True)
    # SERIGRAFÍA
    serigrafia_shablon_nro = Column(Boolean, nullable=True)
    serigrafia_volumen = Column(Boolean, nullable=True)
    serigrafia_control_frote = Column(Boolean, nullable=True)
    serigrafia_registro = Column(Boolean, nullable=True)
    # EXAMINADORA
    exam_impresion = Column(Boolean, nullable=True)
    exam_stamping = Column(Boolean, nullable=True)
    exam_relieve = Column(Boolean, nullable=True)
    exam_serigrafia = Column(Boolean, nullable=True)
    exam_troquelado = Column(Boolean, nullable=True)
    exam_cantidad = Column(Boolean, nullable=True)
    # Firmas
    firma_stamping = Column(String, nullable=True)
    firma_relieve = Column(String, nullable=True)
    firma_serigrafia = Column(String, nullable=True)
    firma_medio_corte = Column(String, nullable=True)
    firma_examinadora = Column(String, nullable=True)
    observaciones = Column(Text, nullable=True)
