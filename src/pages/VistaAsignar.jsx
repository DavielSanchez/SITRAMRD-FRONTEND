import React from "react";
import Sidebar from "../components/PanelOperador/Sidebar";
import BarraSuperior from "../components/PanelAsignar/BarraSuperior";
import SelectAutobus from "../components/PanelAsignar/SelectAutobus";
import SelectRuta from "../components/PanelAsignar/SelectRuta";
import Tabla from "../components/PanelAsignar/Tabla";

function VistaAsignar() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-auto ml-[120px]">
        {/* Barra Superior */}
        <BarraSuperior />

        <main className="flex-1 p-4 md:p-8 mt-[122px]">
          <div className="flex flex-col gap-6 items-center">
            <SelectAutobus />
            <SelectRuta />
            <div className="w-[239px] h-[53px] bg-[#6a62dc] rounded-[20px] flex items-center justify-center cursor-pointer">
              <div className="text-white text-2xl font-semibold font-['Inter']">
                Asignar
              </div>
            </div>
          </div>

          {/* Tabla (ya configurada según otros requerimientos) */}
          <Tabla />
        </main>
      </div>
    </div>
  );
}

export default VistaAsignar;