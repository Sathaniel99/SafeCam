// LIBRERIAS
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../components/UI/ToastContext";
// ICONOS
import { MdOutlineInsertPhoto } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
import { IoVideocamOutline } from "react-icons/io5";
import { FaSave, FaRegTrashAlt, FaDownload } from "react-icons/fa";
import { CgSpinnerAlt } from "react-icons/cg";
// COMPONENTES
import { URL } from "@/utils";
import { Tooltip } from "@/components/UI/Tooltip";
import { Modal } from "../components/UI/Modal"; // Ajusta la ruta si es necesario
// LIGHTBOX
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { FaCircleInfo } from "react-icons/fa6";

interface Files {
  id: Number,
  nombre_fact: String,
  url: String,
  nombre: String,
  type: String
}

interface FilesResponse {
  archivos: Files[];
}

async function fetchPhotos() {
  try {
    const response = await axios.get<FilesResponse>(URL + 'files/');
    return response.data.archivos.map((file: Files) => ({
      id: file.id,
      nombre_fact: file.nombre_fact,
      url: file.url,
      nombre: file.nombre,
      type: file.url.includes(".mp4") ? "video" : "image"
    }));
  } catch (error) {
    throw error;
  }
}

export function Gallery() {
  const { showToast } = useToast();
  const [photos, setPhotos] = useState<Files[]>([]);
  const [photosFilter, setPhotosFilter] = useState("todo");
  const [index, setIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<Files | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      try {
        const photos = await fetchPhotos();
        setPhotos(photos ?? []);
        if (Array.isArray(photos) && photos.length > 0) {
          showToast("Archivos cargados correctamente", "success");
        } else {
          showToast("No se encontraron datos.", "warning");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
            showToast("No se pudo conectar al servidor.", "error");
          } else {
            showToast("Error al cargar archivos", "error");
          }
        } else {
          showToast("Error al cargar archivos", "error");
        }
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, []);

  const filteredPhotos = Array.isArray(photos)
    ? photos.filter((photo) => {
      if (photosFilter === "todo") return true;
      if (photosFilter === "imagenes") return photo.type === "image";
      if (photosFilter === "video") return photo.type === "video";
      return true;
    })
    : [];

  const total = photos.length;
  const imagenes = photos.filter((photo) => photo.type === "image").length;
  const videos = photos.filter((photo) => photo.type === "video").length;
  const [countTotal, setCountTotal] = useState(0);
  const [countImagenes, setCountImagenes] = useState(0);
  const [countVideos, setCountVideos] = useState(0);

  useEffect(() => {
    const animateCount = (target: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
      let current = 0;
      const step = Math.ceil(target / 30);
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          setter(target);
          clearInterval(interval);
        } else {
          setter(current);
        }
      }, 40);
    };
    animateCount(total, setCountTotal);
    animateCount(imagenes, setCountImagenes);
    animateCount(videos, setCountVideos);
  }, [total, imagenes, videos]);

  const openLightbox = (idx: number) => {
    if (filteredPhotos.length === 0) {
      showToast("No hay archivos para mostrar", "info");
      return;
    }
    setIndex(idx);
    setIsOpen(true);
  };

  const handledDelete = async (name: String) => {
    if (!window.confirm("¿Seguro que deseas eliminar este archivo?")) return;
    try {
      const url = `${URL}/files/delete/${name}`;
      const response = await axios.post(url);
      console.log(response.data);
      if (response.data.status === "success") {
        showToast("Archivo eliminado con éxito.", "success");
        setPhotos(prevPhotos => prevPhotos.filter(photo => photo.nombre !== name));
        return true;
      } else {
        const errorMessage = response.data?.message || "Error al eliminar el archivo.";
        showToast(errorMessage, "error");
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
          showToast("No se pudo conectar al servidor.", "error");
        } else {
          showToast("Error al enviar la solicitud.", "error");
        }
      } else {
        showToast("Error de conexión.", "error");
      }
      return false;
    }
  };

  return (
    <div className="max-w-[80rem] m-auto px-4">
      <div className="my-10">
        <h1 className="text-[3vh] font-bold flex gap-2" style={{ lineHeight: 0.9 }}><FaSave className="text-blue-700" />ARCHIVOS GUARDADOS</h1>
        <h2 className="text-white/75 mt-2 text-center sm:text-start">Todas las grabaciones y capturas.</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="border border-slate-600 flex flex-col justify-between px-4 sm:px-6 py-2 sm:py-4 from-black to-amber-800/50 sm:to-slate-800 bg-gradient-to-br rounded-md text-center sm:text-start relative">
          <div className="font-normal text-white/70 text-sm sm:text-base flex items-center gap-2"><VscFileSubmodule className="hidden md:block text-[1.5rem] text-amber-300" /><span className="flex flex-row">TOTAL <p className="m-0 hidden sm:block">DE ARCHIVOS</p></span></div>
          <h1 className="text-amber-300 font-bold text-[2rem] sm:text-[2.5rem] text-start">{countTotal}</h1>
          <VscFileSubmodule className="sm:hidden absolute bottom-0 end-0 text-[5rem] text-amber-800/25" />
        </div>
        <div className="border border-slate-600 flex flex-col justify-between px-4 sm:px-6 py-2 sm:py-4 from-black to-green-500/50 sm:to-slate-800 bg-gradient-to-br rounded-md text-center sm:text-start relative">
          <span className="font-normal text-white/70 text-sm sm:text-base flex items-center gap-2"><MdOutlineInsertPhoto className="hidden md:block text-[1.5rem] text-green-500" />IMÁGENES</span>
          <h1 className="text-green-500 font-bold text-[2rem] sm:text-[2.5rem] text-start">{countImagenes}</h1>
          <MdOutlineInsertPhoto className="sm:hidden absolute bottom-0 end-0 text-[5rem] text-green-800/25" />
        </div>
        <div className="border border-slate-600 flex flex-col justify-between px-4 sm:px-6 py-2 sm:py-4 from-black to-sky-500/50 sm:to-slate-800 bg-gradient-to-br rounded-md text-center sm:text-start relative">
          <span className="font-normal text-white/70 text-sm sm:text-base flex items-center gap-2"><IoVideocamOutline className="hidden md:block text-[1.5rem] text-sky-500" />VIDEOS</span>
          <h1 className="text-sky-500 font-bold text-[2rem] sm:text-[2.5rem] text-start">{countVideos}</h1>
          <IoVideocamOutline className="sm:hidden absolute bottom-0 end-0 text-[5rem] text-sky-800/25" />
        </div>
      </div>
      <div className="flex justify-start mt-5">
        <div className="flex bg-slate-700 p-1 rounded-md">
          <Tooltip text="Muestra todos los archivos (Videos y Fotos) guardadas.">
            <button type="button" onClick={() => setPhotosFilter("todo")} className={`border ${photosFilter == 'todo' ? 'bg-slate-950 border-slate-600 text-white' : 'bg-transparent border-transparent text-slate-400 active:bg-slate-800'} hover:bg-slate-950 hover:border-slate-600  active:border-slate-700 flex items-center gap-2 hover:text-white p-2 rounded-md transition-all`}>Todo</button>
          </Tooltip>
          <Tooltip text="Muestra todas las Fotos guardadas.">
            <button type="button" onClick={() => setPhotosFilter("imagenes")} className={`border ${photosFilter == 'imagenes' ? 'bg-slate-950 border-slate-600 text-white' : 'bg-transparent border-transparent text-slate-400 active:bg-slate-800'} hover:bg-slate-950 hover:border-slate-600  active:border-slate-700 flex items-center gap-2 hover:text-white p-2 rounded-md transition-all`}>Imagenes</button>
          </Tooltip>
          <Tooltip text="Muestra todos los Videos guardados.">
            <button type="button" onClick={() => setPhotosFilter("video")} className={`border ${photosFilter == 'video' ? 'bg-slate-950 border-slate-600 text-white' : 'bg-transparent border-transparent text-slate-400 active:bg-slate-800'} hover:bg-slate-950 hover:border-slate-600  active:border-slate-700 flex items-center gap-2 hover:text-white p-2 rounded-md transition-all`}>Video</button>
          </Tooltip>
        </div>
      </div>
      <div className={`w-full border border-slate-600 bg-slate-900 mt-5 mb-10 min-h-96 rounded-md ${filteredPhotos.length === 0 ? 'flex flex-col items-center justify-center' : 'p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'}`}>
        {loading ? (
          <div className="flex flex-row items-center justify-center h-40 gap-2 text-[3vh]">
            <span className="mt-2 text-slate-400">Cargando archivos...</span>
            <CgSpinnerAlt className="animate-spin text-cyan-500" />
          </div>
        ) : filteredPhotos.length === 0 ? (
          <>
            <div className="border border-slate-600 bg-slate-800 rounded-full">
              <MdOutlineInsertPhoto className="text-[8rem] m-4" />
            </div>
            <h1 className="my-1 text-[1.75rem] font-bold">Sin datos a mostrar</h1>
            <h2 className="my-1">No se encontraron grabaciones.</h2>
            <h3 className="my-1">
              Comience a capturar imágenes o grabar videos en la página de{" "}
              <Link to={"/monitor"}>Monitor</Link>
            </h3>
          </>
        ) : (
          filteredPhotos.map((camera, i) => (
            <div
              className="relative h-[10rem] border border-slate-600 rounded-md overflow-hidden group"
              key={i}
            >
              <div className="absolute bottom-0 start-0 z-10 flex items-center justify-between w-full">
                <div className="p-1 rounded bg-black/80 shadow shadow-black backdrop-blur-3xl">
                  {camera.type === "image" ? (
                    <MdOutlineInsertPhoto className="text-[1.4rem]" aria-label="Ícono de imagen" />
                  ) : (
                    <IoVideocamOutline className="text-[1.4rem]" aria-label="Ícono de video" />
                  )}
                </div>
                <div className="flex flex-row items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setFileToDelete(camera);
                      setModalOpen(true);
                    }}
                    title={`Eliminar ${camera.type === "video" ? "video" : "imagen"}`}
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
                    title={`Descargar ${camera.type === "video" ? "video" : "imagen"}`}
                    aria-label={`Descargar ${camera.type === "video" ? "video" : "imagen"} ${camera.nombre_fact}`}
                    className="p-2 rounded bg-blue-700 hover:bg-blue-600 active:bg-blue-800 transition-all duration-200 shadow shadow-black backdrop-blur-3xl z-50"
                  >
                    <FaDownload />
                  </a>
                </div>
              </div>


              <span className="absolute top-0 start-0 text-center w-full bg-gradient-to-b from-slate-950 to-transparent font-bold pointer-events-none z-10">{camera.nombre_fact}</span>
              {camera.type === "video" ? (
                <>
                  <button
                    type="button"
                    onClick={() => openLightbox(i)}
                    aria-label={`Ver video ${camera.nombre_fact}`}
                  >
                    <video
                      className="h-full w-auto object-contain pointer-events-none m-auto relative z-2"
                      src={`${URL}/${camera.url}`}
                      muted
                      loop
                      aria-label={`Vista previa de video ${camera.nombre_fact}`}
                    />
                  </button>
                  <video
                    className="h-full w-full object-cover pointer-events-none m-auto absolute top-0 blur-md transform transition-transform duration-500 group-hover:scale-120 z-0"
                    src={`${URL}/${camera.url}`}
                    muted
                    loop
                    aria-label={`Fondo desenfocado de video ${camera.nombre_fact}`}
                  />
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openLightbox(i)}
                    aria-label={`Ver imagen ${camera.nombre_fact}`}
                  >
                    <img
                      className="h-full w-auto object-contain pointer-events-none m-auto relative transform transition-transform duration-500 scale-100 group-hover:scale-110 z-2"
                      src={`${URL}/${camera.url}`}
                      alt={`Vista previa de imagen ${camera.nombre_fact}`}
                    />
                  </button>
                  <img
                    className="h-full w-full object-cover pointer-events-none m-auto absolute top-0 blur-md transform transition-transform duration-500 group-hover:scale-110 z-0"
                    src={`${URL}/${camera.url}`}
                    alt={`Fondo desenfocado de imagen ${camera.nombre_fact}`}
                  />
                </>
              )}
            </div>
          ))
        )}
      </div>
      <Lightbox
        open={isOpen}
        index={index}
        close={() => setIsOpen(false)}
        slides={filteredPhotos.map((photo: Files) => {
          if (photo.type === "video") {
            return {
              type: "video",
              width: 1920,
              height: 1080,
              sources: [
                {
                  src: `${URL}/${photo.url}`,
                  type: "video/mp4",
                },
              ],
              poster: `${URL}/${photo.url.replace(".mp4", ".jpg")}`,
            };
          } else {
            return {
              type: "image",
              src: `${URL}/${photo.url}`,
              alt: String(photo.nombre),
              width: 1920,
              height: 1080,
            };
          }
        })}
        plugins={[Video, Fullscreen, Zoom]}
      />
      {fileToDelete && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={async () => {
            if (fileToDelete) {
              await handledDelete(fileToDelete.nombre);
              setFileToDelete(null);
              setModalOpen(false);
            }
          }}
          icon={<FaCircleInfo />}
          title={`Mensaje de confirmación.`}
          children={`¿Estás seguro de que deseas eliminar ${fileToDelete.type == 'video' ? 'el video creado' : 'la imagen creada'} el ${fileToDelete.nombre_fact.split(" ")[0]}? Esta acción no se puede deshacer.`}
        />
      )}
    </div>
  );
}
