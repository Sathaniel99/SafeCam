// LIBRERIAS
import { useState, useEffect } from "react";
import axios from "axios";
// COMPONENTES
import { useToast } from "../components/UI/AlertsContext";
import { CameraSelector } from "@/components/Monitor/CameraSelector";
import { CameraDisplay } from "@/components/Monitor/CameraDisplay";
import { CameraControls } from "@/components/Monitor/CameraControls";
import { URL } from "@/utils";

interface Camera {
  id: number;
  name: string;
  location: string;
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
        if (cameras === "404") {
          showToast("No se pudo conectar al servidor.", "error");
          setIsErrorNet(true);
        } else {
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
      console.log(error);
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
    } catch {
      showToast("No se pudo conectar al servidor.", "error");
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row mt-10 gap-4 lg:h-[80dvh] max-w-[80rem] mx-auto px-4 mb-5">
      <CameraSelector
        cameraList={cameraList}
        loadingCameras={loadingCameras}
        isErrorNet={isErrorNet}
        selectedCamera={selectedCamera}
        onCameraClick={handleCameraClick}
      />
      <div className="border border-slate-600 bg-slate-900 rounded-md p-3 w-full max-w-[100vh] grid" style={{ gridTemplateRows: 'auto 1fr auto' }}>
        <CameraDisplay
          selectedCamera={selectedCamera}
          isRecording={isRecording}
          currentTime={currentTime}
        />
        <CameraControls
          selectedCamera={!!selectedCamera}
          isRecording={isRecording}
          onSaveImage={handleSaveImage}
          onRecordVideo={handleRecordVideo}
        />
      </div>
    </div>
  );
}

async function fetchCameras() {
  try {
    const response = await axios.get<Camera[]>(`${URL}/camaras/`);
    return response.data.map((camera: Camera) => ({
      id: camera.id,
      name: camera.name || `Cámara ${camera.id}`,
      location: camera.location || "Ubicación desconocida",
    }));
  } catch {
    return "404";
  }
}
