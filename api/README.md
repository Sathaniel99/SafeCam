# Visor_WebCam con FastAPI, OpenCV y FFmpeg

Este proyecto es una aplicación web para visualizar la webcam, detectar movimiento y rostros, y guardar capturas de pantalla. Está implementado usando FastAPI, OpenCV y opcionalmente FFmpeg para procesamiento de video avanzado.

## Características
- Visualización en tiempo real de la webcam vía streaming MJPEG.
- Detección de rostros y movimiento en tiempo real.
- Guardado de capturas de pantalla con anotaciones.
- API REST para capturas y acceso a imágenes guardadas.

## Requisitos
- Python 3.8+
- FastAPI
- Uvicorn
- OpenCV (opencv-python)
- numpy
- FFmpeg (opcional, para grabación/transcodificación avanzada)

Instala dependencias con:

```bash
pip install -r requirements_fastapi.txt
```

## Uso

1. Ejecuta el servidor:
- Navega hasta la carpeta principal donde se encuentra el main.py y ejecuta el siguiente comando:
```bash
python start.py
```
- O de lo contrario ejecuta el siguiente comando
```bash
uvicorn main_fastapi:app --reload --host 0.0.0.0 --port 5000
```
En el archivo start.py esta la configuración del script de python, ahi puedes configurarlo para no escribirlo completo cada vez que se necesite iniciar, solo llama a start.py y carga toda la configuración.


2. Abre tu navegador en [http://localhost:5000](http://localhost:5000)

## Endpoints principales
- `/` : Página principal con el visor de la webcam.
- `/video_feed` : Stream MJPEG de la webcam.
- `/screenshot` : Guarda una captura de pantalla (POST).
- `/screenshots/{filename}` : Descarga una captura guardada.

## Notas
- FFmpeg puede integrarse para grabar video o hacer streaming en otros formatos si es necesario.
- El código está preparado para detección de movimiento y rostros usando OpenCV.

---

Desarrollado por Sathaniel99, 2025.
# Visor_WebCam con FastAPI, OpenCV y FFmpeg

Este proyecto es una aplicación web para visualizar la webcam, detectar movimiento y rostros, y guardar capturas de pantalla. Está implementado usando FastAPI, OpenCV y opcionalmente FFmpeg para procesamiento de video avanzado.

## Características
- Visualización en tiempo real de la webcam vía streaming MJPEG.
- Detección de rostros y movimiento en tiempo real.
- Guardado de capturas de pantalla con anotaciones.
- API REST para capturas y acceso a imágenes guardadas.

## Requisitos
- Python 3.8+
- FastAPI
- Uvicorn
- OpenCV (opencv-python)
- numpy
- FFmpeg (opcional, para grabación/transcodificación avanzada)

Instala dependencias con:

```bash
pip install fastapi uvicorn opencv-python numpy
```

## Uso

1. Ejecuta el servidor:

```bash
uvicorn main:app --reload
```

2. Abre tu navegador en [http://localhost:8000](http://localhost:8000)

## Endpoints principales
- `/` : Página principal con el visor de la webcam.
- `/video_feed` : Stream MJPEG de la webcam.
- `/screenshot` : Guarda una captura de pantalla (POST).
- `/screenshots/{filename}` : Descarga una captura guardada.

## Notas
- FFmpeg puede integrarse para grabar video o hacer streaming en otros formatos si es necesario.
- El código está preparado para detección de movimiento y rostros usando OpenCV.

---

Desarrollado por Sathaniel99, 2025.
