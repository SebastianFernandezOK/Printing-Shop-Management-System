from sqlalchemy import Column, Integer, String
from backend.core.config import Base

class Sistema(Base):
    __tablename__ = "SistemaImpresion"
    id_sistema_impresion = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    codigo = Column(String, nullable=True)
