// LIBRERIAS
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// ICONOS
import { FaCircleInfo } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineWarning, MdCancel } from "react-icons/md";
// COMPONENTES
import { estimateReadingTimeMs } from "@/utils";

type Toast = { id: number; message: string; type?: "success" | "error" | "warning" | "info"; createdAt: number };
type ToastContextType = {
  showToast: (message: string, type?: "success" | "error" | "warning" | "info") => void;
};

const TOAST_DURATION = 3000; // ms

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("'useToast' debe ser usado dentro de ToastProvider");
  return ctx;
}

function getIcon(type: string = "info") {
  switch (type) {
    case "success":
      return <FaCheckCircle className="text-green-500" />;
    case "error":
      return <MdCancel className="text-red-500" />;
    case "warning":
      return <MdOutlineWarning className="text-yellow-300 fw-bold" />;
    case "info":
    default:
      return <FaCircleInfo className="text-cyan-500" />;
  }
}

function getProgressColor(type: string = "info") {
  switch (type) {
    case "success":
      return "bg-green-500";
    case "error":
      return "bg-red-700";
    case "warning":
      return "bg-yellow-400";
    case "info":
    default:
      return "bg-cyan-500";
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, createdAt: Date.now() }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), estimateReadingTimeMs(message));
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDone={() => removeToast(toast.id)}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s;}
      `}</style>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onDone,
  onClose,
}: {
  toast: Toast;
  onDone: () => void;
  onClose: () => void;
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = toast.createdAt;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(0, 100 - (elapsed / estimateReadingTimeMs(toast.message)) * 100);
      setProgress(percent);
      if (percent <= 0) {
        clearInterval(interval);
        onDone();
      }
    }, 30);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`
        p-4 pt-5 rounded-lg shadow-2xl flex items-center gap-2 animate-fade-in-up min-w-[220px] relative
        ${toast.type === "success"
          ? "from-black to-green-500 bg-gradient-to-r text-white"
          : toast.type === "error"
          ? "from-black to-red-700 bg-gradient-to-r text-white"
          : toast.type === "warning"
          ? "from-black to-yellow-600 bg-gradient-to-r text-white"
          : "from-black to-cyan-500 bg-gradient-to-r text-white"}
      `}
    >
      <button
        className="absolute top-1 right-1 text-lg rounded-2xl border border-white bg-red-400 hover:bg-white hover:text-red-400 transition-colors"
        onClick={onClose}
        aria-label="Cerrar notificación"
        tabIndex={0}
        style={{ lineHeight: 1 }}
      >
        <MdCancel/>
      </button>
      <span className="text-xl">{getIcon(toast.type)}</span>
      <span className="flex-1">
        {toast.message.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i < toast.message.split("\n").length - 1 && <br />}
          </span>
        ))}
      </span>
      {/* Progress bar */}
      <div className="absolute left-0 bottom-0 w-full h-1 bg-black/20 rounded-b-lg overflow-hidden">
        <div
          className={`${getProgressColor(toast.type)} h-full transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}