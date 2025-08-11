from sqlalchemy import Column, Integer, String
from backend.core.config import Base

class Troquelado(Base):
    __tablename__ = "Troquelado"
    id_troquelado = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
