import React, { useState, useEffect } from "react";

const Estadisticas = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/auth/users`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setActiveUsers(data.filter(user => user.estadoUsuario === "activo").length);
        setInactiveUsers(data.filter(user => user.estadoUsuario !== "activo").length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="w-[85%] mx-auto bg-[#f1f1ff] rounded-2xl p-4 flex flex-col justify-center">
        <div className="text-[#6A62DC] text-2xl font-bold">Usuarios Activos</div>
        <div className="text-[#FF5353] text-3xl">{activeUsers}</div>
      </div>
      <div className="w-[85%] mx-auto bg-[#f1f1ff] rounded-2xl p-4 flex flex-col justify-center">
        <div className="text-[#6A62DC] text-2xl font-bold">Usuarios Inactivos</div>
        <div className="text-[#FF5353] text-3xl">{inactiveUsers}</div>
      </div>
      <div className="w-[85%] mx-auto bg-[#f1f1ff] rounded-2xl p-4 flex flex-col justify-center">
        <div className="text-[#6A62DC] text-2xl font-bold">Usuarios Activos</div>
        <div className="text-[#FF5353] text-3xl">{activeUsers}</div>
      </div>
    </div>
  );
};

export default Estadisticas;
