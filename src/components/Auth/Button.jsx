import React from "react";

function Button({ placeholder, onChange, icon, onClick }) {
  return (
    <button
      onChange={onChange}
      onClick={onClick}
      className="bg-[#FF5353] rounded-md text-white h-10 w-32 lg:h-14 lg:w-40 transition duration-500 mx-auto font-bold relative flex items-center justify-center hover:scale-110 cursor-pointer"
    >
      {/* Icono posicionado al borde izquierdo con left-0 */}
      {icon && (
        <img
          src={icon}
          alt="Icon"
          className="w-6 h-6 absolute left-0 lg:ml-5 ml-3"
        />
      )}
      {placeholder}
    </button>
  );
}

export default Button;
