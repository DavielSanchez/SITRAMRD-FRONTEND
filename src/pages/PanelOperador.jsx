import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/PanelOperador/Sidebar";
import BarraSuperior from "../components/PanelOperador/BarraSuperior";
import IncidenciasCard from "../components/PanelOperador/IncidenciasCard";
import ReporteCard from "../components/PanelOperador/ReporteCard";
import AutobusACard from "../components/PanelOperador/AutobusACard";
import Mapa from "../components/PanelOperador/Mapa";
import Rutas from "../components/PanelOperador/Rutas";
import AutobusesCardCounter from "../components/PanelOperador/AutobusesCard";

function PanelOperador() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");

  const handleButtonClick = (name) => {
    setActiveButton(name);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fijo */}
      <Sidebar handleButtonClick={handleButtonClick} activeButton={activeButton} />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-auto ml-[120px]">
        <BarraSuperior />

        {/* Contenido principal */}
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#6A62DC] flex justify-around py-3 px-4 rounded-t-lg z-20">
        {/* Opciones móviles */}
      </div>
    </div>
  );
}

export default PanelOperador;
