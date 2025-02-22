import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";

function renderNavItem(IconComponent, label, isActive, theme, variant, onClick) {
  function getIconColor(variant, theme) {
    if (theme === "dark") {
      return variant === "chevronRight" ? "white" : "#ff5353";
    } else {
      if (variant === "chevron" || variant === "chevronRight") return "black";
      if (variant === "gray") return "gray";
      return "#6a62dc";
    }
  }

  return (
    <div
      className="flex flex-col items-center cursor-pointer hover:text-[#6a62dc]"
      onClick={onClick}
    >
      <IconComponent sx={{ color: getIconColor(variant, theme), fontSize: 24 }} />
      <span className={theme === "dark" ? "text-[#E0E0E0]" : "text-black"}>{label}</span>
    </div>
  );
}

function NavBar({ theme }) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full md:max-w-full h-[77px] shadow-md flex justify-around items-center border-t fixed bottom-0 left-0 
        ${theme === "dark" ? "bg-[#000000] border-[#ff5353]" : "bg-white border-[#6a62dc]"}`}
    >
      {renderNavItem(HomeIcon, "Inicio", false, theme, "default", () => navigate("/"))}
      {renderNavItem(AttachMoneyIcon, "Billetera", false, theme, "default", () => navigate("/billetera"))}
      {renderNavItem(AccessTimeIcon, "Actividad", false, theme, "default", () => navigate("/actividad"))}
      {renderNavItem(PersonOutlineIcon, "Mi cuenta", true, theme, "default", () => navigate("/settings"))}
    </div>
  );
}

export default NavBar;
