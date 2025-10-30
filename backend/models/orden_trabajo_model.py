from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.core.config import Base
from datetime import datetime
from backend.models.archivo_model import ArchivoModel
from backend.models.sistema_model import Sistema

class OrdenTrabajo(Base):
    __tablename__ = "OrdenTrabajo"
    id_orden_trabajo = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("Cliente.id_cliente"), nullable=False)
    id_tipo_troquelado = Column(Integer, ForeignKey("Troquelado.id_troquelado"), nullable=True)
    id_sistema = Column(Integer, ForeignKey("SistemaImpresion.id_sistema_impresion"), nullable=True)
    id_etapa = Column(Integer, ForeignKey("Etapa.id_etapa"), nullable=True)
    id_usuario = Column(Integer, ForeignKey("Usuario.id_usuario"), nullable=True)
    id_estado = Column(Integer, ForeignKey("Estado.id_estado"), nullable=True)
    numero_lote = Column(String)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    soporte = Column(String)
    alto_mm = Column(Float)
    ancho_mm = Column(Float)
    z = Column(Integer)
    desarrollo = Column(Integer)
    alto_desarrollo = Column(Integer)
    metros = Column(Float)
    demasia = Column(Float)
    cantidad_rollos = Column(Integer)
    banda = Column(Integer)
    lado = Column(String)
    sentido_bobina = Column(Integer)
    cantidad_etiquetas = Column(Integer)
    observaciones = Column(Text)

    archivos = relationship("ArchivoModel", back_populates="orden", passive_deletes=True)
    cliente = relationship("Cliente", backref="ordenes_trabajo")
    estado = relationship("Estado")
    sistema = relationship("Sistema")
