import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, updateUserProfile } from "../utils/UserUtils.js";
import { useModalState } from "../utils/modals.js";
import { useBGForButtons } from "../utils/ColorClass.js";
import NavBar from "../components/NavBar.jsx";
import renderSection from "../components/Settings/RenderSection.jsx";
import Color from "../components/Settings/Color";
import CerrarSesion from "../components/Settings/CerrarSesion.jsx";
import EditarPerfil from "../components/Settings/EditarPerfil";
import Idioma from "../components/Settings/Idioma";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TopBar from "../components/TopBar.jsx";
import { PersonIcon, NotificationsIcon, PaletteIcon, QuestionMarkIcon, SupportAgentIcon, LogoutIcon, LockIcon, LanguageIcon } from "../utils/icons.js";

export default function Ajustes() {
  const { id: userId, userImage, nombre: username, theme: userTheme } = getUserData();
  const [theme, setTheme] = useState(userTheme);
  const [modals, toggleModal] = useModalState();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const bgButton = useBGForButtons(theme);

  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-[#000000]" : "bg-white";
  }, [theme]);

  const handleColorSelect = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleLogOut = async () => {
    MySwal.fire({
      icon: "warning",
      iconColor: theme === "dark" ? "#ffff" : "#eeeee",
      title: "Ten cuidado",
      text: "¿Estás seguro de que quieres cerrar la sesión?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: {bgButton},
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
      await updateUserProfile(userId, newImageUrl, newNombre, token);
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
    <div className={`w-full min-h-screen mx-auto p-4 md:p-8 flex flex-col ${theme === "dark" ? "bg-[var(--bg-dark)] text-[var(--color-dark)]" : "bg-[--bg-light] text-[var(--color-light)"}`}>
      <TopBar nombre="Mi Cuenta" ruta="/" theme={theme} />
      <div className="flex flex-col items-center mt-6">
        <div className="flex justify-center mb-4 relative">
          <img
            src={userImage || "https://res.cloudinary.com/dv4wfetu1/image/upload/v1740610245/avatar_qspfc1.svg"}
            alt="Perfil"
            className="rounded-full object-cover"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
        <h2 className={`mt-4 text-5xl font-normal font-['Roboto'] text-center w-full ${theme === "dark" ? "text-[var(--color-dark)]" : "text-[var(--color-light)]"}`}>{username}</h2>
      </div>

      <div className="flex-grow overflow-auto mb-[80px]">
        {renderSection("Cuenta", [
          { icon: PersonIcon, label: "Editar Perfil", onClick: () => toggleModal("showEditarPerfil") },
          { icon: LockIcon, label: "Cambiar Contraseña", onClick: () => navigate("/forgot") },
          { icon: LogoutIcon, label: "Cerrar sesión", onClick: handleLogOut },
        ], theme)}
        {renderSection("Preferencias", [
          { icon: LanguageIcon, label: "Idioma", onClick: () => toggleModal("showIdiomaModal") },
          { icon: NotificationsIcon, label: "Notificaciones", isSwitch: true, switchState: false, onClick: () => {} },
          { icon: PaletteIcon, label: "Color", onClick: () => toggleModal("showColorModal") },
        ], theme)}
        {renderSection("Seguridad y Soporte", [
          { icon: QuestionMarkIcon, label: "Preguntas Frecuentes" },
          { icon: SupportAgentIcon, label: "Soporte" },
        ], theme)}
      </div>

      <NavBar theme={theme} />

      {modals.showColorModal && <Color onClose={() => toggleModal("showColorModal")} onColorSelect={handleColorSelect} theme={theme} />}
      {modals.showCerrarSesion && <CerrarSesion theme={theme} onClose={() => toggleModal("showCerrarSesion")} />}
      {modals.showEditarPerfil && <EditarPerfil onClose={() => toggleModal("showEditarPerfil")} theme={theme} onProfileUpdate={onProfileUpdate} />}
      {modals.showIdiomaModal && <Idioma onClose={() => toggleModal("showIdiomaModal")} theme={theme} />}
    </div>
  );
}