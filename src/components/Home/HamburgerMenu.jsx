import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SitramLogo from '../../assets/Home/SitramLogo.svg'
import { useText, useIconColor, useBGForButtons } from "../../ColorClass";

function HamburgerMenu() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const theme = decodedToken.theme;
    const iconColor = useIconColor(theme);
    const textColor = useText(theme);
    const bgColor = useBGForButtons(theme)

    const renderNavItem = (Icon, label, isActive, onClick) => {
        return (
            <div
                onClick={onClick}
                className={`flex flex-col items-center space-y-2 cursor-pointer ${isActive ? "text-blue-500" : ""}`}
            >
                <div className={`bg-white p-4 rounded-xl shadow-md`}>
                    <Icon sx={{ fontSize: 55, color: iconColor }} />
                </div>
                <span className={`text-xl text-white`}>{label}</span>
            </div>
        );
    };

    return (
        <div className="hidden xl:block">
            <button onClick={toggleMenu} className={`text-4xl ${textColor} p-2 focus:outline-none cursor-pointer`}>
                {isOpen ? <CloseIcon sx={{ fontSize: 45 }} /> : <MenuIcon sx={{ fontSize: 45, color: iconColor }} />}
            </button>

            <div
                className={`fixed top-0 left-0 w-62 h-full ${bgColor} shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <button onClick={toggleMenu} className="absolute top-4 right-4 text-2xl cursor-pointer">
                    <CloseIcon sx={{ fontSize: 45, color: 'white' }} />
                </button>

                <nav className="flex flex-col items-center mt-10 p-6 space-y-8">

                    <img className="h-25 mb-15" src={SitramLogo} alt="" />
                    {renderNavItem(HomeIcon, "Inicio", false, () => navigate("/HomeView"))}
                    {renderNavItem(AttachMoneyIcon, "Billetera", false, () => navigate("/billetera"))}
                    {renderNavItem(AccessTimeIcon, "Actividad", false, () => navigate("/actividad"))}
                    {renderNavItem(PersonOutlineIcon, "Mi cuenta", true, () => navigate("/settings"))}
                </nav>
            </div>
        </div>
    );
}

export default HamburgerMenu;
