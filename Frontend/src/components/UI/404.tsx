// ICONOS
import { VscRobot } from "react-icons/vsc";
import { GoDeviceCameraVideo } from "react-icons/go";
import { HiOutlineX } from "react-icons/hi";

export default function NotFound() {
    return (
        <div className="h-[80vh] flex">
            <div className="flex flex-col items-center justify-center text-white border border-slate-600 rounded-md max-w-[50rem] m-auto max-h-[30rem] bg-slate-950 hover:bg-slate-900 transition-all p-50">
                <div className="relative">
                    <VscRobot className="text-[10rem]"/>
                    <HiOutlineX className="absolute top-0 end-0 text-[6rem] text-red-700"/>
                    <GoDeviceCameraVideo className="absolute top-0 start-0 text-[2rem] ms-2 transform -rotate-z-45"/>
                </div>
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-lg">Página no encontrada</p>
            </div>
        </div>
    );
}