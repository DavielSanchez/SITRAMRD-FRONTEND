import React, { useState } from "react";

function ModalRegistrar({ isOpen, onClose, onIncidenciaAdded }) {
  const [autobus, setAutobus] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // ID de usuario fijo (a modo de ejemplo)
  const userId = "67c383e4f9f60ee1eec5a463";

  // Endpoint de la API
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_LINK}/incidencia/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idAutoBus: autobus,
          descripcion,
          idUsuario: userId,
        }),
      });

      if (response.ok) {
        // Notifica al padre para refrescar la tabla, si así lo deseas
        if (onIncidenciaAdded) onIncidenciaAdded();

        // Limpia los campos
        setAutobus("");
        setDescripcion("");

        // Cierra el modal
        onClose();
      } else {
        console.error("Error al registrar la incidencia");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  // Si el modal está cerrado, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 
        flex items-center justify-center 
        z-50
        bg-transparent
      "
    >
      {/* Contenedor del contenido del modal */}
      <div className="bg-white rounded-md p-8 shadow-lg min-w-[300px] max-w-sm">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campo Autobus */}
          <input
            type="text"
            placeholder="Autobus"
            value={autobus}
            onChange={(e) => setAutobus(e.target.value)}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-2 text-black"
          />

          {/* Campo Descripción*/}
          <textarea
            placeholder="Descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full h-[100px] bg-[#eff3fe] rounded-[5px] p-2 text-black"
          />

          {/* Botón Registrar */}
          <button
            type="submit"
            className="bg-[#6a62dc] text-white rounded-md py-2 mt-2"
          >
            Registrar
          </button>
        </form>

        {/* Opcional: Botón para cerrar manualmente */}
        <button
          onClick={onClose}
          className="mt-2 text-sm text-gray-500 hover:underline"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ModalRegistrar;
