from sqlalchemy import Column, Integer, String
from backend.core.config import Base

class Cliente(Base):
    __tablename__ = "Cliente"
    id_cliente = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    trabajo = Column(String, nullable=True)
