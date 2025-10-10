// LIBRERIAS
import { Link, useLocation } from "react-router-dom";
// ICONOS
import { GoDeviceCameraVideo } from "react-icons/go";
import { GrGallery } from "react-icons/gr";

export function Navbar() {
    const location = useLocation();

    const isMonitorActive = location.pathname === "/monitor" || location.pathname === "/";
    const isGalleryActive = location.pathname === "/gallery";

    return (
        <>
            <header className="border-b-1 border-slate-600 bg-slate-900">
                <nav className="grid grid-cols-2 px-3 sm:px-10 py-3 max-w-[80rem] m-auto">
                    <div className="flex flex-row items-center gap-2">
                        <div className="flex justify-center items-center p-2 border border-sky-500 bg-sky-700/15 rounded-md">
                            <GoDeviceCameraVideo size={30} className="text-sky-400" />
                        </div>
                        <div className="hidden sm:flex flex-col h-[100%] justify-center text-white">
                            <div className="bold text-[1.5rem] font-medium" style={{ lineHeight: 1 }}>SafeCam</div>
                            <div className="italic text-sm text-white/70">Monitoreo seguro de Cámaras</div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-1 items-center">
                        <Link to="/monitor" className={`flex items-center gap-2 text-white px-4 py-2 rounded-md transition-all ${isMonitorActive ? "bg-sky-700 hover:bg-sky-700/90 active:bg-sky-800" : "bg-gray-700 hover:bg-gray-700/90 active:bg-gray-800" }`} >
                            <GoDeviceCameraVideo size={20} /> Monitor
                        </Link>
                        <Link to="/gallery" className={`flex items-center gap-2 text-white px-4 py-2 rounded-md transition-all ${isGalleryActive ? "bg-sky-700 hover:bg-sky-700/90 active:bg-sky-800" : "bg-gray-700 hover:bg-gray-700/80 active:bg-gray-800"}`}>
                            <GrGallery size={18} /> Gallery
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    );
}
