# SafeCam Frontend

Bienvenido al Frontend de **SafeCam**. Esta es la aplicación web que te permite ver en tiempo real tus cámaras, tomar capturas, grabar videos y gestionar todos tus archivos multimedia de forma sencilla y rápida.

---

## ¿Qué puedes hacer con SafeCam?

- **Ver tus cámaras en vivo:** Elige la cámara que quieras y observa su transmisión en tiempo real.
- **Capturar imágenes y grabar videos:** Haz clic en un botón para guardar una imagen o empezar a grabar un video.
- **Explorar tu galería:** Encuentra todas tus fotos y videos guardados, descárgalos o elimínalos si ya no los necesitas.
- **Recibe notificaciones:** Cada acción importante te muestra un aviso para que siempre sepas qué está pasando.
- **Interfaz moderna y fácil de usar:** Todo está pensado para que lo encuentres rápido y funcione bien en cualquier dispositivo.

---

## ¿Cómo lo instalo?

1. **Abre una terminal y entra a la carpeta del frontend:**
   ```bash
   cd Frontend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

---

## ¿Cómo lo uso?

1. **Asegúrate de que el backend esté funcionando**  
   (Por defecto, busca el backend en `http://127.0.0.1:5000`, pero puedes cambiarlo en `src/utils.ts`).

2. **Arranca la aplicación web:**
   ```bash
   npm run dev
   ```
   Ahora puedes abrir [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## ¿Qué hay dentro de este proyecto?

- **Monitor:**  
  Aquí puedes ver la transmisión en vivo de tus cámaras, tomar capturas y grabar videos.

- **Galería:**  
  Todas tus imágenes y videos guardados aparecen aquí. Puedes verlos, descargarlos o eliminarlos.

- **Componentes reutilizables:**  
  Hay notificaciones (toast), tooltips y modales para confirmaciones, todo pensado para que la experiencia sea clara y agradable.

---

## Accesibilidad y detalles técnicos

- Todos los botones tienen descripciones para lectores de pantalla.
- Las imágenes tienen textos alternativos.
- Puedes navegar con el teclado por tooltips y modales.
- El diseño es responsivo, así que funciona bien en móvil y escritorio.

---

## Personalización

- Si quieres cambiar los iconos, están en la carpeta `public/`.
- Puedes modificar colores y estilos en `src/index.css`.
- Si prefieres otra fuente, puedes instalarla fácilmente y usarla en el proyecto.

---

## ¿Con qué tecnologías está hecho?

- **React** y **Vite** para la interfaz.
- **TypeScript** para mayor seguridad y autocompletado.
- **Axios** para las peticiones al backend.
- **React Icons** para los iconos.
- **yet-another-react-lightbox** para la galería de imágenes y videos.

---

## Licencia

Este proyecto es de código abierto. Puedes usarlo, modificarlo y compartirlo.

---

**Hecho con cariño por Sathaniel. ¡Esperamos que te sea útil!**
