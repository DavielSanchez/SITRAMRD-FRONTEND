import React from "react";
import Sidebar from "../components/PanelOperador/Sidebar";
import BarraSuperior from "../components/PanelAsignar/BarraSuperior";

function VistaAsignar() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-auto ml-[120px]">
        {/* Barra superior */}
        <BarraSuperior />

        {/* Aquí puedes agregar el contenido propio de la vista Asignar */}
        <main className="flex-1 p-4 md:p-8 mt-[122px]">
          
          {/* Agrega aquí el contenido específico */}
        </main>
      </div>
    </div>
  );
}

export default VistaAsignar;
