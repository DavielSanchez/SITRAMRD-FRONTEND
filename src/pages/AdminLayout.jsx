import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  PenTool,
  FileEdit,
  CheckSquare,
  BarChart3,
  Menu,
} from "lucide-react";

export default function AdminLayout({ children, activePage }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Ancho del sidebar: 64px colapsado o 240px expandido
  const sidebarWidth = isCollapsed ? 64 : 240;

  const navItems = [
    { to: "/dashboard", icon: ClipboardList, name: "Dashboard" },
    { to: "/gestionU", icon: PenTool, name: "Gestión U." },
    { to: "/gestionO", icon: FileEdit, name: "Gestión O." },
    { to: "/auditoria", icon: CheckSquare, name: "Auditoría" },
    { to: "/reportes", icon: BarChart3, name: "Reportes" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fijo en el lado izquierdo */}
      <aside
        className="hidden md:block bg-[#6A62DC] transition-all duration-300"
        style={{ width: `${sidebarWidth}px` }}
      >
        <div className="px-2 py-4">
          <button onClick={toggleSidebar} className="mb-6 focus:outline-none">
            <Menu className="w-8 h-6 text-white" />
          </button>
          <nav className="flex flex-col space-y-4">
            {navItems.map(({ to, icon: Icon, name }) => (
              <Link key={name} to={to}>
                <button
                  className={`flex items-center w-full p-2 rounded-lg transition duration-200 ${
                    !isCollapsed ? "hover:bg-[#8F87FF]" : ""
                  } ${activePage === name ? "bg-[#8F87FF] shadow-md" : ""}`}
                >
                  <Icon className="w-6 h-6 text-white" />
                  {!isCollapsed && (
                    <span className="ml-3 text-white text-sm">{name}</span>
                  )}
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Área principal: Header y contenido, a la derecha del sidebar */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Header dentro del área de contenido */}
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[#6A62DC] text-xl font-semibold">
              Panel administrativo
            </h1>
            <div className="flex items-center gap-3">
              <NotificationBell />
              <UserMenu />
            </div>
          </div>
        </header>
        {/* Contenido principal */}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* Navegación inferior para móviles */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#6A62DC] flex justify-around py-3 px-4 rounded-t-lg z-20">
        {navItems.map(({ to, icon: Icon, name }) => (
          <Link key={name} to={to} className="flex flex-col items-center">
            <button className="flex items-center justify-center transition duration-200 hover:scale-105 hover:shadow-lg">
              <Icon className="w-6 h-6 text-[#F1F2FF]" />
            </button>
            <span className="text-white text-xs mt-1">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function NotificationBell() {
  return (
    <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full">
      <div className="absolute top-0 right-0 w-5 h-5 bg-[#FF5353] rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-medium">3</span>
      </div>
      <svg width="22" height="19" viewBox="0 0 36 31" fill="#6A62DC">
        <path d="M5.14286 12.9167C5.14286 5.783 10.8992 0 18 0C25.1007 0 30.8571 5.783 30.8571 12.9167V20.6667L36 25.8333V31H0V25.8333L5.14286 20.6667V12.9167Z" />
      </svg>
    </div>
  );
}

function UserMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#6A62DC] focus:outline-none"
      >
        <img
          src="https://placehold.co/45x45"
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#6A62DC] rounded-lg shadow-lg z-20">
          <UserCard />
        </div>
      )}
    </div>
  );
}

function UserCard() {
  return (
    <div className="p-4">
      <div className="text-[#2c0372] text-lg font-normal">UserName</div>
      <div className="text-[#6A62DC] text-sm">UserEmail</div>
      <div className="mt-2 text-[#6A62DC] text-base">Mi cuenta</div>
    </div>
  );
  
}
