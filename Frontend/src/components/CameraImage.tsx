import { useState } from "react";
import { CAMERA_API } from "@/utils";

interface CameraImageProps {
  camId: number;
}

export const CameraImage = ({ camId }: CameraImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => setIsLoading(false);

  return (
    <div className="relative w-full h-full">
      {(isLoading || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/noise.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-[4rem] bg-black/50 drop-shadow-2xl inset-ring-slate-950">
            Sin señal
          </div>
        </div>
      )}
      {!hasError && camId !== null && (
        <img
          className="w-full h-full object-contain"
          src={`${CAMERA_API}${camId}`}
          alt={`Imagen en vivo de la cámara ${camId}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};