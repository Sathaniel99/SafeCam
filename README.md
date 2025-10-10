# SafeCam

SafeCam es una solución integral para la visualización, grabación y gestión de cámaras web y archivos multimedia, pensada para ser fácil de usar y adaptable a distintos entornos. Incluye un backend robusto en FastAPI y un frontend moderno en React, permitiendo monitorear cámaras, tomar capturas, grabar videos y gestionar todos los archivos desde una interfaz web amigable.

---

## ¿Qué puedes hacer con SafeCam?

- **Ver cámaras en tiempo real:** Selecciona la cámara que quieras y observa su transmisión en vivo desde cualquier dispositivo.
- **Capturar imágenes y grabar videos:** Guarda imágenes o inicia grabaciones con un solo clic.
- **Explorar y gestionar tu galería:** Visualiza, descarga o elimina fácilmente tus fotos y videos guardados.
- **Recibe notificaciones y confirmaciones:** Cada acción importante te muestra un aviso claro y, si es necesario, una confirmación antes de borrar archivos.
- **Interfaz moderna y accesible:** Todo está pensado para que lo encuentres rápido y funcione bien en cualquier dispositivo, con soporte para lectores de pantalla y navegación por teclado.

---

## Estructura del Proyecto

```
SafeCam/
│
├── api/         # Backend (FastAPI, OpenCV, FFmpeg)
├── Frontend/    # Frontend (React, Vite, TypeScript)
├── documentation.md / .html
├── README.md    # Este archivo
└── ...
```

---

## Instalación y uso rápido

### 1. Backend (api/)

- **Requisitos:** Python 3.8+, FastAPI, Uvicorn, OpenCV, numpy, (opcional: FFmpeg)
- **Instalación:**
  ```bash
  cd api
  pip install -r requirements.txt
  ```
- **Ejecuta el servidor:**
  ```bash
  uvicorn main:app --reload
  ```
- **Accede a la API y documentación:**
  - [http://localhost:5000/docs](http://localhost:5000/docs)

### 2. Frontend (Frontend/)

- **Requisitos:** Node.js 18+, npm
- **Instalación:**
  ```bash
  cd Frontend
  npm install
  ```
- **Ejecuta la aplicación web:**
  ```bash
  npm run dev
  ```
- **Abre en tu navegador:**  
  [http://localhost:5173](http://localhost:5173)

> **Nota:** Asegúrate de que el backend esté corriendo antes de usar el frontend. Puedes cambiar la URL del backend en `Frontend/src/utils.ts` si es necesario.

---

## Principales funcionalidades

- **Monitor:**  
  Visualiza la transmisión en vivo de tus cámaras, toma capturas y graba videos.

- **Galería:**  
  Encuentra todas tus imágenes y videos guardados, descárgalos o elimínalos fácilmente.

- **Notificaciones y modales:**  
  Recibe avisos claros y confirmaciones antes de acciones importantes.

- **Accesibilidad:**  
  Botones y acciones con descripciones para lectores de pantalla, imágenes con texto alternativo, navegación por teclado.

---

## Personalización y desarrollo

- **Cambia iconos y estilos:**  
  Los recursos están en `Frontend/public/` y los estilos en `src/index.css`.
- **Agrega nuevas cámaras o endpoints:**  
  Modifica los archivos en `api/routers/` y `api/services/`.
- **Internacionalización:**  
  Centraliza los textos si quieres traducir la app.
- **Licencia:**  
  Este proyecto es de código abierto. Puedes usarlo, modificarlo y compartirlo.

---

## Créditos

Hecho con cariño por Sathaniel.  
Para dudas, sugerencias o mejoras, revisa la documentación incluida o abre un issue.

---

¡Espero que SafeCam te ayude a mantener tus cámaras y archivos siempre bajo control!
