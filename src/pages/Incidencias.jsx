import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import IncidenciasCard from "../components/PanelOperador/IncidenciasCard";
import IncidenciasP from "../components/PanelIncidencias/IncidenciasP";
import IncidenciasR from "../components/PanelIncidencias/IncidenciasR";
import Tabla from "../components/PanelIncidencias/Tabla";
import ModalRegistrar from "../components/PanelIncidencias/ModalRegistrar";
import { useBG, useBGForButtons, useText } from "../ColorClass";

export default function Incidencias() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  const theme = token ? JSON.parse(atob(token.split(".")[1])).theme : "light";
  const bgColor = useBG(theme);
  const buttonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  const refreshTable = () => {};
  const handleButtonClick = (name) => setActiveButton(name);

  return (
    <div className={`flex h-screen overflow-hidden ${bgColor}`}>
      <Sidebar handleButtonClick={handleButtonClick} activeButton={activeButton} />
      <div className="flex flex-col flex-1 overflow-auto ml-[120px]">
        <TopBar title="Panel de Incidencias" />
        <main className="flex-1 p-4 md:p-8 mt-[122px] transition-all duration-300">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <IncidenciasCard />
            <IncidenciasP />
            <IncidenciasR />
          </section>
          <button
            onClick={() => setShowModal(true)}
            className={`${buttonColor} text-white font-semibold px-4 py-2 rounded-md w-48 hover:opacity-90 transition-colors`}
          >
            Registrar incidencia
          </button>
          <Tabla />
        </main>
      </div>
      <ModalRegistrar
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onIncidenciaAdded={refreshTable}
      />
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#6A62DC] flex justify-around py-3 px-4 rounded-t-lg z-20"></div>
    </div>
  );
}
