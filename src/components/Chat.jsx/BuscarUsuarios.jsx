import { useState, useEffect } from "react";

function BuscarUsuarios({ onSeleccionarUsuario }) {
    const [nombre, setNombre] = useState("");
    const [resultados, setResultados] = useState([]);
  
    const handleBuscarUsuarios = async () => {
      if (!nombre) {
        setResultados([]); // Si no hay nombre, oculta la lista
        return;
      }
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/auth/users/nombre/${nombre}`);
        const data = await response.json();
        setResultados(data);
      } catch (error) {
        console.error("Error al buscar usuarios:", error);
      }
    };
  
    useEffect(() => {
      handleBuscarUsuarios();
    }, [nombre]);
  
    return (
      <div>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Buscar usuarios por nombre"
        />
  
        <div>
          {resultados.length > 0 && (
            resultados.map((usuario) => (
              <div
                key={usuario._id}
                className="w-[263px] h-8 relative mb-2 cursor-pointer"
                onClick={() => {
                  onSeleccionarUsuario(usuario);
                  setResultados([]); // 🔥 Oculta la lista después de seleccionar
                  setNombre(""); // 🔥 Limpia el input de búsqueda
                }}
              >
                <div className="w-[30px] h-[30px] left-0 top-0 absolute justify-center items-center inline-flex">
                  <img className="w-[30px] h-[30px] rounded-2xl" src={usuario.userImage} alt="user avatar" />
                </div>
                <div className="left-[50px] top-0 absolute text-[#6a62dc] text-[15px] font-semibold font-['Inter']">
                  {usuario.nombre}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
  
  export default BuscarUsuarios;
  
