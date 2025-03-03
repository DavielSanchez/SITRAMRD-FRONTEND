import React from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  PenTool,
  FileEdit,
  CheckSquare,
  BarChart3,
  Menu,
} from "lucide-react";

function Sidebar({
  isCollapsed,
  toggleSidebar,
  activeButton,
  handleButtonClick,
}) {
  const navItems = [
    { to: "/dashboard", icon: ClipboardList, name: "Dashboard" },
    { to: "/gestionU", icon: PenTool, name: "Gestión U." },
    { to: "/gestionO", icon: FileEdit, name: "Gestión O." },
    { to: "/auditoria", icon: CheckSquare, name: "Auditoría" },
    { to: "/reportes", icon: BarChart3, name: "Reportes" },
  ];

  return (
    <>
      {/* Sidebar para pantallas medianas y grandes */}
      <div
        className={`hidden md:flex flex-col bg-[#6A62DC] min-h-screen transition-[width] duration-300 ${
          isCollapsed ? "w-16" : "w-60"
        } px-2 py-6 fixed top-0 left-0 pt-[61px] z-20`}
      >
        <button onClick={toggleSidebar} className="mb-6 focus:outline-none">
          <Menu className="w-8 h-6 text-white" />
        </button>
        <nav className="flex flex-col space-y-4">
          {navItems.map(({ to, icon: Icon, name }) => (
            <Link key={name} to={to}>
              <button
                onClick={() => handleButtonClick(name)}
                className={`flex items-center w-full p-2 rounded-lg transition duration-200 ${
                  !isCollapsed ? "hover:bg-[#8F87FF]" : ""
                } ${activeButton === name ? "bg-[#8F87FF] shadow-md" : ""}`}
              >
                <Icon className="w-6 h-6 text-white" />
                <span
                  className={`ml-3 text-white text-sm transition-all duration-300 ${
                    isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                  }`}
                >
                  {name}
                </span>
              </button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Barra de navegación inferior para móviles */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#6A62DC] flex justify-around py-3 px-4 w-full mx-auto rounded-t-lg z-20">
        {navItems.map(({ to, icon: Icon, name }) => (
          <Link key={name} to={to} className="flex flex-col items-center">
            <button
              onClick={() => handleButtonClick(name)}
              className="flex items-center justify-center transition duration-200 hover:scale-105 hover:shadow-lg"
            >
              <Icon className="w-6 h-6 text-[#F1F2FF]" />
            </button>
            <span className="text-white text-xs mt-1">{name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
