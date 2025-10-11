// ICONOS
import { IoCamera } from "react-icons/io5";
import { HiMiniFaceFrown } from "react-icons/hi2";
import { MdOutlineVideocamOff } from "react-icons/md";
// COMPONENTES
import { LoadingFiles } from "@/components/UI/LoadingFiles";
import { CameraVideo } from "@/components/Monitor/CameraVideo";

interface Camera {
  id: number;
  name: string;
  location: string;
}

interface CameraSelectorProps {
  cameraList: Camera[];
  loadingCameras: boolean;
  isErrorNet: boolean;
  selectedCamera: Camera | null;
  onCameraClick: (camera: Camera) => void;
}

export function CameraSelector({ cameraList, loadingCameras, isErrorNet, selectedCamera, onCameraClick }: CameraSelectorProps) {
  return (
    <div className="border border-slate-600 bg-slate-900 rounded-md p-3 w-full lg:w-[20rem] flex gap-3 overflow-x-auto lg:overflow-y-auto lg:flex-col relative">
      <div className="bg-slate-900 hidden lg:flex gap-2 items-center justify-center sticky top-0 z-20 py-2 w-full border-b border-slate-600">
        <IoCamera className="text-sky-600 text-[1.5rem]" />
        <span className="text-center font-bold text-[1.2rem]">Selector de Cámaras</span>
      </div>
      {loadingCameras ? (
        <LoadingFiles type={"camaras"} />
      ) : cameraList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 h-full w-full bg-slate-500/10 p-4 text-red-500 font-bold text-center rounded-b-md">
          <div className="p-2 border border-slate-600 shadow shadow-slate-600/50 bg-slate-50/5 rounded-full">
            {isErrorNet ? <HiMiniFaceFrown className="text-[5rem]" /> : <MdOutlineVideocamOff className="text-[5rem]" />}
          </div>
          {isErrorNet ? <span>Verifica la conexión al servidor.</span> : <span>No se encontraron cámaras.</span>}
        </div>
      ) : (
        cameraList.map((camera) => (
          <button
            key={camera.id}
            type="button"
            onClick={() => onCameraClick(camera)}
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
  );
}
