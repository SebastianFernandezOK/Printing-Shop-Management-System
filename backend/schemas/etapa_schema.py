from pydantic import BaseModel

class EtapaBase(BaseModel):
    nombre: str
    orden: int

class EtapaCreate(EtapaBase):
    pass

class EtapaUpdate(EtapaBase):
    pass

class EtapaInDBBase(EtapaBase):
    id_etapa: int

    class Config:
        orm_mode = True

class Etapa(EtapaInDBBase):
    pass
