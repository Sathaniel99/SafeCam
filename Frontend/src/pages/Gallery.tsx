// LIBRERIAS
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../components/UI/AlertsContext";
import type { IconType } from "react-icons";
// ICONOS
import { MdOutlineInsertPhoto } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
import { IoVideocamOutline } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
// COMPONENTES
import { URL } from "@/utils";
import { Modal } from "../components/UI/Modal";
import { MediaPreview } from "@/components/Gallery/MediaPreview";
import { StatsCard } from "@/components/Gallery/StatsCard";
import { DownloadRemoveButtons } from "@/components/Gallery/DownloadRemoveButtons";
import type { ColorType } from "@/components/Gallery/StatsCard";
import { LoadingFiles } from "@/components/UI/LoadingFiles";
import { FilterButton } from "@/components/Gallery/FilterButtons";
// LIGHTBOX
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface Files {
  id: number,
  nombre_fact: string,
  url: string,
  nombre: string,
  type: string
}

interface Stat {
  title: React.ReactNode;
  value: number;
  icon: IconType;
  color: ColorType;
}

interface FilesResponse {
  archivos: Files[];
}

async function fetchPhotos() {
  const response = await axios.get<FilesResponse>(URL + '/files/');
  return response.data.archivos.map((file: Files) => ({
    id: file.id,
    nombre_fact: file.nombre_fact,
    url: file.url,
    nombre: file.nombre,
    type: file.url.includes(".mp4") ? "video" : "image"
  }));
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
          showToast("No se encontraron datos.", "info");
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
      return interval;
    };
    animateCount(total, setCountTotal);
    animateCount(imagenes, setCountImagenes);
    animateCount(videos, setCountVideos);
  }, [total, imagenes, videos]);

  const openLightbox = (idx: number) => {
    if (filteredPhotos.length === 0 || idx <= 0 || idx >= filteredPhotos.length) {
      showToast("No hay archivos para mostrar", "info");
      return;
    }
    setIndex(idx);
    setIsOpen(true);
  };

  const handledDelete = async (name: string) => {
    try {
      const response = await axios.post(`${URL}/files/delete/${name}`);
      if (!response.data?.status) {
        showToast("La respuesta del servidor no es válida.", "error");
        return false;
      }
      if (response.data.status === "success") {
        showToast("Archivo eliminado con éxito.", "success");
        setPhotos(prevPhotos => prevPhotos.filter(photo => photo.nombre !== name));
        return true;
      }
      else {
        const errorMessage = response.data?.message || "Error al eliminar el archivo.";
        showToast(errorMessage, "error");
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
          showToast("No se pudo conectar al servidor.", "error");
        }
        else {
          showToast("Error al enviar la solicitud.", "error");
        }
      }
      else {
        showToast("Error de conexión.", "error");
      }
      return false;
    }
  };

  const stats: Stat[] = [
    {
      title: "ARCHIVOS",
      value: countTotal,
      icon: VscFileSubmodule,
      color: "amber",
    },
    {
      title: "IMÁGENES",
      value: countImagenes,
      icon: MdOutlineInsertPhoto,
      color: "green",
    },
    {
      title: "VIDEOS",
      value: countVideos,
      icon: IoVideocamOutline,
      color: "cyan",
    },
  ];
  const filterbuttons = [
    {
      text: "Todo",
      tooltip: "Muestra todos los archivos (Videos y Fotos) guardadas.",
      value: "todo",
    },
    {
      text: "Imagenes",
      tooltip: "Muestra todas las Fotos guardadas.",
      value: "imagenes",
    },
    {
      text: "Video",
      tooltip: "Muestra todos los Videos guardados.",
      value: "video",
    },
  ]

  return (
    <div className="max-w-[80rem] m-auto px-4">
      <div className="my-10">
        <h1 className="text-[3vh] font-bold flex gap-2" style={{ lineHeight: 0.9 }}><FaSave className="text-blue-700" />ARCHIVOS GUARDADOS</h1>
        <h2 className="text-white/75 mt-2 text-center sm:text-start">Todas las grabaciones y capturas.</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {stats.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color}/>
        ))}
      </div>
      <div className="flex justify-start mt-5">
        <div className="flex bg-slate-700 p-1 rounded-md">
          {filterbuttons.map((button, index) => (
            <FilterButton text={button.text} tooltipText={button.tooltip} filterValue={button.value} activeFilter={photosFilter} onClick={setPhotosFilter} key={index} />  
          ))}
        </div>
      </div>
      <div className={`w-full border border-slate-600 bg-slate-900 mt-5 mb-10 min-h-96 rounded-md ${filteredPhotos.length === 0 ? 'flex flex-col items-center justify-center' : 'p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'}`}>
        {loading ? (
          <LoadingFiles type={"archivos"} />
        ) : filteredPhotos.length === 0 ? (
          <>
            <div className="border border-slate-600 bg-slate-800 rounded-full">
              <MdOutlineInsertPhoto className="text-[8rem] m-4" />
            </div>
            <h1 className="my-1 text-[1.75rem] font-bold">Sin datos a mostrar</h1>
            <h2 className="my-1">No se encontraron grabaciones.</h2>
            <h3 className="my-1 text-center">
              Comience a capturar imágenes o grabar videos en la página de{" "}
              <Link to={"/monitor"}>Monitor</Link>
            </h3>
          </>
        ) : (
          filteredPhotos.map((camera) => (
            <div className="flex justify-center items-center relative h-[10rem] border border-slate-600 rounded-md overflow-hidden group" key={camera.id}>
              <DownloadRemoveButtons
                camera={camera}
                URL={URL}
                onDelete={() => setFileToDelete(camera)}
                setModalOpen={setModalOpen}
              />
              <span className="absolute top-0 start-0 text-center w-full bg-gradient-to-b from-slate-950 to-transparent font-bold pointer-events-none z-10">{camera.nombre_fact}</span>
              <MediaPreview camera={camera} openLightbox={openLightbox} URL={URL} />
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
