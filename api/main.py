from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import cameras, files
from fastapi import FastAPI
import config

app = FastAPI(debug=config.DEBUG)  # Usa la variable DEBUG de config.py

# Usa la variable ALLOWED_ORIGINS de config.py para CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Usa las variables de directorios de config.py para las rutas estáticas
app.mount("/static", StaticFiles(directory=config.STATIC_DIR), name="static")
app.mount("/screenshots", StaticFiles(directory=config.SCREENSHOTS_DIR), name="screenshots")


app.include_router(cameras.router)
app.include_router(files.router)
