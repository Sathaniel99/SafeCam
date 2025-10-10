//IP local o del servidor backend
const URL_main = "http://10.90.62.247"
//Puerto donde se ejecuta el servidor backend
const PORT_main = "5000"

export const URL = `${URL_main}:${PORT_main}`;
export const CAMERA_API = `${URL}/camaras/video_feed/`;

//Calcula el tiempo estimado de lectura de un texto en milisegundos.
//@param text -> El texto a leer.
//@param palabras_por_minuto -> Palabras por minuto (default: 200).
//@returns Tiempo estimado en milisegundos.
export function estimateReadingTimeMs(text: string, palabras_por_minuto: number = 100): number {
  const palabras = text.trim().split(/\s+/).length;
  const minutos = palabras / palabras_por_minuto;
  return Math.ceil(minutos * 60 * 1000);
}