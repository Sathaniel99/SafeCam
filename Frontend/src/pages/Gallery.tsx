import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { usePhotos } from "@/hooks/usePhotos";
import { useToast } from "@/components/UI/AlertsContext";
import type { Files } from "@/interfaces";
import { GalleryDeleteModal, GalleryFilters, GalleryGrid, GalleryLightbox, GalleryStats } from "@/components/Gallery";
import { deleteFile } from "@/api/delete-file";

export function Gallery() {
  const { showToast } = useToast();
  const { photos, photosFilter, setPhotosFilter, loading } = usePhotos();

  const [index, setIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<Files | null>(null);

  const filteredPhotos = photos.filter((p) =>
    photosFilter === "todo"
      ? true
      : photosFilter === "imagenes"
        ? p.type === "image"
        : p.type === "video"
  );

  const handleDelete = async (name: string) => {
    const res = await deleteFile(name);
    if (!res.ok) {
      showToast("Error al eliminar archivo", "error");

      return;
    }
    showToast("Archivo eliminado con éxito", "success");
  };

  const openLightbox = (i: number) => {
    if (filteredPhotos.length === 0)
      return showToast("No hay archivos para mostrar", "info");
    setIndex(i);
    setIsOpen(true);
  };

  const total = photos.length;
  const imagenes = photos.filter((p) => p.type === "image").length;
  const videos = photos.filter((p) => p.type === "video").length;

  return (
    <div className="max-w-[80rem] m-auto px-4">
      <div className="my-10">
        <h1
          className="text-[3vh] font-bold flex gap-2"
          style={{ lineHeight: 0.9 }}
        >
          <FaSave className="text-blue-700" /> ARCHIVOS GUARDADOS
        </h1>
        <h2 className="text-white/75 mt-2 text-center sm:text-start">
          Todas las grabaciones y capturas.
        </h2>
      </div>

      <GalleryStats total={total} images={imagenes} videos={videos} />
      <GalleryFilters
        photosFilter={photosFilter}
        setPhotosFilter={setPhotosFilter}
      />

      <div className="w-full border border-slate-600 bg-slate-900 mt-5 mb-10 min-h-96 rounded-md">
        <GalleryGrid
          filteredPhotos={filteredPhotos}
          loading={loading}
          onDelete={setFileToDelete}
          openLightbox={openLightbox}
        />
      </div>

      <GalleryLightbox
        open={isOpen}
        index={index}
        setOpen={setIsOpen}
        filteredPhotos={filteredPhotos}
      />

      <GalleryDeleteModal
        fileToDelete={fileToDelete}
        setFileToDelete={setFileToDelete}
        onConfirm={handleDelete}
      />
    </div>
  );
}
