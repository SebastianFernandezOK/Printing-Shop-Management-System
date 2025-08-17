from sqlalchemy import Column, Integer, String
from backend.core.config import Base

class Estado(Base):
    __tablename__ = "Estado"

    id_estado = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=True)