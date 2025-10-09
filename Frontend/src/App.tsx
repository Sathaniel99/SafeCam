// LIBRERIAS
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// PAGES
import { Monitor } from "./pages/Monitor";
import { Gallery } from "./pages/Gallery";
import NotFound from "./components/UI/404";
// COMPONENTES
import { Navbar } from "./components/UI/Navbar";
import { ToastProvider } from "./components/UI/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Navbar />
        <main className="bg-gray-950">
          <Routes>
            <Route path="/" element={<Monitor />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} /> {/* Ruta 404 */}
          </Routes>
        </main>
      </Router>

    </ToastProvider>
  );
}

export default App;
