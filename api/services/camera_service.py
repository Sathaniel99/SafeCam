from fastapi.responses import StreamingResponse, JSONResponse
from fastapi import HTTPException
from datetime import datetime
from utils.helpers import *
import threading
import time
import cv2
import os

SAVE_DIR = 'screenshots'
os.makedirs(SAVE_DIR, exist_ok=True)

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def detectar_camaras(max_cams=10):
    cams = []
    for i in range(max_cams):
        cap = cv2.VideoCapture(i)
        if cap is not None and cap.isOpened():
            name = nombres_camaras(i)
            cam_info = {
                "id": i,
                "name": camaras[str(i)],
                "location": ubicaciones_camaras(name),
                "url": f"/camaras/video_feed/{i}"
            }
            cams.append(cam_info)
            cap.release()
    return cams

CAM_INFOS = detectar_camaras(10)
CAMERAS = {cam["id"]: cv2.VideoCapture(cam["id"]) for cam in CAM_INFOS}
FRAME_BUFFERS = {}

def camera_stream_worker(cam_id):
    cam = CAMERAS[cam_id]
    while True:
        ret, frame = cam.read()
        if not ret:
            continue
        FRAME_BUFFERS[cam_id] = frame
        time.sleep(0.01)

for cam_id in CAMERAS:
    t = threading.Thread(target=camera_stream_worker, args=(cam_id,), daemon=True)
    t.start()

active_recordings = {}

def record_video(cam_id: int, duration: int = 60):
    cam = CAMERAS.get(cam_id)
    if not cam or not cam.isOpened():
        return {"status": "error", "detail": "Cámara no disponible."}

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"capture_{timestamp}.mp4"
    filepath = os.path.join(SAVE_DIR, filename)
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    fps = 20.0
    width = int(cam.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cam.get(cv2.CAP_PROP_FRAME_HEIGHT))
    out = cv2.VideoWriter(filepath, fourcc, fps, (width, height))

    start = time.time()
    while time.time() - start < duration and cam_id in active_recordings:
        ret, frame = cam.read()
        if not ret:
            break
        out.write(frame)

    out.release()
    return {"status": "success", "filename": filename}

def listar_camaras():
    return CAM_INFOS

def iniciar_grabacion(cam_id: int):
    if cam_id in active_recordings:
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": "Ya hay una grabación en curso para esta cámara."}
        )
    thread = threading.Thread(target=record_video, args=(cam_id,))
    thread.start()
    active_recordings[cam_id] = thread
    return {"status": "success", "message": "Grabación iniciada."}

def detener_grabacion(cam_id: int):
    if cam_id not in active_recordings:
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": "No hay grabación en curso para esta cámara."}
        )
    del active_recordings[cam_id]
    return {"status": "success", "message": "Grabación detenida."}

def gen_frames(cam_id: int):
    import numpy as np
    prev_frame = None
    try:
        while True:
            frame = FRAME_BUFFERS.get(cam_id)
            if frame is None:
                time.sleep(0.05)
                continue
            frame = cv2.flip(frame, 1)
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.1, 4)
            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
            if prev_frame is not None:
                diff = cv2.absdiff(prev_frame, gray)
                _, thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)
                if np.sum(thresh) > 1000:
                    now = datetime.now().strftime("%d/%m/%Y %I:%M:%S %p")
                    cv2.putText(frame, f"{now}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 4)
                    cv2.putText(frame, f"{now}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            prev_frame = gray
            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
    except GeneratorExit:
        print(f"Cliente desconectado para la cámara {cam_id}")
    except Exception as e:
        print(f"Error en gen_frames: {e}")

def video_feed(cam_id: int):
    if cam_id not in CAMERAS:
        raise HTTPException(status_code=404, detail="Cámara no disponible")
    try:
        return StreamingResponse(gen_frames(cam_id), media_type='multipart/x-mixed-replace; boundary=frame')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el stream: {e}")

def capture(cam_id: int):
    cam = CAMERAS.get(cam_id)
    if not cam or not cam.isOpened():
        return JSONResponse({"status": "error", "detail": "Cámara no disponible."})
    success, frame = cam.read()
    if not success:
        return JSONResponse({"status": "error", "detail": "No se pudo capturar el frame."})
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"capture_{timestamp}.jpg"
    filepath = os.path.join(SAVE_DIR, filename)
    cv2.imwrite(filepath, frame)
    return JSONResponse({"status": "success", "filename": filename})