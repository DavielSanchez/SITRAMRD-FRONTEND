import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Notifications, Person, Edit, Delete, Visibility, DirectionsBus } from "@mui/icons-material";
import Sidebar from "./Sidebar";

export default function Incidencias() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [incidencias, setIncidencias] = useState([]);
  const [totalIncidencias, setTotalIncidencias] = useState(0);

  // Obtener incidencias desde la API
  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await fetch("http://localhost:3001/incidencia/all");
        const data = await response.json();
        if (data.incidencias) {
          setIncidencias(data.incidencias);
          setTotalIncidencias(data.incidencias.length);
        }
      } catch (error) {
        console.error("Error fetching incidencias:", error);
      }
    };
    fetchIncidencias();
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const handleButtonClick = (name) => setActiveButton(name);
  
  // Ajuste del margen del contenido principal según el estado del sidebar
  const mainMargin = isCollapsed ? "md:ml-16" : "md:ml-60";

  return (
    <div className="bg-[#f5f7fa] min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <Sidebar 
          isCollapsed={isCollapsed} 
          toggleSidebar={toggleSidebar} 
          activeButton={activeButton} 
          handleButtonClick={handleButtonClick} 
        />

        {/* Contenido principal */}
        <div className={`flex flex-col flex-1 ${mainMargin} transition-all duration-300`}>
          {/* Barra superior */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-300">
            <h1 className="text-xl font-semibold text-[#6a62dc]">Vista Incidencias</h1>
            <div className="flex items-center space-x-4">
              <Notifications className="text-[#6a62dc] cursor-pointer" />
              <Person className="text-[#6a62dc] cursor-pointer" />
            </div>
          </div>

          {/* Sección de tarjetas e información */}
          <div className="p-4 md:p-6 flex flex-col gap-6">
            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card: Incidencias */}
              <div className="bg-white border border-gray-200 rounded shadow p-4">
                <p className="text-sm text-gray-500">Incidencias</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold mr-2">{totalIncidencias}</p>
                  {/* Puedes agregar un porcentaje dinámico si lo deseas */}
                  <p className="text-sm text-green-500">+15%</p>
                </div>
              </div>

              {/* Card: Incidencias pendientes */}
              <div className="bg-white border border-gray-200 rounded shadow p-4">
                <p className="text-sm text-gray-500">Incidencias pendientes</p>
                <p className="text-2xl font-bold">12</p>
              </div>

              {/* Card: Incidencias resueltas */}
              <div className="bg-white border border-gray-200 rounded shadow p-4">
                <p className="text-sm text-gray-500">Incidencias resueltas</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>

            {/* Botón para registrar incidencia */}
            <button
              className="bg-[#6a62dc] text-white font-semibold px-4 py-2 rounded-md w-48 hover:bg-indigo-600 transition-colors"
            >
              Registrar incidencia
            </button>

            {/* Tabla de incidencias: Solo muestra Autobús y Descripción */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-[#6a62dc] text-white">
                    <th className="px-4 py-2 text-left">Autobús</th>
                    <th className="px-4 py-2 text-left">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {incidencias.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="px-4 py-4 text-center text-gray-500">
                        No hay incidencias registradas.
                      </td>
                    </tr>
                  ) : (
                    incidencias.map((inc) => (
                      <tr key={inc._id} className="border-b">
                        <td className="px-4 py-2">
                          {inc.idAutobus && inc.idAutobus.placa ? inc.idAutobus.placa : "N/A"}
                        </td>
                        <td className="px-4 py-2">{inc.descripcion}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
