from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
import os
from backend.repositories.archivo_repository import ArchivoRepository
from backend.schemas.archivo_schema import ArchivoCreate, ArchivoRead
import shutil
from datetime import datetime
from backend.core.config import get_db, UPLOAD_DIR

router = APIRouter(prefix="/archivos", tags=["archivos"])

UPLOAD_DIR = UPLOAD_DIR
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=ArchivoRead)
async def upload_archivo(
    orden_id: int = Form(...),
    usuario_id: int = Form(None),
    descripcion: str = Form(None),
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    # Obtener la orden para extraer el número de orden
    from backend.repositories.orden_trabajo_repository import OrdenTrabajoRepository
    orden = await OrdenTrabajoRepository.get_by_id(db, orden_id)
    if not orden or not hasattr(orden, 'numero_lote') or not orden.numero_lote:
        numero_orden = str(orden_id)
    else:
        numero_orden = str(orden.numero_lote)
    # Usar el número de orden en el nombre del archivo
    filename = f"{numero_orden}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # Guardar la ruta relativa para servir la imagen correctamente
    ruta_relativa = f"uploads/{filename}"
    archivo_data = ArchivoCreate(
        nombre=file.filename,
        tipo=file.content_type,
        ruta=ruta_relativa,
        fecha_subida=datetime.utcnow(),
        orden_id=orden_id,
        tamaño=file.spool_max_size if hasattr(file, 'spool_max_size') else None,
        descripcion=descripcion,
        usuario_id=usuario_id
    )
    repo = ArchivoRepository(db)
    archivo = await repo.create(archivo_data)
    return archivo

@router.get("/orden/{orden_id}", response_model=list[ArchivoRead])
def get_archivos_by_orden(orden_id: int, db: Session = Depends(get_db)):
    repo = ArchivoRepository(db)
    return repo.get_by_orden(orden_id)

@router.put("/replace/{id_archivo}", response_model=ArchivoRead)
async def replace_archivo(
    id_archivo: int,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    repo = ArchivoRepository(db)
    archivo = await repo.get_by_id(id_archivo)
    if not archivo:
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    # Eliminar archivo físico anterior
    old_path = os.path.join(UPLOAD_DIR, os.path.basename(archivo.ruta))
    if os.path.exists(old_path):
        os.remove(old_path)
    # Obtener la orden para extraer el número de orden
    from backend.repositories.orden_trabajo_repository import OrdenTrabajoRepository
    orden = await OrdenTrabajoRepository.get_by_id(db, archivo.orden_id)
    if not orden or not hasattr(orden, 'numero_lote') or not orden.numero_lote:
        numero_orden = str(archivo.orden_id)
    else:
        numero_orden = str(orden.numero_lote)
    # Usar el número de orden en el nombre del archivo
    filename = f"{numero_orden}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    ruta_relativa = f"uploads/{filename}"
    # Actualizar registro en la DB
    archivo.nombre = file.filename
    archivo.tipo = file.content_type
    archivo.ruta = ruta_relativa
    archivo.fecha_subida = datetime.utcnow()
    await db.commit()
    await db.refresh(archivo)
    return archivo

@router.delete("/{id_archivo}")
async def delete_archivo(id_archivo: int, db: AsyncSession = Depends(get_db)):
    repo = ArchivoRepository(db)
    archivo = await repo.get_by_id(id_archivo)
    if not archivo:
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    # Eliminar archivo físico
    file_path = os.path.join(UPLOAD_DIR, os.path.basename(archivo.ruta))
    if os.path.exists(file_path):
        os.remove(file_path)
    await repo.delete(id_archivo)
    return {"detail": "Archivo eliminado"}
