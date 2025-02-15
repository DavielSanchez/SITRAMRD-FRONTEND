import { useEffect } from "react";

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white shadow-lg transition-all duration-500 ${
        isVisible ? "bg-black opacity-90" : "opacity-0 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
