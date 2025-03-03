import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Notifications, Person, DirectionsBus } from "@mui/icons-material";
import Sidebar from "./Sidebar";

export default function Operadores() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [incidencias, setIncidencias] = useState([]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleButtonClick = (name) => {
    setActiveButton(name);
  };

  // Para pantallas md y mayores: si el menú está colapsado, el ancho es w-16, de lo contrario w-60
  const mainMargin = isCollapsed ? "md:ml-16" : "md:ml-60";

  // Obtener las incidencias desde la API al cargar el componente
  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await fetch("http://localhost:3001/incidencia/all");
        const data = await response.json();
        if (data.incidencias) {
          setIncidencias(data.incidencias);
        }
      } catch (error) {
        console.error("Error fetching incidencias:", error);
      }
    };

    fetchIncidencias();
  }, []);

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
        <main
          className={`flex-1 p-4 md:p-8 pt-4 pb-16 ${mainMargin} transition-all duration-300`}
        >
          {/* Barra superior */}
          <header className="bg-white rounded-lg shadow p-4 mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#6a62dc]">
              Panel de Operadores
            </h1>
            <div className="flex items-center space-x-4">
              {/* Notificaciones */}
              <div className="relative">
                <Notifications
                  className="text-[#6a62dc] cursor-pointer"
                  fontSize="large"
                />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  3
                </span>
              </div>
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full border-2 border-[#6a62dc] flex items-center justify-center cursor-pointer">
                <Person className="text-[#6a62dc]" fontSize="large" />
              </div>
            </div>
          </header>

          {/* Tarjetas de estadísticas */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Se renderiza el componente IncidenciasCard que muestra las incidencias obtenidas */}
            <IncidenciasCard incidencias={incidencias} />
            <StatCard
              title="Reportes"
              value="18"
              percentage="-15%"
              color="text-red-500"
            />
            <StatCard
              title="Autobuses activos"
              value="39"
              percentage="-15%"
              color="text-red-500"
            />
          </section>

          {/* Sección con mapa y contadores */}
          <section className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Card de Rutas con mapa (placeholder) */}
            <div className="col-span-3 bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#6a62dc] mb-2">Rutas</h3>
              <div className="w-full h-64 flex justify-center items-center text-gray-400 bg-gray-50">
                {/* Aquí irá tu componente de mapa en el futuro */}
                Mapa aquí
              </div>
            </div>

            {/* Tarjetas de contadores */}
            <div className="flex flex-col space-y-4">
              <CounterCard
                icon={<DirectionsBus />}
                label="Rutas asignadas"
                value="42"
              />
              <CounterCard
                icon={<DirectionsBus />}
                label="Autobuses"
                value="49"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/**
 * StatCard: Tarjeta para Reportes y Autobuses activos.
 */
function StatCard({ title, value, percentage, color }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-[#6a62dc]">{title}</h3>
      <p className="text-2xl font-bold text-gray-700">{value}</p>
      <p className={`text-sm ${color}`}>{percentage}</p>
      {/* Placeholder para una mini-gráfica */}
      <div className="w-full h-10 bg-gray-200 mt-2"></div>
    </div>
  );
}

/**
 * IncidenciasCard: Tarjeta que muestra las incidencias en forma de tabla.
 */
function IncidenciasCard({ incidencias }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold text-[#6a62dc]">Incidencias</h3>
      {incidencias.length === 0 ? (
        <p className="text-gray-500 mt-2">No hay incidencias registradas.</p>
      ) : (
        <div className="mt-2 overflow-auto max-h-60">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Descripción</th>
                <th className="text-left">Estado</th>
                <th className="text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {incidencias.map((inc) => (
                <tr key={inc._id}>
                  <td className="py-1">{inc.descripcion}</td>
                  <td className="py-1">{inc.estado}</td>
                  <td className="py-1">
                    {new Date(inc.fechaDeReporte).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/**
 * CounterCard: Tarjeta para mostrar contadores (Rutas asignadas, Autobuses, etc.).
 * Se modificó para que el label tenga color morado y el número en rojo.
 */
function CounterCard({ icon, label, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-2">
      <span className="text-[#6a62dc] text-2xl">{icon}</span>
      <span className="text-[#6a62dc]">
        {label}: <strong className="text-red-500">{value}</strong>
      </span>
    </div>
  );
}
