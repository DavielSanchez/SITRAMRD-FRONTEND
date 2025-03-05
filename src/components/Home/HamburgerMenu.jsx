import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useBG, useText, useIconColor } from "../../ColorClass";

function HamburgerMenu({}) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token)
    const theme = decodedToken.theme
    const iconColor = useIconColor(theme)
    const textColor = useText(theme)
    const bgColor = useBG(theme)

    const renderNavItem = (Icon, label, isActive, theme, variant, onClick) => {
        return (
            <div
                onClick={onClick}
                className={`flex items-center space-x-4 cursor-pointer ${isActive ? 'text-blue-500' : ''}`}
            >
                <Icon sx={{ fontSize: 24, color: iconColor }} />
                <span className={`text-3xl ${textColor}`}>{label}</span>
            </div>
        );
    };

    return (
        <div className="hidden xl:block">
            {/* Botón de hamburguesa */}
            <button onClick={toggleMenu} className={`text-4xl ${textColor} p-2 focus:outline-none`}>
                {isOpen ? <CloseIcon sx={{ fontSize: 45 }} /> : <MenuIcon sx={{ fontSize: 45, color: iconColor }} />}
            </button>

            {/* Menú desplegable */}
            <div
                className={`fixed top-0 left-0 w-96 h-full ${bgColor} shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <button onClick={toggleMenu} className="absolute top-4 right-4 text-2xl">
                    <CloseIcon sx={{ fontSize: 45 }} />
                </button>

                <nav className={`flex flex-col items-start mt-16 p-6 space-y-6`}>
                    {renderNavItem(HomeIcon, "Inicio", false, theme, "default", () => navigate("/HomeView"))}
                    {renderNavItem(AttachMoneyIcon, "Billetera", false, theme, "default", () => navigate("/billetera"))}
                    {renderNavItem(AccessTimeIcon, "Actividad", false, theme, "default", () => navigate("/actividad"))}
                    {renderNavItem(PersonOutlineIcon, "Mi cuenta", true, theme, "default", () => navigate("/settings"))}
                </nav>
            </div>

            {/* Overlay para cerrar el menú al hacer clic fuera */}
            {/* {isOpen && <div className={`fixed inset-0 opacity-50`} onClick={toggleMenu}></div>} */}
        </div>
    );
}

export default HamburgerMenu;
