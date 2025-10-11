// LIBRERIAS
import { Tooltip } from "@/components/UI/Tooltip";
// ICONOS
import { MdOutlineInsertPhoto, MdFiberManualRecord } from "react-icons/md";


interface CameraControlsProps {
  selectedCamera: boolean;
  isRecording: boolean;
  onSaveImage: () => void;
  onRecordVideo: () => void;
}

export function CameraControls({ selectedCamera, isRecording, onSaveImage, onRecordVideo }: CameraControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 mb-3">
      {selectedCamera ? (
        <>
          <Tooltip text="Guardar una imagen de la cámara seleccionada">
            <button
              onClick={onSaveImage}
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-3 sm:py-2 rounded-md flex items-center gap-2 transition-all"
              aria-label="Guardar captura de la cámara seleccionada"
            >
              <MdOutlineInsertPhoto /> <span className="hidden sm:block">Guardar captura</span>
            </button>
          </Tooltip>
          <Tooltip text={`${isRecording ? "Detiene la grabación realizada" : "Realiza una grabación con la cámara seleccionada"}`}>
            <button
              onClick={onRecordVideo}
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
  );
}
