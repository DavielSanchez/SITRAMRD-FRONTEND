import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import ModalRecargarBalance from "./ModalRecargarBalance";
import ModalCambiarTarjeta from "./ModalCambiarTarjeta";

const MiSaldo = ({ nombre, numeroTarjeta, saldo, ultimaRecarga, ultimoViaje }) => {
  const [modalRecargarOpen, setModalRecargarOpen] = useState(false);
  const [modalCambiarTarjetaOpen, setModalCambiarTarjetaOpen] = useState(false);

  return (
    <div>
      <div className="bg-[var(--primary-purple-color)] text-white rounded-2xl p-4 shadow-md">
        <h2 className="text-lg font-semibold">{nombre}</h2>
        <p className="text-sm">**** **** **** {numeroTarjeta.slice(-4)}</p>
        <h3 className="text-2xl font-bold mt-2">RD$ {saldo.toFixed(2)}</h3>
        <p className="text-xs mt-1 opacity-80">Última recarga: {ultimaRecarga}</p>
        <p className="text-xs opacity-80">Último viaje: {ultimoViaje}</p>
      </div>

      <div className="flex gap-2 mt-4 items-center">
        {/* Botón de Recargar Balance */}
        <button
          className="w-[155px] h-9 bg-[#ff5353] rounded-[10px] text-white font-semibold"
          onClick={() => setModalRecargarOpen(true)}
        >
          Recargar Balance
        </button>

        {/* Botón de Cambiar Tarjeta */}
        <button
          className="w-[155px] h-9 bg-[#ff5353] rounded-[10px] text-white font-semibold"
          onClick={() => setModalCambiarTarjetaOpen(true)} // Abre el modal para cambiar tarjeta
        >
          Cambiar Tarjeta
        </button>

        {/* Icono de candado */}
        <LockIcon sx={{ color: "var(--primary-purple-color)", fontSize: 28 }} />
      </div>

      {/* Modal Recargar Balance */}
      <ModalRecargarBalance open={modalRecargarOpen} onClose={() => setModalRecargarOpen(false)} />

      {/* Modal Cambiar Tarjeta */}
      <ModalCambiarTarjeta open={modalCambiarTarjetaOpen} onClose={() => setModalCambiarTarjetaOpen(false)} />
    </div>
  );
};

export default MiSaldo;
