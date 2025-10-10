import { useState } from "react";
import { CAMERA_API } from "@/utils";

interface CameraVideoProps {
  camId: number;
}

export const CameraVideo = ({ camId }: CameraVideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const handleLoadedData = () => setIsLoading(false);
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };
  return (
    <div className="relative w-full h-[10rem]">
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
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl bg-black/50">
            Sin señal
          </div>
        </div>
      )}
      {!hasError && (
        <img
          src={`${CAMERA_API}${camId}`}
          className="w-full h-full object-contain"
          onLoad={handleLoadedData}
          onError={handleError}
          alt={`Vista previa de la cámara ${camId}`}
        />
      )}
    </div>
  );
};