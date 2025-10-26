# SafeCam - Documentación

## Descripción General

SafeCam es una aplicación web para visualizar, grabar y gestionar cámaras conectadas al sistema, así como administrar capturas y grabaciones. El backend está construido con FastAPI y el frontend con Vite + React.

---

## Instalación y Ejecución

### Requisitos

- Python 3.10+
- pip
- (Opcional) Entorno virtual

### Instalación

```bash
cd SafeCam/api
python -m venv .env
.env\Scripts\activate  # En Windows
pip install -r requirements.txt
```

### Ejecución del backend

Desde la raíz del proyecto:

```bash
uvicorn api.main:app --reload
```

El backend estará disponible en:  
`http://127.0.0.1:8000/`

### Ejecución del frontend

```bash
cd Frontend
npm install
npm run dev
```

El frontend estará disponible en:  
`http://localhost:5173/`

---

## Endpoints

### Rutas de cámaras

- **Listar cámaras**
  ```
  GET /camaras/
  ```
  Devuelve la lista de cámaras detectadas.

- **Iniciar grabación**
  ```
  POST /camaras/iniciar_grabacion/{cam_id}
  ```
  Inicia la grabación de la cámara seleccionada.

- **Detener grabación**
  ```
  POST /camaras/detener_grabacion/{cam_id}
  ```
  Detiene la grabación de la cámara seleccionada.

- **Video feed**
  ```
  GET /camaras/video_feed/{cam_id}
  ```
  Devuelve el stream de video en tiempo real.

- **Captura de imagen**
  ```
  POST /camaras/screenshot/{cam_id}
  ```
  Realiza una captura de la cámara seleccionada.

---

### Rutas de archivos multimedia

- **Listar archivos**
  ```
  GET /files/
  ```
  Devuelve la lista de capturas y grabaciones.

- **Obtener archivo**
  ```
  GET /files/{filename}
  ```
  Descarga o visualiza el archivo seleccionado.

---

### Rutas de archivos multimedia (alternativo)

- **Listar medias**
  ```
  GET /medias/
  ```
  Devuelve la lista de archivos multimedia.

- **Obtener media**
  ```
  GET /medias/{filename}
  ```
  Descarga o visualiza el archivo multimedia.

---

## Estructura de Carpetas

```
SafeCam/
│
├── api/
│   ├── main.py
│   ├── config.py
│   ├── routers/
│   ├── services/
│   ├── utils/
│   ├── static/
│   ├── screenshots/
│   ├── templates/
│   └── documentation.md
├── Frontend/
│   └── ...
└── Diseño/
```

---

## Notas para Programadores

- **Configuración:**  
  Modifica `api/config.py` para cambiar rutas, CORS, puertos, etc.
- **Agregar nuevas cámaras:**  
  Edita `utils/helpers.py` para registrar nuevas cámaras o ubicaciones.
- **Agregar endpoints:**  
  Crea nuevos routers en `api/routers/` y servicios en `api/services/`.
- **Archivos multimedia:**  
  Se almacenan en `api/screenshots/`.

---

## Notas para Clientes

- Accede a la interfaz web en `http://localhost:5173/`.
- Puedes ver el video en tiempo real, tomar capturas y descargar grabaciones.
- Los archivos multimedia están disponibles en la sección de archivos.

---

## Créditos

Desarrollado por adanlqe@gmail.com.

---
