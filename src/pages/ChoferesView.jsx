import React from 'react'
import Sidebar from '../components/choferes/SideBar';
import NotificationBell from "../components/Administrador/Dashboard/NotificationBell";
import UserMenu from "../components/Administrador/Dashboard/UserMenu";
import StatCard from "../components/Administrador/Dashboard/StatCard";
import RoutesMapCard from "../components/Administrador/Dashboard/RoutesMapCard";

function ChoferesView() {
  return (
    <div className="flex h-screen overflow-hidden">
    <Sidebar />

    <div className="flex flex-col flex-1 ml-[120px] overflow-auto">
      <header className="bg-white shadow-md p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[#6A62DC] text-xl font-semibold">Dashboard</h1>
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
              <div className="col-span-2">
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}

export default ChoferesView