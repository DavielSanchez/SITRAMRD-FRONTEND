import React, { useState, useEffect } from "react";
import Sidebar from "../components/Administrador/SideBar";
import NotificationBell from "../components/Administrador/Dashboard/NotificationBell";
import UserMenu from "../components/Administrador/Dashboard/UserMenu";
import StatCard from "../components/Administrador/Dashboard/StatCard";
import RoutesMapCard from "../components/Administrador/Dashboard/RoutesMapCard";

function AdminDashboard() {
  const [activeUsers, setActiveUsers] = useState(0);
  const [incidencias, setIncidencias] = useState([]);
  const [totalRutas, setTotalRutas] = useState(0);
  const [totalParadas, setTotalParadas] = useState(0);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingIncidencias, setLoadingIncidencias] = useState(true);
  const [loadingRutas, setLoadingRutas] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/auth/users`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setActiveUsers(data.filter((user) => user.estadoUsuario === "activo").length);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    const fetchIncidencias = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/incidencia/all`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setIncidencias(data.incidencias);
      } catch (error) {
        console.error("Error fetching incidencias:", error);
      } finally {
        setLoadingIncidencias(false);
      }
    };

    const fetchRutas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/ruta/all`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setTotalRutas(data.length);
        setTotalParadas(data.reduce((acc, ruta) => acc + (ruta.paradas ? ruta.paradas.length : 0), 0));
      } catch (error) {
        console.error("Error fetching rutas:", error);
      } finally {
        setLoadingRutas(false);
      }
    };

    fetchUsers();
    fetchIncidencias();
    fetchRutas();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 ml-[120px] overflow-auto">
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[#6A62DC] text-xl font-semibold">Panel administrativo</h1>
            <div className="flex items-center gap-3">
              <NotificationBell />
              <UserMenu />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4">
          <div className="mt-4">
            <div className="hidden md:flex md:flex-col gap-4">
              <div className="grid grid-cols-3 gap-4">
                <StatCard title="Usuarios activos" value={loadingUsers ? "..." : activeUsers} percentage={0} />
                <StatCard title="Incidencias" value={loadingIncidencias ? "..." : incidencias.length} percentage={-15} />
                <StatCard title="Rutas" value={loadingRutas ? "..." : totalRutas} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <RoutesMapCard />
                </div>
                <div className="flex flex-col gap-4">
                  <StatCard title="Paradas" value={loadingRutas ? "..." : totalParadas} />
                  <StatCard title="Autobuses disp." value="82" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
