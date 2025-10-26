from datetime import datetime

camaras = {
    "0": "Webcam Pasillo",
    "1": "Webcam PC",
    "2": "DroidCam Client",
}

ubicaciones = {
    "Webcam Pasillo" : "Pasillo principal",
    "Webcam PC" : "Camara integrada",
    "DroidCam Client" : "Celular TECNO SPARK",
}

def nombres_camaras(idx):
    return camaras.get(str(idx), f"Camara {idx}")

def ubicaciones_camaras(name):
    return ubicaciones[name] if name in ubicaciones else "Desconocida"

def convertir_fecha(fecha_str):
    # Convierte 'YYYYMMDD' a 'DD/MM/YYYY'
    try:
        dt = datetime.strptime(fecha_str, "%Y%m%d")
        return dt.strftime("%d/%m/%Y")
    except Exception:
        return fecha_str