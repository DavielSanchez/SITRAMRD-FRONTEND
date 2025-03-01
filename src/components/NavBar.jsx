import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import { useBG, useText, usePrimaryColors, useColorsWithHover, useIconColor } from "../ColorClass";

function renderNavItem(IconComponent, label, isActive, theme, variant, onClick) {

  const bgColor = useBG(theme);
  const textColor = useText(theme);
  const primaryColors = usePrimaryColors(theme);
  const primaryHover = useColorsWithHover(theme);
  const getIconColor = useIconColor(theme, 'black')


  return (
    <div
      className="flex flex-col items-center cursor-pointer hover:text-[var(--primary-purple-color)]"
      onClick={onClick}
    >
      <IconComponent sx={{ color: getIconColor, fontSize: 24 }} />
      <span className={theme === "dark" ? "text-[#E0E0E0]" : "text-black"}>{label}</span>
    </div>
  );
}

function NavBar({ theme }) {
  const navigate = useNavigate();

  const bgColor = useBG(theme);
  const textColor = useText(theme);
  const primaryColors = usePrimaryColors(theme);
  const primaryHover = useColorsWithHover(theme);
  const getIconColor = useIconColor(theme, 'black')

  return (
    <div
      className={`w-full md:max-w-full h-[77px] shadow-md flex justify-around items-center border-t fixed bottom-0 left-0 
        ${theme === "dark" ? ` ${bgColor}  border-[var(--primary-orange-color)]` : `${bgColor} border-[var(--primary-purple-color)]`}`}
    >
      {renderNavItem(HomeIcon, "Inicio", false, theme, "default", () => navigate("/"))}
      {renderNavItem(AttachMoneyIcon, "Billetera", false, theme, "default", () => navigate("/billetera"))}
      {renderNavItem(AccessTimeIcon, "Actividad", false, theme, "default", () => navigate("/actividad"))}
      {renderNavItem(PersonOutlineIcon, "Mi cuenta", true, theme, "default", () => navigate("/settings"))}
    </div>
  );
}

export default NavBar;
