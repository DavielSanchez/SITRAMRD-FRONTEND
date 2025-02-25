import { useState } from 'react'
import { toast } from 'react-toastify';
import Toast from "../components/Auth/Toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("correo");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        contraseña: "",
        confirmContraseña: "",
      });
    const url = `${import.meta.env.VITE_API_LINK}/auth/users/password/change`;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
      };
    
    const data = {
        correo: email,
        contraseña: formData.contraseña
    }

    const handleSubmit = async () => {

        if (!formData.contraseña || !formData.confirmContraseña) {
            toast.error(`Ambos campos son requeridos`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
              return;
        }if (formData.contraseña !== formData.confirmContraseña) {
            toast.error(`Las contraseñas no coinciden`, {
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

        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
    
          if (!response.ok) {

            const errorData = await response.json();
                    toast.error(`${errorData.message}`, {
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
          toast.success('Contraseña actualizada correctamente', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
          })
          setTimeout(() => {
            navigate(`/login`); // Pasar el correo como parámetro en la URL
          }, 3000);
    
        } catch (error) {
          console.error("Error:", error);
          console.log(error)
          toast.error(`Verifica tu conexión y vuelve a intentarlo`, {
              position: "bottom-center",
              autoClose: 4000,
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
    <>
        <div className="min-h-screen flex items-center justify-center px-4 bg-white overflow-hidden">
      <div className="w-full max-w-lg px-6 py-12 bg-[#eff3fe] rounded-[20px] flex flex-col justify-center items-center gap-6">
        <h2 className="text-center text-[#211f47] text-3xl sm:text-4xl font-semibold">
          Reset your password
        </h2>
        <p className="text-center text-black text-lg sm:text-xl font-semibold">
          Enter a new password below
        </p>
        <div className="w-full relative">
            <input
                type="password"
                id="contraseña"
                className="w-full h-12 sm:h-[77px] bg-white rounded-[10px] border-2 border-[#6a62dc] px-4 text-lg sm:text-2xl font-semibold text-[#38357a] focus:outline-none"
                value={formData.contraseña} 
                placeholder='New password'
                onChange={handleChange}
                required
            />
        </div>
        <div className="w-full relative">
            <input
                type="password"
                id="confirmContraseña"
                className="w-full h-12 sm:h-[77px] bg-white rounded-[10px] border-2 border-[#6a62dc] px-4 text-lg sm:text-2xl font-semibold text-[#38357a] focus:outline-none"
                value={formData.confirmContraseña} 
                placeholder='New password'
                onChange={handleChange}
                required
            />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full h-12 sm:h-[60.40px] bg-[#6a62dc] rounded-[10px] text-white text-lg sm:text-2xl font-semibold"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        
      </div>
      <Toast/>
    </div>
    </>
  )
}

export default ResetPassword