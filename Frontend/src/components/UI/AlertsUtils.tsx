// ICONOS
import { FaCircleInfo } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineWarning, MdCancel } from "react-icons/md";

export function getColor(type: string = "info") {
    switch (type) {
        case "success":
            return "green";
        case "error":
            return "red";
        case "warning":
            return "yellow";
        case "info":
        default:
            return "blue";
    }
}

export function getIcon(type: string = "info") {
    switch (type) {
        case "success":
            return <FaCheckCircle className={`text-${getColor(type)}-500`} />;
        case "error":
            return <MdCancel className={`text-${getColor(type)}-500`} />;
        case "warning":
            return <MdOutlineWarning className={`text-${getColor(type)}-300 fw-bold`} />;
        case "info":
        default:
            return <FaCircleInfo className={`text-${getColor(type)}-500`} />;
    }
}

export function getProgressColor(type: string = "info") {
    switch (type) {
        case "success":
            return `bg-green-500`;
        case "error":
            return `bg-red-600`;
        case "warning":
            return `bg-amber-400`;
        case "info":
        default:
            return `bg-blue-400`;
    }
}