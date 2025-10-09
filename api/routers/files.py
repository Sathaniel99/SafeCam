from services.file_service import *
from fastapi import APIRouter

router = APIRouter(prefix="/files", tags=["Files"])

@router.get("/")
def get_files():
    return listar_files()

@router.get("/{filename}")
def get_file(filename: str):
    return obtener_file(filename)

@router.post("/delete/{filename}")
def get_file(filename: str):
    return eliminar_file(filename)