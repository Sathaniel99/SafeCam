import { DownloadRemoveButtons } from "@/components/Gallery/DownloadRemoveButtons";
import { MediaPreview } from "@/components/Gallery/MediaPreview";
import { LoadingFiles } from "@/components/UI/LoadingFiles";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { Link } from "react-router-dom";
import type { Files } from "@/interfaces";

interface Props {
  filteredPhotos: Files[];
  loading: boolean;
  onDelete: (file: Files) => void;
  openLightbox: (idx: number) => void;
}

export const GalleryGrid = ({
  filteredPhotos,
  loading,
  onDelete,
  openLightbox,
}: Props) => {
  if (loading) return <LoadingFiles type="archivos" />;

  if (filteredPhotos.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-96 border border-slate-600 bg-slate-900 rounded-md">
        <div className="border border-slate-600 bg-slate-800 rounded-full">
          <MdOutlineInsertPhoto className="text-[8rem] m-4" />
        </div>
        <h1 className="my-1 text-[1.75rem] font-bold">Sin datos a mostrar</h1>
        <h2 className="my-1">No se encontraron grabaciones.</h2>
        <h3 className="my-1 text-center">
          Comience a capturar en <Link to="/monitor">Monitor</Link>
        </h3>
      </div>
    );

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {filteredPhotos.map((camera, i) => (
        <div
          key={camera.id}
          className="flex justify-center items-center relative h-[10rem] border border-slate-600 rounded-md overflow-hidden group"
        >
          <DownloadRemoveButtons
            camera={camera}
            onDelete={() => onDelete(camera)}
          />
          <span className="absolute top-0 start-0 text-center w-full bg-gradient-to-b from-slate-950 to-transparent font-bold pointer-events-none z-10">
            {camera.nombre_fact}
          </span>
          <MediaPreview camera={camera} openLightbox={() => openLightbox(i)} />
        </div>
      ))}
    </div>
  );
};
