import { photosApi } from "@/lib/photos-api";

export const deleteFile = async (name: string) => {
  const res = await photosApi.delete(`/files/delete/${name}`);
  if (res.status !== 200) {
    return {
      ok: false,
      message: "No se pudo eliminar el archivo",
    };
  }
  return {
    ok: true,
    message: "Archivo eliminado con éxito",
  };
};
