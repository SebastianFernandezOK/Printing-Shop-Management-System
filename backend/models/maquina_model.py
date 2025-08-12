from sqlalchemy import Column, Integer, String
from backend.core.config import Base

class Maquina(Base):
    __tablename__ = "Maquina"

    id_maquina = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    tipo = Column(String, nullable=True)
