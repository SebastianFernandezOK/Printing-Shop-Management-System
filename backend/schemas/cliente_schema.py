from pydantic import BaseModel

class ClienteBase(BaseModel):
    nombre: str
    trabajo: str | None = None

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(ClienteBase):
    pass

class ClienteOut(ClienteBase):
    id_cliente: int

    class Config:
        from_attributes = True
