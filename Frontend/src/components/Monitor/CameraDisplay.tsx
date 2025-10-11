// ICONOS
import { MdFiberManualRecord } from "react-icons/md";
// COMPONENTES
import { CameraImage } from "@/components/Monitor/CameraImage";

interface CameraDisplayProps {
  selectedCamera: {
    id: number;
    name: string;
    location: string;
  } | null;
  isRecording: boolean;
  currentTime: {
    fecha: string;
    hora: string;
  };
}

export function CameraDisplay({ selectedCamera, isRecording, currentTime }: CameraDisplayProps) {
  return (
    <>
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
      <div className="mt-3 rounded-md overflow-hidden bg-slate-700 min-h-[40dvh]">
        {selectedCamera ? (
          <CameraImage camId={selectedCamera.id} />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-slate-950 relative">
            <div className="w-full h-full bg-black/50 absolute z-10"></div>
            <video className="h-full w-full object-contain absolute z-0" src="/noise.mp4" autoPlay loop aria-label="Ruido de fondo"></video>
          </div>
        )}
      </div>
    </>
  );
}
