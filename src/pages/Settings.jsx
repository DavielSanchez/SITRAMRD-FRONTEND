import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Color from "../components/Settings/Color";
import CerrarSesion from "../components/Settings/CerrarSesion.jsx";
import EditarPerfil from "../components/Settings/EditarPerfil";
import Idioma from "../components/Settings/Idioma";
import LensIcon from '@mui/icons-material/Lens'; 
import PersonIcon from '@mui/icons-material/Person'; 
import LockIcon from '@mui/icons-material/Lock'; 
import LanguageIcon from '@mui/icons-material/Language'; 
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import PaletteIcon from '@mui/icons-material/Palette'; 
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'; 
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; 
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; 
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import { Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import NavBar from "../components/NavBar.jsx";
import renderSection from "../components/Settings/RenderSection.jsx";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

export default function Ajustes() {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const username = decodedToken.nombre;
  const usertheme = decodedToken.theme;

  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();

  const [showColorModal, setShowColorModal] = useState(false);
  const [showCerrarSesion, setShowCerrarSesion] = useState(false);
  const [showEditarPerfil, setShowEditarPerfil] = useState(false);
  const [showIdiomaModal, setShowIdiomaModal] = useState(false);

  const [theme, setTheme] = useState(usertheme);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-[#000000]" : "bg-white";
  }, [theme]);

  const handleColorSelect = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  function getIconColor(variant, theme) {
    if (theme === "dark") {
      if (variant === "chevronRight") return "white";
      return "#ff5353";
    } else {
      if (variant === "chevron") return "black";
      if (variant === "chevronRight") return "black";
      if (variant === "gray") return "gray";
      return "#6a62dc";
    }
  }

  const handleLogOut = async () => {
    MySwal.fire({
      icon: "warning",
      iconColor: theme === 'dark' ? '#ffff' : '#eeeee',
      title: "Ten cuidado",
      text: "¿Estás seguro de que quieres cerrar la sesión?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      showConfirmButton: true,
      confirmButtonText: "Confirmar",
      customClass: {
        popup: theme === "dark" ? "swal-dark" : "swal-light",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  };

  return (
    <div
      className={`w-full min-h-screen mx-auto p-4 md:p-8 flex flex-col ${
        theme === "dark" ? "bg-[#000000] text-[#E0E0E0]" : "bg-white text-black"
      }`}
    >
      {/* Barra superior */}
      <div
        className={`w-full md:max-w-full h-[45px] shadow-md flex justify-center items-center relative border-b ${
          theme === "dark" ? "bg-[#000000] border-[#333]" : "bg-white border-gray-300"
        }`}
      >
      <div
          className="absolute left-[10px] cursor-pointer hover:opacity-75 active:opacity-50"
          onClick={() => navigate("/")}
        >
          <ChevronLeftIcon sx={{ color: getIconColor("chevron", theme), fontSize: 32 }} />
        </div>
        <h1
          className={`text-xl font-normal font-['Roboto'] ${
            theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"
          }`}
        >
          Mi Cuenta
        </h1>
      </div>

      <div className="flex flex-col items-center mt-6">
      <Box sx={{ position: "relative", display: "inline-block" }}>
  {/* Icono de fondo (grande) */}
  <LensIcon sx={{ color: getIconColor("gray", theme), fontSize: 200 }} />
  <CreateIcon
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 80, // Tamaño del icono central
    color: "white", // Color del icono central
    cursor: "pointer", // Hace que el icono sea clickeable
  }}
  onClick={() => alert("Hello")}
/>
</Box>
        <h2 className="mt-4 text-5xl font-normal font-['Roboto'] text-center w-full">
          {username}
        </h2>
    </div>

      {/* Secciones */}
      <div className="flex-grow overflow-auto mb-[80px]">
        {renderSection(
          "Cuenta",
          [
            {
              icon: PersonIcon,
              label: "Editar Perfil",
              onClick: () => setShowEditarPerfil(true),
            },
            {
              icon: LockIcon,
              label: "Cambiar Contraseña",
              onClick: () => navigate("/forgot"),
            },
            {
              icon: LogoutIcon,
              label: "Cerrar sesion",
              onClick: () => handleLogOut(),
            },
          ],
          theme,
        )}
        {renderSection(
          "Preferencias",
          [
            {
              icon: LanguageIcon,
              label: "Idioma",
              onClick: () => setShowIdiomaModal(true),
            },
            {
              icon: NotificationsIcon,
              label: "Notificaciones",
              isSwitch: true,
              switchState: notificationsEnabled,
              onClick: () => setNotificationsEnabled(!notificationsEnabled),
            },
            {
              icon: PaletteIcon,
              label: "Color",
              onClick: () => setShowColorModal(true),
            },
          ],
          theme,
        )}
        {renderSection(
          "Seguridad y Soporte",
          [
            { icon: QuestionMarkIcon, label: "Preguntas Frecuentes" },
            { icon: SupportAgentIcon, label: "Soporte" },
          ],
          theme,
        )}
      </div>

      <NavBar theme={theme}/>
      

      {showColorModal && (
        <Color
          onClose={() => setShowColorModal(false)}
          onColorSelect={handleColorSelect}
          theme={theme}
        />
      )}
      {showCerrarSesion && (
        <CerrarSesion theme={theme} onClose={() => setShowCerrarSesion(false)} />
      )}
      {showEditarPerfil && (
        <EditarPerfil
          onClose={() => setShowEditarPerfil(false)}
          theme={theme}
        />
      )}
      {showIdiomaModal && <Idioma onClose={() => setShowIdiomaModal(false)} theme={theme} />}
    </div>
  );
}