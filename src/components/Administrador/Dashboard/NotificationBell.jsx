import React from 'react';

function NotificationBell() {
  return (
    <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full">
      <div className="absolute top-0 right-0 w-5 h-5 bg-[#FF5353] rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-medium">3</span>
      </div>
      <svg width="22" height="19" viewBox="0 0 36 31" fill="#6A62DC">
        <path d="M5.14286 12.9167C5.14286 5.783 10.8992 0 18 0C25.1007 0 30.8571 5.783 30.8571 12.9167V20.6667L36 25.8333V31H0V25.8333L5.14286 20.6667V12.9167Z" />
      </svg>
    </div>
  );
}

export default NotificationBell;
