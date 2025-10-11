// LIBRERIAS
import React from "react";
// COMPONENTES
import { Tooltip } from "@/components/UI/Tooltip";

interface FilterButtonProps {
    text: string;
    tooltipText: string;
    filterValue: string;
    activeFilter: string;
    onClick: (value: string) => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
    text,
    tooltipText,
    filterValue,
    activeFilter,
    onClick,
}) => {
    const baseClasses = "border flex items-center gap-2 p-2 rounded-md transition-all hover:text-white";
    const activeClasses = "bg-slate-950 border-slate-600 text-white";
    const inactiveClasses = "bg-transparent border-transparent text-slate-400 hover:bg-slate-950 hover:border-slate-600 active:bg-slate-800 active:border-slate-700";

    // Determina si el botón está activo
    const isActive = activeFilter === filterValue;

    return (
        <Tooltip text={tooltipText}>
            <button
                type="button"
                onClick={() => onClick(filterValue)}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            >
                {text}
            </button>
        </Tooltip>
    );
};
