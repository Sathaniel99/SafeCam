from fastapi import APIRouter
from services.file_service import listar_files, obtener_file

router = APIRouter(prefix="/files", tags=["Files"])

@router.get("/")
def get_files():
    return listar_files()

@router.get("/{filename}")
def get_file(filename: str):
    return obtener_file(filename)