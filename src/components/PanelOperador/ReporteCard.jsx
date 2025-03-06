import React, { useState, useEffect } from "react";

function ReporteCard() {
  const [reportes, setReportes] = useState([]);
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await fetch(`${API_LINK}/incidencia/all`);
        const data = await response.json();
        if (data.incidencias) {
          // Filtra incidencias cuyo estado sea "pendiente" o "en proceso"
          const pendientesReportes = data.incidencias.filter(
            (inc) =>
              inc.estado &&
              (inc.estado.toLowerCase() === "pendiente" ||
                inc.estado.toLowerCase() === "en proceso")
          );
          setReportes(pendientesReportes);
        }
      } catch (error) {
        console.error("Error fetching reportes:", error);
      }
    };
    fetchReportes();
  }, [API_LINK]);

  return (
    <div className="w-full bg-[#f1f1ff] shadow-md rounded-lg p-4 flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-[28px] font-bold text-[#6A62DC] font-['Inter']">
          Reportes
        </h3>
        <span className="text-gray-600 text-xs">Total: {reportes.length}</span>
      </div>
      {reportes.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-xs">No hay reportes registrados.</p>
        </div>
      ) : null}
    </div>
  );
}

export default ReporteCard;
