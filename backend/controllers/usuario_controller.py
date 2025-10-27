from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any
from backend.core.config import get_db
from backend.schemas.usuario_schema import UsuarioCreate, UsuarioRead, UsuarioUpdate
from backend.services.usuario_service import UserService

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=Dict[str, Any])
async def list_users(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    perPage: int = Query(10, ge=1, alias="perPage")
):
    service = UserService(db)
    offset = (page - 1) * perPage
    users, total = await service.list_users(limit=perPage, offset=offset)
    users_data = [UsuarioRead.model_validate(user, from_attributes=True) for user in users]
    return {"data": users_data, "total": total}

@router.get("/{user_id}", response_model=UsuarioRead)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    service = UserService(db)
    user_obj = await service.get_user(user_id)
    if not user_obj:
        raise HTTPException(status_code=404, detail="User not found")
    return user_obj

@router.post("/", response_model=UsuarioRead, status_code=status.HTTP_201_CREATED)
async def create_user(user: UsuarioCreate, db: AsyncSession = Depends(get_db)):
    service = UserService(db)
    db_user = await service.get_user_by_email(user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return await service.create_user(user)

@router.put("/{user_id}", response_model=UsuarioRead)
async def update_user(user_id: int, user: UsuarioUpdate, db: AsyncSession = Depends(get_db)):
    service = UserService(db)
    updated_user = await service.update_user(user_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    service = UserService(db)
    deleted = await service.delete_user(user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return None

@router.get("/usuarios", response_model=List[UsuarioRead])
async def get_usuarios(db: AsyncSession = Depends(get_db)):
    service = UserService(db)
    users, _ = await service.list_users(limit=1000, offset=0)
    return [UsuarioRead.model_validate(user, from_attributes=True) for user in users]
