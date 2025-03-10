import React, { useState } from "react";
import {
  Visibility as EyeIcon,
  LockOpen as LockIcon,
  Delete as TrashIcon,
  CreditCard as CardIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ModalAñadirTarjeta from "./ModalAñadirTarjeta";

const MisTarjetas = () => {
  // Estado para manejar la visibilidad del modal
  const [openModal, setOpenModal] = useState(false);

  // Datos hardcodeados de las tarjetas
  const tarjetas = [
    { id: 1, numero: "**** **** **** 1234", titular: "Juan Pérez" },
    { id: 2, numero: "**** **** **** 5678", titular: "María López" },
  ];

  // Función para abrir el modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-10">
        {/* Título "Mis Tarjetas" más grande y en negrita */}
        <h2 className="text-black text-3xl font-bold font-['Inter'] mr-10">
          Mis Tarjetas
        </h2>

        {/* Botón con solo el icono */}
        <button
          className="w-8 h-8 flex items-center justify-center bg-[#6a62dc] rounded-full text-white hover:bg-[#5a52c2] transition"
          onClick={handleOpenModal}
        >
          <AddIcon className="w-5 h-5" />
        </button>

        {/* Texto separado del botón de agregar tarjeta */}
        <p className="text-black text-lg font-medium">Ó</p>

        {/* Botón para agregar tarjetas con estilos personalizados */}
        <button
          className="p-2 bg-[#6a62dc] rounded-[5px] flex items-center justify-center text-white hover:bg-[#5a52c2] transition"
          onClick={handleOpenModal}
        >
          <AddIcon className="w-4 h-4 mr-1" />
          Agregar Tarjeta
        </button>
      </div>

      {/* Lista de tarjetas */}
      <div className="space-y-4">
        {tarjetas.map((tarjeta) => (
          <div
            key={tarjeta.id}
            className="flex justify-between items-center bg-white text-black border border-[#6A62DC] rounded-2xl p-5 shadow-lg transition-all hover:bg-[#6A62DC] hover:text-white cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {/* Icono de tarjeta antes del nombre */}
              <CardIcon className="w-6 h-6 text-[#6A62DC] hover:text-white transition" />
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{tarjeta.titular}</span>
                <span className="text-gray-600 hover:text-white">
                  {tarjeta.numero}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              {/* Icono de Ver */}
              <EyeIcon
                className="w-6 h-6 text-[#6A62DC] hover:text-white transition"
                titleAccess="Ver"
              />

              {/* Icono de Bloquear */}
              <LockIcon
                className="w-6 h-6 text-[#6A62DC] hover:text-white transition"
                titleAccess="Bloquear"
              />

              {/* Icono de Eliminar */}
              <TrashIcon
                className="w-6 h-6 text-[#6A62DC] hover:text-white transition"
                titleAccess="Eliminar"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar tarjeta */}
      <ModalAñadirTarjeta open={openModal} onClose={handleCloseModal} />
    </div>
  );
};

export default MisTarjetas;
