import { ReactNode, useEffect, useState } from "react";

export function Modal({
  open,
  title,
  icon,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: {
  open: boolean;
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    if (open) setShow(true);
    else {
      // Espera la animación antes de desmontar
      const timeout = setTimeout(() => setShow(false), 350);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-colors">
      <div
        className={`
          bg-gray-950 rounded-lg shadow-2xl p-10 min-w-[300px] max-w-[90vw]
          transition-all duration-300
          ${open
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-32 opacity-0 blur-sm pointer-events-none"
          }
        `}
        style={{ willChange: "transform, opacity, filter" }}
      >
        {icon && <div className="flex justify-center mb-2 text-[4rem]">{icon}</div>}
        {title && <h2 className="text-lg font-bold mb-2 text-center text-[1.5rem]">{title}</h2>}
        <div className="mb-4">{children}</div>
        <div className="flex justify-center gap-2">
          <button
            className="px-4 py-2 rounded text-white bg-black hover:bg-neutral-950 active:bg-black/50 transition-all"
            onClick={onClose}
            aria-label="Cancelar"
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded text-white bg-red-700 hover:bg-red-600 active:bg-red-800 transition-all"
            onClick={onConfirm}
            aria-label="Confirmar eliminación"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}