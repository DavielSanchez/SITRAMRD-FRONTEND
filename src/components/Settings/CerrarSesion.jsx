import { useNavigate } from "react-router-dom";
import { useBG, usePrimaryColors } from "../../ColorClass";

export default function CerrarSesion({ onClose, theme }) {
  const navigate = useNavigate();
  const buttonColor = useBG(theme);
  const primaryText = usePrimaryColors(theme);
  const handleConfirm = () => {
    
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center backdrop-blur-md ${
        theme === "dark" ? "bg-black/50" : "bg-black/30"
      } z-50 min-h-screen px-4`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-xs sm:max-w-sm md:max-w-md p-6 rounded-lg border-2 shadow-xl ${
          theme === "dark"
            ? "bg-[#1E1E1E] text-[var(--color-dark)] border-[var(--primary-orange-color)]"
            : "bg-white text-black border-[var(--primary-purple-color)]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-lg font-semibold mb-4 text-center ${
            primaryText
          }`}
        >
          Cerrar Sesión
        </h2>
        <p className="text-center mb-4">
          ¿Seguro que deseas cerrar sesión?
        </p>
        <div className="flex justify-center gap-2">
          <button
            className={`px-4 py-2 rounded text-[var(--color-dark)] ${
              buttonColor
            }`}
            onClick={onClose}
          >
            No
          </button>
          <button
            className={`px-4 py-2 rounded text-[var(--color-dark)] ${
              buttonColor
            }`}
            onClick={handleConfirm}
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
}
