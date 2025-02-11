import { useState } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleReset = () => {
    if (newPassword === "" || confirmPassword === "") {
      setError("Los campos no pueden estar vacíos.");
      return;
    }
    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    alert("Contraseña restablecida con éxito.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col items-center gap-6">
        <h1 className="text-center text-[#211f47] text-2xl md:text-3xl font-semibold">
          Reset your password
        </h1>

        {/* Campo: Nueva contraseña */}
        <div className="relative w-full">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="w-full h-12 md:h-14 bg-gray-100 rounded-lg border-2 border-[#6a62dc] px-4 text-lg md:text-xl text-gray-700 outline-none"
          />
          <button
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            {showNewPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        </div>

        {/* Campo: Confirmar contraseña */}
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full h-12 md:h-14 bg-gray-100 rounded-lg border-2 border-[#6a62dc] px-4 text-lg md:text-xl text-gray-700 outline-none"
          />
          <button
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        </div>

        {/* Mensaje de error */}
        {error && <p className="text-red-500 text-sm md:text-lg">{error}</p>}

        {/* Botón de restablecer */}
        <button
          onClick={handleReset}
          className="w-full h-12 md:h-14 bg-[#6a62dc] text-white text-lg md:text-xl font-semibold rounded-lg hover:bg-[#5a52c9] transition duration-200"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

// Icono de ojo abierto
function EyeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 7C23 7 28 10.3333 32 17C28 23.6667 23 27 17 27C11 27 6 23.6667 2 17C6 10.3333 11 7 17 7ZM17 23C19.7614 23 22 20.7614 22 18C22 15.2386 19.7614 13 17 13C14.2386 13 12 15.2386 12 18C12 20.7614 14.2386 23 17 23Z"
        stroke="#6E70E6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Icono de ojo tachado
function EyeSlashIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6418 14.6451C14.0167 15.2703 13.6657 16.1182 13.6659 17.0023C13.666 17.8864 14.0174 18.7342 14.6426 19.3592C15.2679 19.9843 16.1158 20.3353 16.9999 20.3351C17.8839 20.335 18.7317 19.9836 19.3568 19.3584M24.8017 24.7884C22.4637 26.2511 19.7578 27.0182 17 27.0001C11 27.0001 6 23.6667 2 17.0001C4.12 13.4667 6.52 10.8701 9.2 9.21005M13.9667 7.30005C14.9651 7.09793 15.9814 6.99742 17 7.00005C23 7.00005 28 10.3334 32 17.0001C30.89 18.8501 29.7017 20.4451 28.4367 21.7834M2 2L32 32"
        stroke="#6E70E6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
