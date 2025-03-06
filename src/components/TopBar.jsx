// components/Operador/BarraSuperior.jsx

import React, { useState, useRef, useEffect } from "react";
import { Email, Notifications } from "@mui/icons-material";
import {
  useBG,
  usePrimaryColors,
  useColorsWithHover,
  useIconColor,
} from "../ColorClass";

/**
 * Hook para detectar clics fuera de un contenedor
 */
function useOutsideClick(ref, onOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onOutsideClick]);
}

export default function BarraSuperior({ title, theme }) {
  const bgColor = useBG(theme);
  const primaryColors = usePrimaryColors(theme);
  const primaryHover = useColorsWithHover(theme);
  const iconColor = useIconColor(theme, "default");

  return (
    <header
      className={`fixed top-0 left-[120px] w-[calc(100%-120px)] h-[122px] ${bgColor} shadow flex justify-between items-center px-[68px] py-4 z-50`}
    >
      {/* Título en morado */}
      <div className="text-[#6a62dc] text-[40px] font-semibold font-['Inter']">
        {title}
      </div>

      {/* Íconos a la derecha */}
      <div className="flex items-center gap-4">
        {/* Ícono de correo + panel de mensajes */}
        <AdditionalIcon primaryHover={primaryHover} iconColor={iconColor} />

        {/* Ícono de notificaciones + panel de notificaciones */}
        <NotificationBell primaryHover={primaryHover} iconColor={iconColor} />

        {/* Menú del usuario */}
        <UserMenu
          theme={theme}
          primaryColors={primaryColors}
          primaryHover={primaryHover}
        />
      </div>
    </header>
  );
}

/* =======================================================
   ÍCONO DE CORREO (MENSAJES)
   ======================================================= */
