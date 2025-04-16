import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { jwtDecode } from "jwt-decode";
import { useBG, useText, usePrimaryColors } from "../ColorClass";

function TopBar({ nombre, ruta, mostrarIcono = true }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const textColor = useText(theme);
  const primaryTextColor = usePrimaryColors(theme);
  const bgColor = useBG(theme);

  // Función que determina el color del icono dependiendo del tema
  function getIconColor(variant, theme) {
    if (theme === "dark") {
      if (variant === "chevronRight") return "white";
      return "#6a62dc"; // Ajusta el color según el tema oscuro
    } else {
      if (variant === "chevron") return "black";
      if (variant === "chevronRight") return "black"; // Para tema claro
      if (variant === "gray") return "gray";
      return "#6a62dc"; // Por defecto para tema claro
    }
  }

  return (
    <div className={`${bgColor} w-full md:max-w-full h-[45px] shadow-md flex justify-center items-center fixed border-b z-40`}>
      {mostrarIcono && (
        <div className="absolute left-[10px] cursor-pointer hover:opacity-75 active:opacity-50" onClick={() => navigate(ruta)}>
          <ChevronLeftIcon sx={{ color: getIconColor("chevron", theme), fontSize: 32 }} />
        </div>
      )}
      <h1 className={`text-3xl font-normal font-['Roboto'] ${primaryTextColor}`}>{nombre}</h1>
    </div>
  );
}

export default TopBar;