import React, { useState } from 'react';
import { OtpInput } from 'reactjs-otp-input';
import { useLocation } from "react-router-dom";
import Toast from "../components/Auth/Toast";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function SendOtp() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("correo");
    const navigate = useNavigate();

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
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/confirm-otp`, {
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
        <div className="min-h-screen flex items-center justify-center px-4 bg-white overflow-hidden">
            <div className="w-full max-w-lg px-6 py-12 bg-[#eff3fe] rounded-[20px] flex flex-col justify-center items-center gap-6">
                <h2 className="text-center text-[#6A62DC] text-3xl sm:text-4xl font-semibold">
                    Introduce el código
                </h2>
                <p className="text-center text-black text-lg sm:text-xl font-semibold">
                    Hemos enviado un código a tu correo.
                </p>
                <OtpInput 
                value={otp} 
                onChange={handleChange} 
                numInputs={6} 
                className='text-[#6A62DC] bg-center text-4xl text-center justify-items-center border-3 w-12 h-18 rounded-lg m-1 border-[#8c84ff]'
                // separator={<span className='text-white text-center' >-</span>} 
                />;
                <button
                className="w-45 h-12 sm:h-[60.40px] bg-[#6a62dc] rounded-[10px] text-white text-lg sm:text-2xl font-semibold"
                onClick={handleSubmit}
        >Enviar
        </button>
            </div>
            <Toast/>
        </div>
    );
}

export default SendOtp;