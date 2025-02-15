import { useNavigate } from 'react-router-dom';
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

export default function Ajustes() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/auth');
  };

  return (
    <div className="w-full max-w-[428px] h-full max-h-[905px] bg-white mx-auto p-4 md:p-8 flex flex-col">
      {/* Barra superior */}
      <div className="w-full h-[50px] bg-white shadow-md flex justify-center items-center relative border-b">
        <img
          className="w-[29px] h-[29px] absolute left-[10px] cursor-pointer hover:opacity-75 active:opacity-50"
          src={LeftArrow}
          alt="Back"
        />
        <h1 className="text-[#6a62dc] text-xl font-normal font-['Roboto']">Mi Cuenta</h1>
      </div>

      {/* Imagen de perfil */}
      <div className="flex flex-col items-center mt-6">
        <img className="w-[100px] h-[100px] rounded-full" src={Ellipse19} alt="Perfil" />
        <h2 className="mt-4 text-black text-4xl font-normal font-['Roboto']">Nombre de usuario</h2>
      </div>

      {/* Secciones */}
      <div className="flex-grow overflow-auto mb-[80px]">
        {renderSection("Cuenta", [
          { icon: Perfil, label: "Editar Perfil" },
          { icon: CambiarPassword, label: "Cambiar Contraseña" },
          { icon: LogOut, label: "Cerrar Sesión", onClick: handleLogout },
        ])}
        {renderSection("Preferencias", [
          { icon: Idiomas, label: "Idioma" },
          { icon: Notificaciones, label: "Notificaciones" },
          { icon: "https://placehold.co/20x20", label: "Color" },
        ])}
        {renderSection("Seguridad y Soporte", [
          { icon: Pregunta, label: "Preguntas Frecuentes" },
          { icon: Soporte, label: "Soporte" },
        ])}
      </div>

      {/* Barra de navegación inferior */}
      <div className="w-full h-[70px] bg-white shadow-md flex justify-around items-center border-t fixed bottom-0 left-0 max-w-[428px]">
        {renderNavItem(Inicio, "Inicio")}
        {renderNavItem(Billetera, "Billetera")}
        {renderNavItem(Actividad, "Actividad")}
        {renderNavItem(MiCuenta, "Mi cuenta")}
      </div>
    </div>
  );
}

function renderSection(title, items) {
  return (
    <div className="mt-6">
      <h2 className="ml-4 text-black text-2xl font-normal font-['Roboto']">{title}</h2>
      <div className="w-full max-w-[352px] mx-auto mt-3 bg-gray-100 rounded-xl p-4 flex flex-col gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center hover:bg-gray-200 active:bg-gray-300 p-3 rounded-lg cursor-pointer hover:shadow-md"
            onClick={item.onClick}
          >
            <div className="flex items-center gap-3">
              <img className="w-6 h-6" src={item.icon} alt={item.label} />
              <span className="text-black text-base font-normal font-['Roboto']">{item.label}</span>
            </div>
            <img className="w-5 h-5" src={RightArrow} alt="arrow" />
          </div>
        ))}
      </div>
    </div>
  );
}

function renderNavItem(icon, label, isActive = false) {
  return (
    <div className={`flex flex-col items-center cursor-pointer ${isActive ? "text-[#6a62dc]" : "text-gray-600"} hover:text-[#6a62dc]`}>
      <img className="w-6 h-6" src={icon} alt={label} />
      <span className={`text-black text-sm font-normal font-['Inter'] mt-1 ${isActive ? "text-[#6a62dc]" : "text-gray-600"}`}>{label}</span>
    </div>
  );
}
