from pydantic import BaseModel

class SistemaBase(BaseModel):
    nombre: str
    codigo: str | None = None

class SistemaCreate(SistemaBase):
    pass

class SistemaUpdate(SistemaBase):
    pass

class SistemaOut(SistemaBase):
    id_sistema_impresion: int

    class Config:
        from_attributes = True
