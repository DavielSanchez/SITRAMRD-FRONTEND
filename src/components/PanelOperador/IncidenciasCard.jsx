import React, { useState, useEffect } from "react";

function IncidenciasCard() {
  const [incidencias, setIncidencias] = useState([]);
  // Configuración de API propio para Incidencias
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await fetch(`${API_LINK}/incidencia/all`);
        const data = await response.json();
        if (data.incidencias) {
          setIncidencias(data.incidencias);
        }
      } catch (error) {
        console.error("Error fetching incidencias:", error);
      }
    };
    fetchIncidencias();
  }, [API_LINK]);

  return (
    <div className="w-full bg-[#f1f1ff] shadow-md rounded-lg p-4 flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-[28px] font-bold text-[#6A62DC] font-['Inter']">
          Incidencias
        </h3>
        <span className="text-gray-600 text-xs">
          Total: {incidencias.length}
        </span>
      </div>
      {incidencias.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-xs">
            No hay incidencias registradas.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default IncidenciasCard;
