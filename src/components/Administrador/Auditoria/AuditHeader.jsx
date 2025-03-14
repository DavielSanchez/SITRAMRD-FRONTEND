import React from 'react';

function AuditHeader() {
  return (
    <div className="w-90% h-[80px] bg-white shadow-md flex items-center px-5">
      <h1 className="text-[#6a62dc] text-3xl font-semibold">
        Auditoría del Sistema
      </h1>
      <div className="absolute right-8 flex items-center">
        <div className="relative">
          <svg
            width="30"
            height="25"
            viewBox="0 0 37 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.15476 12.8869C5.15476 5.76967 10.9244 0 18.0417 0C25.1588 0 30.9286 5.76967 30.9286 12.8869V20.619L36.0833 25.7738V30.9286H0V25.7738L5.15476 20.619V12.8869Z"
              fill="#6A62DC"
            />
          </svg>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff5353] rounded-full flex items-center justify-center text-white text-xs">
            3
          </div>
        </div>
        <img
          className="w-10 h-10 rounded-full ml-4"
          src="https://placehold.co/47x47"
          alt="User avatar"
        />
      </div>
    </div>
  );
}

export default AuditHeader;
