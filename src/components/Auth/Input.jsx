// Boton reutilizable para el login y register
import React from 'react';

function Input({ PlHolder, type, value, onChange }) {
  return (
    <input type={type} value={value} onChange={onChange} className='text-black p-2 border-b-1 w-xs lg:w-md font-semibold tracking-widest text-sm outline-none duration-1000 ease-in-out' placeholder={PlHolder}></input>
  );
}

export default Input;
