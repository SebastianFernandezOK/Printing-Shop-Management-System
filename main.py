# Archivo principal para iniciar la aplicación FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.controllers.usuario_controller import router as usuario_router
from backend.controllers.rol_controller import router as rol_router
from backend.controllers.cliente_controller import router as cliente_router
from backend.controllers.orden_trabajo_controller import router as orden_trabajo_router
from backend.controllers.troquelado_controller import router as troquelado_router
from backend.controllers.sistema_controller import router as sistema_router
from backend.controllers.etapa_controller import router as etapa_router
from backend.controllers.control_preprensa_controller import router as control_preprensa_router
from backend.controllers.control_prensa_controller import router as control_prensa_router
from backend.controllers.maquina_controller import router as maquina_router
from backend.controllers.control_post_prensa_controller import router as control_post_prensa_router
from backend.controllers.control_calidad_controller import router as control_calidad_router
from backend.controllers.remito_controller import router as remito_router
from backend.controllers.auth_controller import router as auth_router
from backend.controllers.orden_trabajo_custom_controller import router as orden_trabajo_custom_router
from backend.controllers.estado_controller import router as estado_router
from backend.controllers.archivo_controller import router as archivo_router
from backend.core.config import settings

API_PREFIX = "/api"

app = FastAPI(
    redirect_slashes=False,                       # para evitar 307 por barra final
    docs_url=f"{API_PREFIX}/docs",               # docs bajo /api
    redoc_url=None,
    openapi_url=f"{API_PREFIX}/openapi.json",    # openapi bajo /api
)

# CORS (ajusta orígenes si tenés dominio)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # en prod conviene listar dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Montar TODOS los routers con prefijo /api ===
app.include_router(usuario_router,                 prefix=API_PREFIX)
app.include_router(rol_router,                     prefix=API_PREFIX)
app.include_router(cliente_router,                 prefix=API_PREFIX)
app.include_router(orden_trabajo_router,           prefix=API_PREFIX)
app.include_router(troquelado_router,              prefix=API_PREFIX)
app.include_router(sistema_router,                 prefix=API_PREFIX)
app.include_router(etapa_router,                   prefix=API_PREFIX)
app.include_router(control_preprensa_router,       prefix=API_PREFIX)
app.include_router(control_prensa_router,          prefix=API_PREFIX)
app.include_router(maquina_router,                 prefix=API_PREFIX)
app.include_router(control_post_prensa_router,     prefix=API_PREFIX)
app.include_router(control_calidad_router,         prefix=API_PREFIX)
app.include_router(remito_router,                  prefix=API_PREFIX)
app.include_router(auth_router,                    prefix=API_PREFIX)
app.include_router(orden_trabajo_custom_router,    prefix=API_PREFIX)
app.include_router(estado_router,                  prefix=API_PREFIX)
app.include_router(archivo_router,                 prefix=API_PREFIX)

# archivos estáticos (uploads)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")
