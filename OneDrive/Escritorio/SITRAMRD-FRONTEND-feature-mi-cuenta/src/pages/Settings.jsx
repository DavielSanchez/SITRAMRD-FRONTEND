import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Color from "../components/Settings/Color";
import CerrarSesion from "../components/Settings/CerrarSesion";
import EditarPerfil from "../components/Settings/EditarPerfil";
import Ellipse19 from "../assets/Settings/Ellipse 19.svg";
import Perfil from "../assets/Settings/Perfil.svg";
import CambiarPassword from "../assets/Settings/CambiarPassword.svg";
import LogOut from "../assets/Settings/LogOut.svg";
import RightArrow from "../assets/Settings/right-arrow.png";
import Idiomas from "../assets/Settings/Idiomas.svg";
import Notificaciones from "../assets/Settings/Notificaciones.svg";
import Pregunta from "../assets/Settings/Pregunta.svg";
import Soporte from "../assets/Settings/Soporte.svg";
import LeftArrow from "../assets/Settings/left-arrow.png";
import Inicio from "../assets/Settings/Inicio.svg";
import Billetera from "../assets/Settings/Billetera.svg";
import Actividad from "../assets/Settings/Actividad.svg";
import MiCuenta from "../assets/Settings/MiCuenta.svg";
import Paint from "../assets/Settings/paint.png";
import Switch from "../assets/Settings/switch.svg";

export default function Ajustes() {
  const navigate = useNavigate();
  const [showColorModal, setShowColorModal] = useState(false);
  const [showCerrarSesion, setShowCerrarSesion] = useState(false);
  const [showEditarPerfil, setShowEditarPerfil] = useState(false); 
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-[#000000]" : "bg-white";
  }, [theme]);

  const handleColorSelect = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const redFilter =
    "invert(35%) sepia(100%) saturate(4896%) hue-rotate(340deg) brightness(95%) contrast(105%)";
  const ellipseDarkerRedFilter =
    "invert(35%) sepia(100%) saturate(4896%) hue-rotate(340deg) brightness(85%) contrast(105%)";
  const purpleFilter =
    "invert(36%) sepia(63%) saturate(1874%) hue-rotate(245deg) brightness(97%) contrast(90%)";

  return (
    <div
      className={`w-full min-h-screen mx-auto p-4 md:p-8 flex flex-col ${
        theme === "dark" ? "bg-[#000000] text-[#E0E0E0]" : "bg-white text-black"
      }`}
    >
      {/* Barra superior */}
      <div
        className={`w-full max-w-[428px] md:max-w-full h-[45px] shadow-md flex justify-center items-center relative border-b ${
          theme === "dark" ? "bg-[#000000] border-[#333]" : "bg-white border-gray-300"
        }`}
      >
        <img
          className="w-[29px] h-[29px] absolute left-[10px] cursor-pointer hover:opacity-75 active:opacity-50"
          src={LeftArrow}
          alt="Back"
          onClick={() => navigate("/home")}  
          style={{
            filter: theme === "dark" ? redFilter : "",
          }}
        />
        <h1
          className={`text-xl font-normal font-['Roboto'] ${
            theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"
          }`}
        >
          Mi Cuenta
        </h1>
      </div>

      {/* Imagen de perfil */}
      <div className="flex flex-col items-center mt-6">
        <img
          className="w-[100px] h-[100px] rounded-full"
          src={Ellipse19}
          alt="Perfil"
          style={{
            filter: theme === "dark" ? ellipseDarkerRedFilter : "",
          }}
        />
        <h2 className="mt-4 text-4xl font-normal font-['Roboto']">
          Nombre de usuario
        </h2>
      </div>

      {/* Secciones */}
      <div className="flex-grow overflow-auto mb-[80px]">
        {renderSection(
          "Cuenta",
          [
            {
              icon: Perfil,
              label: "Editar Perfil",
              onClick: () => setShowEditarPerfil(true), // Abre el modal de Editar Perfil
            },
            {
              icon: CambiarPassword,
              label: "Cambiar Contraseña",
              onClick: () => navigate("/forgot-password"),
            },
            {
              icon: LogOut,
              label: "Cerrar Sesión",
              onClick: () => setShowCerrarSesion(true),
            },
          ],
          theme,
          redFilter,
          purpleFilter
        )}
        {renderSection(
          "Preferencias",
          [
            { icon: Idiomas, label: "Idioma" },
            { icon: Notificaciones, label: "Notificaciones" },
            {
              icon: Paint,
              label: "Color",
              onClick: () => setShowColorModal(true),
            },
          ],
          theme,
          redFilter,
          purpleFilter
        )}
        {renderSection(
          "Seguridad y Soporte",
          [
            { icon: Pregunta, label: "Preguntas Frecuentes" },
            { icon: Soporte, label: "Soporte" },
          ],
          theme,
          redFilter,
          purpleFilter
        )}
      </div>

      {/* Barra de navegación inferior */}
      <div
        className={`w-full max-w-[428px] md:max-w-full h-[77px] shadow-md flex justify-around items-center border-t fixed bottom-0 left-0 ${
          theme === "dark" ? "bg-[#000000] border-[#ff5353]" : "bg-white border-[#6a62dc]"
        }`}
      >
        {renderNavItem(Inicio, "Inicio", false, theme, redFilter, purpleFilter)}
        {renderNavItem(Billetera, "Billetera", false, theme, redFilter, purpleFilter)}
        {renderNavItem(Actividad, "Actividad", false, theme, redFilter, purpleFilter)}
        {renderNavItem(MiCuenta, "Mi cuenta", true, theme, redFilter, purpleFilter)}
      </div>

      {/* Modales */}
      {showColorModal && (
        <Color
          onClose={() => setShowColorModal(false)}
          onColorSelect={handleColorSelect}
        />
      )}
      {showCerrarSesion && (
        <CerrarSesion onClose={() => setShowCerrarSesion(false)} />
      )}
      {showEditarPerfil && (
        <EditarPerfil onClose={() => setShowEditarPerfil(false)} />
      )}
    </div>
  );
}

function renderSection(title, items, theme, redFilter, purpleFilter) {
  return (
    <div className="mt-6">
      <h2 className={`ml-4 text-2xl font-normal ${theme === "dark" ? "text-white" : "text-black"}`}>
        {title}
      </h2>
      <div
        className={`w-full max-w-[352px] md:max-w-full mx-auto mt-3 rounded-xl p-4 flex flex-col gap-4 ${
          theme === "dark" ? "bg-[#1E1E1E] text-[#E0E0E0]" : "bg-gray-100 text-black"
        }`}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:shadow-md"
            onClick={item.onClick}
          >
            <div className="flex items-center gap-3">
              <img className="w-6 h-6" src={item.icon} alt={item.label} style={{ filter: theme === "dark" ? redFilter : "" }} />
              <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>{item.label}</span>
            </div>
            <img className="w-5 h-5" src={RightArrow} alt="arrow" style={{ filter: theme === "dark" ? "invert(100%)" : "" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function renderNavItem(icon, label, isActive, theme, redFilter, purpleFilter) {
  return (
    <div className="flex flex-col items-center cursor-pointer hover:text-[#6a62dc]">
      <img className="w-6 h-6" src={icon} alt={label} style={{ filter: theme === "dark" ? redFilter : "" }} />
      <span className={`${theme === "dark" ? "text-[#E0E0E0]" : "text-black"}`}>{label}</span>
    </div>
  );
}