function AdditionalIcon({ primaryHover, iconColor }) {
  const [showMessages, setShowMessages] = useState(false);
  const messagesRef = useRef(null);

  // Cierra el panel al hacer clic fuera de él
  useOutsideClick(messagesRef, () => setShowMessages(false));

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  return (
    <div className="relative">
      {/* Ícono de correo */}
      <div
        className={`flex items-center cursor-pointer p-2 ${primaryHover} rounded-full`}
        onClick={toggleMessages}
      >
        <Email className={iconColor} fontSize="large" />
      </div>

      {/* Contenedor de mensajes */}
      {showMessages && (
        <div
          ref={messagesRef}
          className="absolute right-0 mt-2 w-[320px] bg-white border border-[#6a62dc] rounded-xl shadow-lg p-4"
        >
          {/* Encabezado: "Mensajes" y "Marcar todos como leídos" */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-[#6a62dc] text-base font-semibold">
              Mensajes
            </div>
            <button className="text-red-500 text-sm font-medium">
              Marcar todos como leídos
            </button>
          </div>

          {/* Lista de mensajes */}
          <div className="flex flex-col gap-4">
            <MessageItem user="Usuario" />
            <MessageItem user="Admin" />
            <MessageItem user="Daviel" />
          </div>

          {/* Ver todos los mensajes */}
          <div className="mt-4 text-center">
            <button className="text-[#6a62dc] text-sm font-medium underline underline-offset-2">
              Ver todos los mensajes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Un mensaje individual */
function MessageItem({ user }) {
  return (
    <div className="flex items-start gap-2">
      {/* Avatar circular gris */}
      <div className="w-10 h-10 rounded-full bg-[#d9d9d9] flex-shrink-0" />

      {/* Texto del mensaje */}
      <div className="leading-5">
        <div className="text-[#212121] text-sm font-bold">{user}</div>
        <div className="text-[#212121] text-xs">Mensaje</div>
        <div className="text-[#9e9e9e] text-xs">Hace 5 minutos</div>
      </div>
    </div>
  );
}

/* =======================================================
   ÍCONO DE NOTIFICACIONES
   ======================================================= */
function NotificationBell({ primaryHover, iconColor }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  // Cierra el contenedor al hacer clic fuera
  useOutsideClick(notificationsRef, () => setShowNotifications(false));

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="relative">
      {/* Ícono de la campana */}
      <div
        className={`flex items-center cursor-pointer p-2 ${primaryHover} rounded-full`}
        onClick={toggleNotifications}
      >
        <Notifications className={iconColor} fontSize="large" />
      </div>

      {/* Contenedor de notificaciones */}
      {showNotifications && (
        <div
          ref={notificationsRef}
          className="absolute right-0 mt-2 w-[320px] bg-white border border-[#6a62dc] rounded-xl shadow-lg p-4"
        >
          {/* Título: "Tienes # nuevas notificaciones" */}
          <div className="text-[#6a62dc] text-base font-semibold mb-4 text-center">
            Tienes 3 nuevas notificaciones
          </div>

          {/* Lista de notificaciones */}
          <div className="flex flex-col gap-4">
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </div>

          {/* Ver todas las notificaciones */}
          <div className="mt-4 text-center">
            <button className="text-[#6a62dc] text-sm font-medium underline underline-offset-2">
              Ver todas las notificaciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationItem() {
  return (
    <div className="flex items-start gap-2">
      {/* Icono/avatar circular gris */}
      <div className="w-10 h-10 rounded-full bg-[#d9d9d9] flex-shrink-0" />
      {/* Texto de la notificación */}
      <div className="leading-5">
        <div className="text-[#212121] text-sm font-medium">
          Se ha registrado una incidencia
        </div>
        <div className="text-[#9e9e9e] text-xs">Hace 5 minutos</div>
      </div>
    </div>
  );
}

/* =======================================================
   MENÚ DE USUARIO
   ======================================================= */
function UserMenu({ theme, primaryColors, primaryHover }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className={`relative flex items-center cursor-pointer p-2 rounded-full ${primaryHover}`}>
      <button
        onClick={toggleDropdown}
        className={`w-10 h-10 rounded-full overflow-hidden border-2 ${primaryColors} focus:outline-none`}
      >
        <img
          src="https://placehold.co/45x45"
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </button>
      {showDropdown && (
        <div ref={dropdownRef} className="absolute right-0 top-full mt-2">
          <UserCard theme={theme} />
        </div>
      )}
    </div>
  );
}

function UserCard({ theme }) {
  return (
    <div className="w-[228px] h-[239px] bg-white rounded-2xl border border-[#6a62dc] p-4">
      <div className="flex flex-col gap-4">
        {/* Opción: Mi cuenta */}
        <div className="flex items-center gap-2">
          <div data-svg-wrapper className="flex-shrink-0">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 0C5.59476 0 0 5.59476 0 12.5C0 19.4052 5.59476 25 12.5 25C19.4052 25 25 19.4052 25 12.5C25 5.59476 19.4052 0 12.5 0ZM12.5 4.83871C14.9496 4.83871 16.9355 6.8246 16.9355 9.27419C16.9355 11.7238 14.9496 13.7097 12.5 13.7097C10.0504 13.7097 8.06452 11.7238 8.06452 9.27419C8.06452 6.8246 10.0504 4.83871 12.5 4.83871Z"
                fill="#6A62DC"
              />
            </svg>
          </div>
          <div className="text-[#6a62dc] text-xl font-normal font-['Inter']">
            Mi cuenta
          </div>
        </div>

        {/* Opción: Notificaciones */}
        <div className="flex items-center gap-2">
          <div data-svg-wrapper className="flex-shrink-0">
            <Notifications className="text-[#6A62DC]" fontSize="large" />
          </div>
          <div className="text-[#6a62dc] text-xl font-normal font-['Inter']">
            Notificaciones
          </div>
        </div>

        {/* Opción: Configuración */}
        <div className="flex items-center gap-2">
          <div data-svg-wrapper className="flex-shrink-0">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_778_531)">
                <path
                  d="M22.3298 15.0965C22.3765 14.7465 22.3998 14.3848 22.3998 13.9998C22.3998 13.6265 22.3765 13.2531 22.3181 12.9031L24.6865 11.0598C24.8965 10.8965 24.9548 10.5815 24.8265 10.3481L22.5865 6.47481C22.4465 6.21814 22.1548 6.13647 21.8981 6.21814L19.1098 7.33814C18.5265 6.8948 17.9081 6.52147 17.2198 6.24147L16.7998 3.27814C16.7531 2.99814 16.5198 2.7998 16.2398 2.7998H11.7598C11.4798 2.7998 11.2581 2.99814 11.2115 3.27814L10.7915 6.24147C10.1031 6.52147 9.47314 6.90647 8.90147 7.33814L6.11314 6.21814C5.85647 6.1248 5.5648 6.21814 5.4248 6.47481L3.19647 10.3481C3.05647 10.5931 3.10314 10.8965 3.33647 11.0598L5.7048 12.9031C5.64647 13.2531 5.5998 13.6381 5.5998 13.9998C5.5998 14.3615 5.62314 14.7465 5.68147 15.0965L3.31314 16.9398C3.10314 17.1031 3.0448 17.4181 3.17314 17.6515L5.41314 21.5248C5.55314 21.7815 5.8448 21.8631 6.10147 21.7815L8.8898 20.6615C9.47314 21.1048 10.0915 21.4781 10.7798 21.7581L11.1998 24.7215C11.2581 25.0015 11.4798 25.1998 11.7598 25.1998H16.2398C16.5198 25.1998 16.7531 25.0015 16.7881 24.7215L17.2081 21.7581C17.8965 21.4781 18.5265 21.1048 19.0981 20.6615L21.8865 21.7815C22.1431 21.8748 22.4348 21.7815 22.5748 21.5248L24.8148 17.6515C24.9548 17.3948 24.8965 17.1031 24.6748 16.9398L22.3298 15.0965Z"
                  fill="#6A62DC"
                />
              </g>
              <defs>
                <clipPath id="clip0_778_531">
                  <rect width="27.9988" height="27.9988" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="text-[#6a62dc] text-xl font-normal font-['Inter']">
            Configuración
          </div>
        </div>

        {/* Divisor */}
        <div className="w-full h-px bg-[#d9d9d9] border border-[#6a62dc]/50" />

        {/* Opción: Cerrar sesión */}
        <div className="flex items-center gap-2">
          <div data-svg-wrapper className="flex-shrink-0">
            <svg
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.80752 15.838C6.60753 15.6049 6.51154 15.3231 6.51954 14.9928C6.5282 14.6625 6.63253 14.3807 6.83252 14.1475L8.65744 12.0199H1.00777C0.724449 12.0199 0.487126 11.9079 0.2958 11.6841C0.103809 11.461 0.0078125 11.1843 0.0078125 10.854C0.0078125 10.5237 0.103809 10.2466 0.2958 10.0228C0.487126 9.79969 0.724449 9.68816 1.00777 9.68816H8.65744L6.80752 7.53133C6.60753 7.29816 6.50754 7.02146 6.50754 6.70124C6.50754 6.38024 6.60753 6.10316 6.80752 5.86999C7.00751 5.63682 7.24517 5.52023 7.52049 5.52023C7.79515 5.52023 8.03247 5.63682 8.23246 5.86999L11.8073 10.0379C11.9073 10.1545 11.9783 10.2808 12.0203 10.4168C12.0616 10.5528 12.0823 10.6986 12.0823 10.854C12.0823 11.0095 12.0616 11.1552 12.0203 11.2912C11.9783 11.4272 11.9073 11.5535 11.8073 11.6701L8.20746 15.8672C8.02414 16.0809 7.79515 16.1878 7.52049 16.1878C7.24517 16.1878 7.00751 16.0712 6.80752 15.838ZM2.00773 21.3467C1.45775 21.3467 0.986771 21.1186 0.594787 20.6623C0.203471 20.2053 0.0078125 19.6562 0.0078125 19.015V15.5174C0.0078125 15.1871 0.103809 14.91 0.2958 14.6862C0.487126 14.4631 0.724449 14.3516 1.00777 14.3516C1.29109 14.3516 1.52875 14.4631 1.72074 14.6862C1.91206 14.91 2.00773 15.1871 2.00773 15.5174V19.015H16.0071V2.69304H2.00773V6.1906C2.00773 6.52092 1.91206 6.79762 1.72074 7.02068C1.52875 7.24453 1.29109 7.35645 1.00777 7.35645C0.724449 7.35645 0.487126 7.24453 0.2958 7.02068C0.103809 6.79762 0.0078125 6.52092 0.0078125 6.1906V2.69304C0.0078125 2.05182 0.203471 1.5027 0.594787 1.04568C0.986771 0.589447 1.45775 0.361328 2.00773 0.361328H16.0071C16.5571 0.361328 17.0281 0.589447 17.4201 1.04568C17.8114 1.5027 18.007 2.05182 18.007 2.69304V19.015C18.007 19.6562 17.8114 20.2053 17.4201 20.6623C17.0281 21.1186 16.5571 21.3467 16.0071 21.3467H2.00773Z"
                fill="#6A62DC"
              />
            </svg>
          </div>
          <div className="text-[#6a62dc] text-xl font-normal font-['Inter']">
            Cerrar sesión
          </div>
        </div>
      </div>
    </div>
  );
}