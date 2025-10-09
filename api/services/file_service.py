from fastapi.responses import FileResponse
from fastapi import HTTPException
from utils.helpers import *
import os

SAVE_DIR = 'screenshots'

def listar_files():
    files = os.listdir(SAVE_DIR)
    archivos = []
    for index, nombre in enumerate(files):
        auxiliar = nombre.replace("capture", "")
        if ".jpg" in auxiliar:
            auxiliar = auxiliar.replace(".jpg", "").split("_")
        elif ".mp4" in auxiliar:
            auxiliar = auxiliar.replace(".mp4", "").split("_")
        else:
            ruta_completa = os.path.join(SAVE_DIR, nombre)
            if os.path.exists(ruta_completa):
                os.remove(ruta_completa)
            continue

        file = {
            "id": index,
            "nombre_fact": f"{convertir_fecha(auxiliar[1])} - {auxiliar[2]}",
            "url": f"files/{nombre}",
            "nombre": nombre
        }
        archivos.append(file)
    return {"archivos": archivos}

def obtener_file(filename: str):
    filepath = os.path.join(SAVE_DIR, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    return FileResponse(filepath)

def eliminar_file(filename: str):
    ruta_completa = os.path.join(SAVE_DIR, filename)
    if os.path.exists(ruta_completa):
        os.remove(ruta_completa)
        return {"status": "success"}
    else:
        raise HTTPException(status_code=404, detail="Archivo no encontrado")