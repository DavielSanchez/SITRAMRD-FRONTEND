import { useState } from "react";
import Toast from "../components/Auth/Toast";
//import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
        toast.error(`Ingresa un correo electronico`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            });
      return;
    }

    setLoading(true);
    try {

      // Hacer la solicitud al backend
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Se ha enviado un correo para restablecer tu contraseña`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          setTimeout(() => {
            navigate(`/send-otp?correo=${encodeURIComponent(email)}`); // Pasar el correo como parámetro en la URL
          }, 3000);
      } else {
        toast.error(data.message || "Ocurrió un error. Por favor, inténtalo de nuevo", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        
      }
    } catch (error) {
        toast.error(`Ocurrió un error. Por favor, inténtalo de nuevo más tarde`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white overflow-hidden">
      <div className="w-full max-w-lg px-6 py-12 bg-[#eff3fe] rounded-[20px] flex flex-col justify-center items-center gap-6">
        <h2 className="text-center text-[#211f47] text-3xl sm:text-4xl font-semibold">
          Recuperar contraseña
        </h2>
        <p className="text-center text-black text-lg sm:text-xl font-semibold">
          Por favor, ingresa tu correo electrónico
        </p>
        <div className="w-full relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico..."
            className="w-full h-12 sm:h-[77px] bg-white rounded-[10px] border-2 border-[#6a62dc] px-4 text-lg sm:text-2xl font-semibold text-[#38357a] focus:outline-none"
          />
        </div>
        <button
          onClick={handleForgotPassword}
          className="w-full h-12 sm:h-[60.40px] bg-[#6a62dc] rounded-[10px] text-white text-lg sm:text-2xl font-semibold"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar correo"}
        </button>
        </div>
      <Toast/>
    </div>
  );
}