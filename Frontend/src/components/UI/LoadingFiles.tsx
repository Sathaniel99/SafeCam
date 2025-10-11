// ICONOS
import { CgSpinnerAlt } from "react-icons/cg"

interface LoadingFilesProps {
    type: string
}

export function LoadingFiles({ type }: LoadingFilesProps) {
    const divClass = type === 'camaras' ? 'text-[2vh] h-full w-full' : 'text-[3vh] h-40'
    const text = `Cargando ${ type === 'camaras' ? 'cámaras' : 'archivos'}...`;
    const spanClass = `${ type === 'camaras' ? '' : 'mt-2'}`;

    return <>
        <div className={`flex flex-row items-center justify-center gap-2 text-slate-400 ${divClass}`} >
            <span className={spanClass}>{text}</span>
            <CgSpinnerAlt className="animate-spin text-cyan-500" />
        </div>
    </>
}