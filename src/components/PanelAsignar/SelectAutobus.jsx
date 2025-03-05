import React from "react";

function SelectAutobus() {
  return (
    <div className="w-[477px] h-[89px] bg-[#eff3fe] rounded-[5px] flex flex-col justify-center px-4 relative">
      <label className="text-[#211f47] text-2xl font-semibold font-['Inter'] mb-2">
        Seleccione un autobús
      </label>
      <select className="w-full h-[40px] bg-white border border-gray-300 rounded-md px-2 text-black">
        <option value="">-- Seleccionar --</option>
        <option value="autobus1">Autobús 1</option>
        <option value="autobus2">Autobús 2</option>
        <option value="autobus3">Autobús 3</option>
      </select>
      <div data-svg-wrapper className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          
        </svg>
      </div>
    </div>
  );
}

export default SelectAutobus;