import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import SelectAutobus from "../components/PanelAsignar/SelectAutobus";
import SelectRuta from "../components/PanelAsignar/SelectRuta";
import Tabla from "../components/PanelAsignar/Tabla";
import { jwtDecode } from "jwt-decode";
import { useBG, useBGForButtons, useText } from "../ColorClass";

function VistaAsignar() {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const bgColor = useBG(theme);
  const ButtonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  return (
    <div className={`flex h-screen overflow-hidden ${bgColor}`}>
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-auto ml-[120px]">
        {/* Barra Superior */}
        <TopBar title="Vista Asignar" />

        <main className="flex-1 p-4 md:p-8 mt-[122px]">
          <div className="flex flex-col gap-6 items-center">
            <SelectAutobus />
            <SelectRuta />
            <div className={`w-[239px] h-[53px] ${ButtonColor} rounded-[20px] flex items-center justify-center cursor-pointer`}>
              <div className={`${textColor} text-2xl font-semibold font-['Inter']`}>
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
