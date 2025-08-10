from sqlalchemy import Column, Integer, String
from app.backend.core.config import Base

class Rol(Base):
    __tablename__ = "Rol"

    id_rol = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=True)
