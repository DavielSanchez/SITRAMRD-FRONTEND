import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/PanelOperador/Sidebar";
import BarraSuperior from "../components/PanelIncidencias/BarraSuperior";
import IncidenciasCard from "../components/PanelOperador/IncidenciasCard";
import IncidenciasP from "../components/PanelIncidencias/IncidenciasP";
import IncidenciasR from "../components/PanelIncidencias/IncidenciasR";
import Tabla from "../components/PanelIncidencias/Tabla";

// Importa el modal
import ModalRegistrar from "../components/PanelIncidencias/ModalRegistrar";

export default function Incidencias() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  
  // Estado para mostrar/ocultar el modal
  const [showModal, setShowModal] = useState(false);

  // Función para refrescar la tabla (opcional).
  // Podrías usar un "key" en la tabla o un método de recarga si la tabla
  // está en el mismo componente, o si tienes un contexto, etc.
  const refreshTable = () => {
    // Aquí podrías forzar el re-fetch de incidencias en la tabla.
    // Un truco simple es cambiar una key en la tabla para que se recargue.
    // Por ejemplo:
    // setTableKey(tableKey + 1);
  };

  const handleButtonClick = (name) => setActiveButton(name);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar handleButtonClick={handleButtonClick} activeButton={activeButton} />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-auto ml-[120px]">
        {/* Barra superior importada */}
        <BarraSuperior />

        {/* Contenido principal */}
        <main className="flex-1 p-4 md:p-8 mt-[122px] transition-all duration-300">
          {/* Sección de tarjetas de estadísticas */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <IncidenciasCard />
            <IncidenciasP />
            <IncidenciasR />
          </section>

          {/* Botón para registrar incidencia */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#6a62dc] text-white font-semibold px-4 py-2 rounded-md w-48 hover:bg-indigo-600 transition-colors"
          >
            Registrar incidencia
          </button>

          {/* Tabla de incidencias */}
          <Tabla /* key={tableKey} */ />

        </main>
      </div>

      {/* Modal para registrar una incidencia */}
      <ModalRegistrar
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onIncidenciaAdded={refreshTable}
      />

      {/* Navegación inferior para móviles (opcional) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#6A62DC] flex justify-around py-3 px-4 rounded-t-lg z-20">
        {/* Opciones móviles */}
      </div>
    </div>
  );
}