import React from 'react';

function StatCard({ title, value, percentage, className = "" }) {
  return (
    <div className={`w-[85%] mx-auto bg-[#f1f1ff] rounded-2xl shadow-md p-4 flex flex-col justify-center ${className}`}>
      <h2 className="text-[#6A62DC] text-xl font-bold">{title}</h2>
      <div className="mt-2 text-[#FF5353] text-2xl">{value}</div>
      {percentage !== undefined && (
        <div className="mt-1 text-lg flex justify-between">
          <span className={percentage > 0 ? "text-green-500" : "text-red-500"}>
            {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
          </span>
        </div>
      )}
    </div>
  );
}

export default StatCard;
