// LIBRERIAS
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

export type ColorType = "amber" | "green" | "cyan" | "blue" | "red" | "yellow";

interface StatsCardProps {
  title: ReactNode;
  value: number;
  icon: IconType;
  color: ColorType;
}

// Mapeo de colores a clases de Tailwind CSS
const colorClasses: Record<ColorType, {
  text: string;
  textLarge: string;
  container: string;
}> = {
  amber: {
    text: "text-amber-500",
    textLarge: "text-amber-800/25",
    container: "to-amber-500/50",
  },
  green: {
    text: "text-green-500",
    textLarge: "text-green-800/25",
    container: "to-green-500/50",
  },
  cyan: {
    text: "text-cyan-500",
    textLarge: "text-cyan-800/25",
    container: "to-cyan-500/50",
  },
  blue: {
    text: "text-blue-500",
    textLarge: "text-blue-800/25",
    container: "to-blue-500/50",
  },
  red: {
    text: "text-red-500",
    textLarge: "text-red-800/25",
    container: "to-red-500/50",
  },
  yellow: {
    text: "text-yellow-500",
    textLarge: "text-yellow-800/25",
    container: "to-yellow-500/50",
  },
};


export const StatsCard = ({ title, value, icon: Icon, color }: StatsCardProps) => {
  // Obtiene las clases correspondientes al color
  const { text, textLarge, container } = colorClasses[color];

  // Clases para el contenedor
  const containerClasses = `
    border border-slate-600
    flex flex-col justify-between
    px-4 sm:px-6 py-2 sm:py-4
    from-black ${container} sm:to-slate-800
    bg-gradient-to-br rounded-md
    text-center sm:text-start relative
  `;

  // Clases para el título
  const titleClasses = `
    font-normal text-white/70
    text-sm sm:text-base
    flex items-center gap-2
  `;

  // Clases para el ícono pequeño
  const smallIconClasses = `
    hidden md:block
    text-[1.5rem]
    ${text}
  `;

  // Clases para el valor
  const valueClasses = `
    ${text}
    font-bold
    text-[2rem] sm:text-[2.5rem]
    text-start
  `;

  // Clases para el ícono grande
  const largeIconClasses = `
    sm:hidden
    absolute bottom-0 end-0
    text-[5rem]
    ${textLarge}
  `;

  return (
    <div className={containerClasses}>
      <div className={titleClasses}>
        <Icon className={smallIconClasses} />
        {title}
      </div>
      <h1 className={valueClasses}>{value}</h1>
      <Icon className={largeIconClasses} />
    </div>
  );
};