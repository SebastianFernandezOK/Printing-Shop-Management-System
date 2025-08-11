from pydantic import BaseModel

class TroqueladoBase(BaseModel):
    nombre: str

class TroqueladoCreate(TroqueladoBase):
    pass

class TroqueladoUpdate(TroqueladoBase):
    pass

class TroqueladoOut(TroqueladoBase):
    id_troquelado: int

    class Config:
        from_attributes = True
