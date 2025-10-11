import { Modal } from "@/components/UI/Modal";
import { FaCircleInfo } from "react-icons/fa6";
import type { Files } from "@/interfaces";

interface Props {
  fileToDelete: Files | null;
  setFileToDelete: (file: Files | null) => void;
  onConfirm: (name: string) => Promise<void>;
}

/**
 * Modal de confirmación de eliminación de archivo
 */
export const GalleryDeleteModal = ({
  fileToDelete,
  setFileToDelete,
  onConfirm,
}: Props) => {
  if (!fileToDelete) return null;

  const handleConfirm = async () => {
    await onConfirm(fileToDelete.nombre);
    setFileToDelete(null);
  };

  return (
    <Modal
      open={!!fileToDelete}
      onClose={() => setFileToDelete(null)}
      onConfirm={handleConfirm}
      icon={<FaCircleInfo />}
      title="Mensaje de confirmación."
    >
      {`¿Estás seguro de que deseas eliminar ${
        fileToDelete.type === "video" ? "el video creado" : "la imagen creada"
      } el ${
        fileToDelete.nombre_fact.split(" ")[0]
      }? Esta acción no se puede deshacer.`}
    </Modal>
  );
};
