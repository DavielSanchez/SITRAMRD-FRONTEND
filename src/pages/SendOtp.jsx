import { useState, useEffect } from 'react';
import { OtpInput } from 'reactjs-otp-input';
import { useLocation } from "react-router-dom";
import Toast from "../components/Auth/Toast";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import { useBG } from "../ColorClass";

function SendOtp() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("correo");
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [theme, setTheme] = useState('');

    const bgColor = useBG(theme);

    useEffect(() => {
        if (token) {
          const decodedToken = jwtDecode(token);
          const usertheme = decodedToken.theme;
          if (usertheme !== theme) {
            setTheme(usertheme);
          }
        } else {
          if (theme !== "white") {
            setTheme("white");
          }
        }
      }, [token, theme]); 

    const handleChange = (otp) => setOtp(otp);

    const handleSubmit = async () => {
        if (otp.length <= 5) {
            toast.error(`El codigo esta incompleto`, {
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

        try{
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/auth/confirm-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    correo: email,
                    otpCode: otp
                })
            })
            const data = await response.json();

            if (response.ok) {
                navigate(`/reset?correo=${encodeURIComponent(email)}`);
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

        } catch {
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
    }

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 ${bgColor} overflow-hidden`}>
            <div className={`w-full max-w-lg px-6 py-12 ${theme === 'dark' ? 'bg-[var(--bg-dark)] border-[var(--primary-orange-color)]' : 'bg-[var(--bg-light)] border-[var(--primary-purple-color)]'} border-2 rounded-[20px] flex flex-col justify-center items-center gap-6`}>
                <h2 className={`text-center ${theme === 'dark' ? 'text-[var(--color-dark)]' : 'text-[var(--primary-purple-color)]'} text-3xl sm:text-4xl font-semibold`}>
                    Introduce el código
                </h2>
                <p className={`text-center ${theme === 'dark' ? 'text-[var(--color-dark)]' : 'text-black'} text-lg sm:text-xl font-semibold`}>
                    Hemos enviado un código a tu correo.
                </p>
                <div id="otp-container">
                    <OtpInput 
                        value={otp} 
                        onChange={handleChange} 
                        numInputs={6} 
                        className={`${theme === 'dark' ? 'text-[var(--primary-orange-color)] border-[var(--primary-orange-color)]' : 'text-[var(--primary-purple-color)] border-[var(--primary-purple-color)]'} bg-center text-4xl justify-center border-3 w-12 h-18 mx-2 rounded-lg m-1 outline-none appearance-none`}
                    />
                </div>
                <button
                    className={`${theme === 'dark' ? 'bg-[var(--primary-orange-color)]' : 'bg-[var(--primary-purple-color)]'} w-45 h-12 sm:h-[60.40px] rounded-[10px] text-[var(--color-dark)] text-lg sm:text-2xl font-semibold`}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Enviando..." : "Enviar"}
                </button>
            </div>
            <Toast/>
        </div>
    );
}

export default SendOtp;
