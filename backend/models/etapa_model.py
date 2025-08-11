from sqlalchemy import Column, Integer, String
from backend.core.config import Base

class Etapa(Base):
    __tablename__ = "Etapa"

    id_etapa = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    orden = Column(Integer, nullable=False)
