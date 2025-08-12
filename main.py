# Archivo principal para iniciar la aplicación FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
from backend.core.config import settings

app = FastAPI()

# Define aquí los orígenes permitidos para CORS
ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Cambia o agrega orígenes según tu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuario_router)
app.include_router(rol_router)
app.include_router(cliente_router)
app.include_router(orden_trabajo_router)
app.include_router(troquelado_router)
app.include_router(sistema_router)
app.include_router(etapa_router)
app.include_router(control_preprensa_router)
app.include_router(control_prensa_router)
app.include_router(maquina_router)
app.include_router(control_post_prensa_router)
app.include_router(control_calidad_router)

# Aquí se incluirán los routers de los controladores

