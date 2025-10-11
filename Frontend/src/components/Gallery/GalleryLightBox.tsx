import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import type { Files } from "@/interfaces";
import { URL } from "@/utils";

interface Props {
  open: boolean;
  index: number;
  setOpen: (value: boolean) => void;
  filteredPhotos: Files[];
}

/**
 * Lightbox reutilizable para visualizar imágenes o videos
 */
export const GalleryLightbox = ({
  open,
  index,
  setOpen,
  filteredPhotos,
}: Props) => {
  if (!filteredPhotos.length) return null;

  const slides = filteredPhotos.map((photo) => {
    if (photo.type === "video") {
      return {
        type: "video",
        width: 1920,
        height: 1080,
        sources: [{ src: `${URL}/${photo.url}`, type: "video/mp4" }],
        poster: `${URL}/${photo.url.replace(".mp4", ".jpg")}`,
      };
    }
    return {
      type: "image",
      src: `${URL}/${photo.url}`,
      alt: String(photo.nombre),
      width: 1920,
      height: 1080,
    };
  });

  return (
    <Lightbox
      open={open}
      index={index}
      close={() => setOpen(false)}
      slides={slides}
      plugins={[Video, Fullscreen, Zoom]}
    />
  );
};
