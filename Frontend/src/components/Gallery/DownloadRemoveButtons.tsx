import { MdOutlineInsertPhoto } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { FaRegTrashAlt, FaDownload } from "react-icons/fa";

interface Camera {
  type: string;
  nombre_fact: string;
  url: string;
}

interface DownloadRemoveButtonsProps {
  camera: Camera;
  onDelete: (camera: Camera) => void;
  onDownload?: () => void;
  setModalOpen: (open: boolean) => void;
}

export function DownloadRemoveButtons({
  camera,
  onDelete,
  setModalOpen,
}: DownloadRemoveButtonsProps) {
  const mediaType = camera.type === "video" ? "video" : "imagen";

  return (
    <div className="absolute bottom-0 start-0 z-10 flex items-center justify-between w-full p-1">
      <div className="p-1 rounded bg-black shadow shadow-black backdrop-blur-3xl">
        {camera.type === "image" ? (
          <MdOutlineInsertPhoto
            className="text-[1.4rem]"
            aria-label="Ícono de imagen"
          />
        ) : (
          <IoVideocamOutline
            className="text-[1.4rem]"
            aria-label="Ícono de video"
          />
        )}
      </div>

      <div className="flex flex-row items-center gap-1">
        <button
          type="button"
          onClick={() => {
            onDelete(camera);
            setModalOpen(true);
          }}
          title={`Eliminar ${mediaType}`}
          aria-label={`Eliminar archivo ${camera.nombre_fact}`}
          className="p-2 rounded bg-red-700 hover:bg-red-600 active:bg-red-800 transition-all duration-200 shadow shadow-black backdrop-blur-3xl"
        >
          <FaRegTrashAlt />
        </button>

        <a
          href={`${URL}/${camera.url}`}
          download={camera.nombre_fact}
          target="_blank"
          rel="noopener noreferrer"
          title={`Descargar ${mediaType}`}
          aria-label={`Descargar ${mediaType} ${camera.nombre_fact}`}
          className="p-2 rounded bg-blue-700 hover:bg-blue-600 active:bg-blue-800 transition-all duration-200 shadow shadow-black backdrop-blur-3xl z-50"
        >
          <FaDownload />
        </a>
      </div>
    </div>
  );
}
