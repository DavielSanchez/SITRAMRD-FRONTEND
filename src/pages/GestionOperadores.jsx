import React, { useState, useEffect } from "react";
import Sidebar from "../components/Administrador/SideBar";
import Estadisticas from "../components/Administrador/GestionOperadores/Estadistica";
import FormModal from "../components/Administrador/GestionOperadores/FormModal";
import SearchBar from "../components/Administrador/GestionOperadores/SearchBar";
import TablaUsuarios from "../components/Administrador/GestionOperadores/TablaUsuarios";
import OperadoresHeader from "../components/Administrador/GestionOperadores/OperadoresHeader";

export default function GestionOperadores() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/auth/users`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[120px] flex-1">
        <OperadoresHeader />
        <div className="transform scale-[0.85] origin-top mx-auto">
          <div className="space-y-6 mt-4 p-4">
            <Estadisticas />
            <SearchBar onAddUser={openModal} onSearch={() => {}} usuarios={usuarios} />
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <button
                  onClick={fetchUsuarios}
                  className="bg-[#6A62DC] text-white px-4 py-2 rounded shadow-md"
                >
                  Refrescar
                </button>
              </div>
              <TablaUsuarios usuarios={usuarios} loading={loading} />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <FormModal onClose={closeModal} onUserAdded={fetchUsuarios} />}
    </div>
  );
}
