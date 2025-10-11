import type { Files, FilesResponse } from "@/interfaces";
import { photosApi } from "@/lib/photos-api";

export const getPhotos = async (): Promise<{
  ok: boolean;
  msg: string;
  data?: Files[];
}> => {
  const response = await photosApi.get<FilesResponse>("/files");
  if (response.status !== 200) {
    return {
      ok: false,
      msg: "Error al cargar archivos",
    };
  }
  const data: Files[] = response.data.archivos.map((file: Files) => ({
    id: file.id,
    nombre_fact: file.nombre_fact,
    url: file.url,
    nombre: file.nombre,
    type: file.url.includes(".mp4") ? "video" : "image",
  }));
  return {
    ok: true,
    msg: "Archivos cargados correctamente",
    data,
  };
};
