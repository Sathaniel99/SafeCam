import { useEffect, useState } from "react";
import { useToast } from "@/components/UI/AlertsContext";
import { getPhotos } from "@/api/get-photos";
import type { Files } from "@/interfaces";

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Files[]>([]);
  const [photosFilter, setPhotosFilter] = useState("todo");
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const res = await getPhotos();

      if (!res.ok) {
        showToast(res.msg, "error");
        return;
      }

      if (res.data?.length) {
        setPhotos(res.data);
      } else {
        showToast("No se encontraron datos.", "warning");
      }
    } catch {
      showToast("Error al cargar los archivos.", "success");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return {
    photos,
    photosFilter,
    setPhotos,
    setPhotosFilter,
    loading,
    loadPhotos,
  };
};
