from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.core.config import Base
from backend.models.rol_model import Rol
import datetime




class Usuario(Base):
    __tablename__ = "Usuario"

    id_usuario = Column(Integer, primary_key=True, index=True)
    id_rol = Column(Integer, ForeignKey("Rol.id_rol"), nullable=False)
    nombre = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    is_activo = Column(Boolean, default=True)
    creado_en = Column(DateTime, default=datetime.datetime.utcnow)



Usuario.archivos = relationship("ArchivoModel", back_populates="usuario")

def __repr__(self):
    return f"<Usuario(nombre={self.nombre}, email={self.email})>"
