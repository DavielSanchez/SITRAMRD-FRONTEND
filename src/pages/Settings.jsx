import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Color from "../components/Settings/Color";
import CerrarSesion from "../components/Settings/CerrarSesion.jsx";
import EditarPerfil from "../components/Settings/EditarPerfil";
import Idioma from "../components/Settings/Idioma";
import PersonIcon from '@mui/icons-material/Person'; 
import LockIcon from '@mui/icons-material/Lock'; 
import LanguageIcon from '@mui/icons-material/Language'; 
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import PaletteIcon from '@mui/icons-material/Palette'; 
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'; 
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import { jwtDecode } from "jwt-decode";
import NavBar from "../components/NavBar.jsx";
import renderSection from "../components/Settings/RenderSection.jsx";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import TopBar from "../components/TopBar.jsx";

export default function Ajustes() {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const [userImage, setUserImage] = useState(decodedToken.userImage);
  const [username, setUsername] = useState(decodedToken.nombre);
  const usertheme = decodedToken.theme;
  const userId = decodedToken.id;

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

  const handleLogOut = async () => {
    MySwal.fire({
      icon: "warning",
      iconColor: theme === 'dark' ? '#ffff' : '#eeeee',
      title: "Ten cuidado",
      text: "¿Estás seguro de que quieres cerrar la sesión?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#ff5353",
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

  const onProfileUpdate = async (newImageUrl, newNombre) => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/auth/users/put/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre: newNombre,
            userImage: newImageUrl,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al actualizar el perfil");
      }
  
      const data = await response.json();
      setUserImage(newImageUrl);
      setUsername(newNombre);
  
      MySwal.fire({
        icon: "success",
        title: "Perfil actualizado",
        text: "Los cambios se han guardado con éxito.",
      });
  
    } catch (error) {
      console.error("Error en la actualización:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div
      className={`w-full min-h-screen mx-auto p-4 md:p-8 flex flex-col ${
        theme === "dark" ? "bg-[#000000] text-[var(--color-dark)]" : "bg-white text-black"
      }`}
    >
      <TopBar nombre='Mi Cuenta' ruta='/' theme={theme}/>

      <div className="flex flex-col items-center mt-6">
      <div className="flex justify-center mb-4 relative">
      <img
              src={userImage || 'https://res.cloudinary.com/dv4wfetu1/image/upload/v1740610245/avatar_qspfc1.svg'}
              alt="Perfil"
              className="rounded-full object-cover"
              style={{ width: "120px", height: "120px" }}
              // sx={{ fontSize: 200 }}
            />
      </div>
        <h2 className="mt-4 text-5xl font-normal font-['Roboto'] text-center w-full">
          {username}
        </h2>
    </div>

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
          onProfileUpdate={onProfileUpdate}
        />
      )}
      {showIdiomaModal && <Idioma onClose={() => setShowIdiomaModal(false)} theme={theme} />}
    </div>
  );
}