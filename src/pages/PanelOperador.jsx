import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

import IncidenciasCard from "../components/PanelOperador/IncidenciasCard";
import ReporteCard from "../components/PanelOperador/ReporteCard";
import AutobusACard from "../components/PanelOperador/AutobusACard";
import Mapa from "../components/PanelOperador/Mapa";
import Rutas from "../components/PanelOperador/Rutas";
import AutobusesCardCounter from "../components/PanelOperador/AutobusesCard";

import { useBG, useBGForButtons, useText } from "../ColorClass";

function PanelOperador() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  
  const token = localStorage.getItem("token");
  const theme = token ? JSON.parse(atob(token.split(".")[1])).theme : "light";

  const bgColor = useBG(theme);
  const buttonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  const handleButtonClick = (name) => {
    setActiveButton(name);
  };

  return (
    <div className={`flex h-screen overflow-hidden ${bgColor}`}>
      {/* Sidebar fijo */}
      <Sidebar role="operador" handleButtonClick={handleButtonClick} activeButton={activeButton} />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-auto ml-[120px] relative">
        {/* Barra Superior fija con los mismos márgenes y dimensiones */}
        <div className={`fixed top-0 left-[120px] w-[calc(100%-120px)] h-[122px] ${bgColor} shadow flex justify-between items-center px-[68px] py-4 z-50`}>
          <TopBar title="Panel de Operadores" />
        </div>

        {/* Contenido principal: se le aplica mt-[122px] para que no quede tapado por la barra superior */}
        <main className="flex-1 p-4 md:p-8 mt-[122px] transition-all duration-300">
          {/* Sección de tarjetas de estadísticas (cada card maneja su propia API) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <IncidenciasCard />
            <ReporteCard />
            <AutobusACard />
          </section>

          {/* Sección del mapa y contadores separados */}
          <section className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
            <Mapa />
            <div className="md:col-span-2 grid grid-cols-1 gap-5">
              <Rutas />
              <AutobusesCardCounter />
            </div>
          </section>
        </main>
      </div>

      {/* Navegación inferior para móviles (opcional) */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${buttonColor} flex justify-around py-3 px-4 rounded-t-lg z-20`}>
        {/* Opciones móviles */}
      </div>
    </div>
  );
}

export default PanelOperador;
