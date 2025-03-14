import { useState, useEffect, useRef } from "react";

function BuscarUsuarios({ onSeleccionarUsuario }) {
    const [nombre, setNombre] = useState("");
    const [resultados, setResultados] = useState([]);
    const resultadosRef = useRef(null); // Referencia al contenedor de la lista de resultados

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

    // Cerrar la lista de resultados cuando se hace clic fuera de ella
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resultadosRef.current && !resultadosRef.current.contains(event.target)) {
                setResultados([]); // Cerrar la lista si se hace clic fuera
            }
        };

        // Agregar el listener
        document.addEventListener("mousedown", handleClickOutside);

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Buscar usuarios"
                className="p-2 border border-gray-600 rounded w-full mb-4"
            />

            {/* Lista flotante de resultados */}
            {resultados.length > 0 && (
                <div
                    ref={resultadosRef} // Referencia al contenedor de resultados
                    className="absolute top-full left-0 mt-2 w-full max-h-60 overflow-y-auto bg-black border border-gray-300 rounded shadow-lg z-10"
                >
                    {resultados.map((usuario) => (
                        <div
                            key={usuario._id}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                                onSeleccionarUsuario(usuario);
                                setResultados([]); // Oculta la lista después de seleccionar
                                setNombre(""); // Limpia el input de búsqueda
                            }}
                        >
                            <div className="w-[30px] h-[30px] mr-3">
                                <img className="w-[30px] h-[30px] rounded-full" src={usuario.userImage} alt="user avatar" />
                            </div>
                            <div className="text-[#6a62dc] text-[15px] font-semibold">
                                {usuario.nombre}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BuscarUsuarios;
