# Archivo principal para iniciar la aplicación FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.controllers.usuario_controller import router as usuario_router
from backend.controllers.rol_controller import router as rol_router
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

# Aquí se incluirán los routers de los controladores

