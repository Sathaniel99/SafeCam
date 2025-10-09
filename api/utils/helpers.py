from datetime import datetime

camaras = {
    "0": "Webcam integrada",
    "1": "DroidCam Client",
}
ubicaciones = {
    "Webcam integrada" : "Camara integrada",
    "DroidCam Client" : "Pasillo principal"
}

def nombres_camaras(idx):
    return camaras.get(str(idx), f"Camara {idx}")

def ubicaciones_camaras(name):
    return ubicaciones[name]

def convertir_fecha(fecha_str):
    try:
        dt = datetime.strptime(fecha_str, "%Y%m%d")
        return dt.strftime("%d/%m/%Y")
    except Exception:
        return fecha_str