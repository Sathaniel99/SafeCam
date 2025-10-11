interface MediaPreviewProps {
  camera: {
    id: number;
    nombre_fact: string;
    url: string;
    type: string;
  };
  openLightbox: (id: number) => void;
  URL: string;
}

export const MediaPreview = ({ camera, openLightbox, URL } : MediaPreviewProps) => {
    const isVideo = camera.type === "video";
    const mediaClass = "h-full w-auto object-contain pointer-events-none m-auto relative z-2 transform transition-transform duration-500 scale-100 group-hover:scale-110";
    const backgroundClass = "h-full w-full object-cover pointer-events-none m-auto absolute top-0 blur-md transform transition-transform duration-500 group-hover:scale-120 z-0";

    const mediaElement = isVideo ? (
        <video
            className={mediaClass}
            src={`${URL}/${camera.url}`}
            muted
            loop
            aria-label={`Vista previa de video ${camera.nombre_fact}`}
        />
    ) : (
        <img
            className={mediaClass}
            src={`${URL}/${camera.url}`}
            alt={`Vista previa de imagen ${camera.nombre_fact}`}
        />
    );

    const backgroundElement = isVideo ? (
        <video
            className={backgroundClass}
            src={`${URL}/${camera.url}`}
            muted
            loop
            aria-label={`Fondo desenfocado de video ${camera.nombre_fact}`}
        />
    ) : (
        <img
            className={backgroundClass}
            src={`${URL}/${camera.url}`}
            alt={`Fondo desenfocado de imagen ${camera.nombre_fact}`}
        />
    );

    return (
        <>
            <button
                type="button"
                onClick={() => openLightbox(camera.id)}
                aria-label={`Ver ${isVideo ? "video" : "imagen"} ${camera.nombre_fact}`}
            >
                {mediaElement}
            </button>
            {backgroundElement}
        </>
    );
};
