from fastapi.responses import StreamingResponse, JSONResponse
from fastapi import APIRouter, HTTPException
from services.camera_service import *

router = APIRouter(prefix="/camaras", tags=["Cámaras"])

@router.get("/")
def get_camaras():
    return listar_camaras()

@router.get("/video_feed/{cam_id}")
def get_video_feed(cam_id: int):
    return video_feed(cam_id)

@router.post("/iniciar_grabacion/{cam_id}")
def post_iniciar_grabacion(cam_id: int):
    return iniciar_grabacion(cam_id)

@router.post("/detener_grabacion/{cam_id}")
def post_detener_grabacion(cam_id: int):
    return detener_grabacion(cam_id)

@router.post("/screenshot/{cam_id}")
def post_capture(cam_id: int):
    return capture(cam_id)
