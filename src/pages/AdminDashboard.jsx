import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

function AdminDashboard() {
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/users`);
        const data = await response.json();
     
        const activeCount = data.filter(user => user.estadoUsuario === "activo").length;
        setActiveUsers(activeCount);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout activePage="Dashboard">
      <div className="space-y-4 mt-4">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          <StatCard title="Usuarios activos" value={loading ? "..." : activeUsers} percentage={0} />
          <StatCard title="Incidencias" value="18" percentage={-15} />
          <StatCard title="Reportes" value="35" />
          <RoutesCard />
          <StatCard title="Autobuses disp." value="82" />
          <StatCard title="Paradas" value="200" />
        </div>
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {/* Fila superior */}
          <StatCard title="Usuarios activos" value={loading ? "..." : activeUsers} percentage={0} />
          <StatCard title="Incidencias" value="18" percentage={-15} />
          <StatCard title="Reportes" value="35" />
          {/* Fila inferior */}
          <RoutesCard className="col-span-2" />
          <div className="flex flex-col gap-4">
            <StatCard title="Autobuses disp." value="82" />
            <StatCard title="Paradas" value="200" />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, percentage }) {
  return (
    <div className="w-[85%] mx-auto bg-[#f1f1ff] rounded-2xl shadow-md p-4 flex flex-col justify-center">
      <h2 className="text-[#6A62DC] text-xl font-bold">{title}</h2>
      <div className="mt-2 text-[#FF5353] text-2xl">{value}</div>
      {percentage !== undefined && (
        <div className={`mt-1 text-lg ${percentage > 0 ? "text-green-500" : "text-red-500"}`}>
          {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
        </div>
      )}
    </div>
  );
}

function RoutesCard({ className }) {
  return (
    <div className={`w-[85%] mx-auto bg-[#f1f1ff] rounded-2xl shadow-md p-2 md:h-80 overflow-hidden ${className}`}>
      <h2 className="text-[#6A62DC] text-xl font-bold mb-2">Rutas</h2>
      <img
        className="w-full h-full rounded-xl object-cover"
        src="https://placehold.co/663x422"
        alt="Mapa de Rutas"
      />
    </div>
  );
}

export default AdminDashboard;
