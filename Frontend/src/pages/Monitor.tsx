// LIBRERIAS
import axios from "axios";
import { useState, useEffect } from "react";
// ICONOS
import { MdOutlineInsertPhoto, MdFiberManualRecord } from "react-icons/md";
import { IoCamera } from "react-icons/io5";
import { HiMiniFaceFrown } from "react-icons/hi2";
import { CgSpinnerAlt } from "react-icons/cg";
import { MdOutlineVideocamOff } from "react-icons/md";
// COMPONENTES
import { useToast } from "../components/UI/ToastContext";
import { Tooltip } from "../components/UI/Tooltip";
import { URL } from "@/utils";
import { CameraImage } from "@/components/CameraImage";
import { CameraVideo } from "@/components/CameraVideo";

interface Camera {
  id: number,
  name: String,
  location: String,
}

async function fetchCameras() {
  try {
    const response = await axios.get<Camera[]>(`${URL}/camaras/`);
    return response.data.map((camera: Camera) => ({
      id: camera.id,
      name: camera.name || `Cámara ${camera.id}`,
      location: camera.location || "Ubicación desconocida",
    }));
  } catch (error) {
    return "404";
  }
}

export function Monitor() {
  const { showToast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isErrorNet, setIsErrorNet] = useState(false);
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [currentTime, setCurrentTime] = useState({
    fecha: "",
    hora: "",
  });
  const [loadingCameras, setLoadingCameras] = useState(true);

  useEffect(() => {
    const loadCameras = async () => {
      setLoadingCameras(true);
      setIsErrorNet(false);
      try {
        const cameras = await fetchCameras();
        if (cameras == "404"){
          showToast("No se pudo conectar al servidor.", "error");
          setIsErrorNet(true);
        }
        else{
          setCameraList(cameras ?? []);
          if (cameras.length > 0) {
            showToast("Cámaras cargadas correctamente", "success");
          } else if (cameras.length === 0) {
            showToast("No se encontraron cámaras.", "warning");
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
            showToast("No se pudo conectar al servidor.", "error");
          } else {
            showToast("Error al cargar cámaras.", "error");
          }
        } else {
          showToast("Error al cargar cámaras.", "error");
        }
      } finally {
        setLoadingCameras(false);
      }
    };
    loadCameras();
  }, []);


  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const fecha = now.toLocaleDateString();
      const hora = now.toLocaleTimeString();
      setCurrentTime({ fecha, hora });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCameraClick = (camera: Camera) => {
    setSelectedCamera(camera);
    showToast(`Cámara seleccionada:\n ${camera.name}`, "info");
  };

  const handleSaveImage = async () => {
    if (!selectedCamera) {
      showToast("Selecciona una cámara primero.", "error");
      return;
    }
    try {
      const response = await axios.post(`${URL}/camaras/screenshot/${selectedCamera.id}`);
      if (response.data.status === "success") {
        showToast(`Captura guardada: ${response.data.filename}`, "success");
      } else {
        showToast("Error al guardar la captura.", "error");
      }
    } catch (error) {
      showToast("No se pudo conectar al servidor.", "error");
    }
  };

  const handleRecordVideo = async () => {
    if (!selectedCamera) {
      showToast("Selecciona una cámara primero.", "error");
      return;
    }
    try {
      if (!isRecording) {
        const response = await axios.post(`${URL}/camaras/iniciar_grabacion/${selectedCamera.id}`);
        if (response.data.status === "success") {
          showToast(`Grabación iniciada.`, "success");
          setIsRecording(true);
        } else {
          showToast("Error al iniciar la grabación.", "error");
        }
      } else {
        const response = await axios.post(`${URL}/camaras/detener_grabacion/${selectedCamera.id}`);
        if (response.data.status === "success") {
          showToast("Grabación detenida.", "success");
          setIsRecording(false);
        } else {
          showToast("Error al detener la grabación.", "error");
        }
      }
    } catch (error) {
      showToast("No se pudo conectar al servidor.", "error");
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row mt-10 gap-4 lg:h-[80dvh] max-w-[80rem] mx-auto px-4 mb-5">
      {/* Sección de cámaras */}
      <div className="border border-slate-600 bg-slate-900 rounded-md p-3 w-full lg:w-[20rem] flex gap-3 overflow-x-auto lg:overflow-y-auto lg:flex-col relative">
        {/* Encabezado solo en escritorio */}
        <div className="bg-slate-900 hidden lg:flex gap-2 items-center justify-center sticky top-0 z-20 py-2 w-full border-b border-slate-600">
          <IoCamera className="text-sky-600 text-[1.5rem]" />
          <span className="text-center font-bold text-[1.2rem]">Selector de Cámaras</span>
        </div>
        {/* Mensaje de error */}
        {loadingCameras ? (
          <div className="flex flex-row items-center justify-center h-full w-full text-slate-400 gap-2 text-[2vh]">
            <span>Cargando cámaras...</span>
            <CgSpinnerAlt className="animate-spin text-cyan-500" />
          </div>
        ) : cameraList.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 h-full w-full bg-slate-500/10 p-4 text-red-500 font-bold text-center rounded-b-md">
            <div className="p-2 border border-slate-600 shadow shadow-slate-600/50 bg-slate-50/5 rounded-full">
              { isErrorNet ? <HiMiniFaceFrown className="text-[5rem]" /> : <MdOutlineVideocamOff className="text-[5rem]" />}
            </div>
            { isErrorNet ? <span>Verifica la conexión al servidor.</span> : <span>No se encontraron cámaras.</span>}
          </div>
        ) : (
          cameraList.map((camera) => (
            <button
              key={camera.id}
              type="button"
              onClick={() => handleCameraClick(camera)}
              className="border border-slate-600 bg-slate-900 hover:border-slate-400 hover:bg-slate-800 active:border-slate-500 active:bg-slate-950 transition-all w-[10rem] lg:w-full min-h-[10rem] relative overflow-hidden rounded-md shrink-0"
              aria-label={`Seleccionar cámara ${camera.name}`}
            >
              <div className="absolute top-0 left-0 ms-2 mt-1 flex flex-col text-start z-10">
                <span className="font-bold text-[1.2rem]">{camera.name}</span>
                <span className="text-white/75 text-[.8rem]">{camera.location}</span>
              </div>
              <CameraVideo camId={camera.id} />
            </button>
          ))
        )}
      </div>
      {/* Sección de visualización */}
      <div className="border border-slate-600 bg-slate-900 rounded-md p-3 w-full max-w-[100vh] grid" style={{ gridTemplateRows: 'auto 1fr auto' }}>
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <MdFiberManualRecord className={`${selectedCamera && !isRecording ? 'text-green-600 animate-pulse' : selectedCamera && isRecording ? 'text-red-600 animate-pulse' : 'text-white'}`} />
            <span>{selectedCamera ? selectedCamera.name : "Seleccione una cámara"}</span>
            <span className="text-white/50">{selectedCamera?.location}</span>
          </div>
          <div className="flex flex-wrap gap-2 text-white/50">
            <div className="flex gap-1">
              <span>Fecha:</span>
              <span>{currentTime.fecha}</span>
            </div>
            <div className="flex gap-1">
              <span>Hora:</span>
              <span>{currentTime.hora}</span>
            </div>
          </div>
        </div>
        {/* Imagen */}
        <div className="mt-3 rounded-md overflow-hidden bg-slate-700 min-h-[40dvh]">
          {selectedCamera && <CameraImage camId={selectedCamera.id} />} {
            <div className="w-full h-full flex justify-center items-center bg-slate-950 relative">
              <div className="w-full h-full bg-black/50 absolute z-10"></div>
              <video className="h-full w-full object-contain absolute z-0" src="/noise.mp4" autoPlay loop aria-label="Ruido de fondo"></video>
            </div>
          }
        </div>
        {/* Botones */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 mb-3">
          {selectedCamera ? (
            <>
              <Tooltip text="Guardar una imagen de la cámara seleccionada">
                <button
                  onClick={handleSaveImage}
                  className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-3 sm:py-2 rounded-md flex items-center gap-2 transition-all"
                  aria-label="Guardar captura de la cámara seleccionada"
                >
                  <MdOutlineInsertPhoto /> <span className="hidden sm:block">Guardar captura</span>
                </button>
              </Tooltip>
              <Tooltip text={`${isRecording ? "Detiene la grabación realizada" : "Realiza una grabación con la cámara seleccionada"}`}>
                <button
                  onClick={handleRecordVideo}
                  className={`${isRecording ? 'bg-amber-600' : 'bg-red-600'} ${isRecording ? 'hover:bg-amber-700' : 'hover:bg-red-700'} ${isRecording ? 'active:bg-amber-800' : 'active:bg-red-800'} text-white px-4 py-3 sm:py-2 rounded-md flex items-center gap-2 transition-all`}
                  aria-label={isRecording ? "Detener grabación" : "Iniciar grabación"}
                >
                  <MdFiberManualRecord /> <span className="hidden sm:block">{isRecording ? 'Detener grabación' : 'Grabar video'}</span>
                </button>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip text="Botón deshabilitado.">
                <button
                  className="bg-neutral-700 hover:bg-neutral-600 hover:cursor-not-allowed! text-white px-4 py-3 sm:py-2 rounded-md flex items-center gap-2 transition-all"
                  aria-label="Guardar captura (deshabilitado)"
                  disabled
                >
                  <MdOutlineInsertPhoto /> <span className="hidden sm:block">Guardar captura</span>
                </button>
              </Tooltip>
              <Tooltip text="Botón deshabilitado.">
                <button
                  className="bg-neutral-700 hover:bg-neutral-600 hover:cursor-not-allowed! text-white px-4 py-3 sm:py-2 rounded-md flex items-center gap-2 transition-all"
                  aria-label="Grabar video (deshabilitado)"
                  disabled
                >
                  <MdFiberManualRecord /> <span className="hidden sm:block">Grabar video</span>
                </button>
              </Tooltip>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
