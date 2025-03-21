import React from "react";

const FormModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl border border-[#6A62DC] w-11/12 md:w-1/2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-[#6A62DC]">Nombre</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-black"
              placeholder="Nombre"
            />
          </div>
          <div>
            <label className="text-[#6A62DC]">Apellidos</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-black"
              placeholder="Apellidos"
            />
          </div>
          <div>
            <label className="text-[#6A62DC]">Rol</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-black"
              placeholder="Rol"
            />
          </div>
          <div>
            <label className="text-[#6A62DC]">Correo</label>
            <input
              type="email"
              className="w-full p-2 border rounded text-black"
              placeholder="Correo"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="bg-[#6A62DC] text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Guardar
          </button>
          <button
            className="bg-[#FF5353] text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
