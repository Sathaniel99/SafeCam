// LIBRERIAS
import { ReactNode } from "react";

export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  return (
    <span className="relative group cursor-pointer">
      {children}
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-pre-line">
        {text}
      </span>
    </span>
  );
}