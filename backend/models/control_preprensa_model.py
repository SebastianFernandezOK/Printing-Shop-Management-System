from sqlalchemy import Column, Integer, Boolean, ForeignKey, Text
from backend.core.config import Base

class ControlPrePrensa(Base):
    __tablename__ = "ControlPrePrensa"
    id_control_preprensa = Column(Integer, primary_key=True, index=True)
    id_orden_trabajo = Column(Integer, ForeignKey("OrdenTrabajo.id_orden_trabajo", ondelete="CASCADE"), unique=True)
    id_usuario = Column(Integer, ForeignKey("Usuario.id_usuario"))
    tipo_curvas = Column(Boolean)
    banda_2mm_troq = Column(Boolean)
    img_incrustadas = Column(Boolean)
    circulo_en_banda = Column(Boolean)
    etiq_centrada = Column(Boolean)
    todos_elementos_etiqueta = Column(Boolean)
    grosor_textos = Column(Boolean)
    guillotinado = Column(Boolean)
    seg_color_textos_revertidos = Column(Boolean)
    polimero_barniz = Column(Boolean)
    reduccion = Column(Boolean)
    eliminar_puntos_menos_5 = Column(Boolean)
    trapping = Column(Boolean)
    logo_zeus = Column(Boolean)
    observaciones = Column(Text)
