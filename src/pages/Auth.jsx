import Input from "../components/Auth/Input";
import Button from "../components/Auth/Button";
import { useState } from "react";
import background from "../assets/Auth/Q1A9065.png";
import arrow from "../assets/Auth/flecha-derecha.png";
import Toast from "../components/Auth/Toast";
import usuario from "../assets/Auth/usuario.png"
import { toast } from 'react-toastify';

function Auth() {
  
  const [showToast, setShowToast] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const url = `${import.meta.env.VITE_API_LINK}/login`

  // // Validaciones
  const validateSignIn = () => {
    if (!correo.trim().length) {
      toast.error(`El campo de email está vacío`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return false;
    }
    if (!contraseña.trim().length) {
      toast.error(`El campo de contraseña está vacío`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return false;
    }
    return true;
  };

  // Estado de llamado al login junto con las verificaciones
  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateSignIn()) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo, contraseña }),
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
    
        const data = await response.json();
    
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = '/';
        } else {
          toast.error(`Error al iniciar sesión`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
        // setToastMessage("Redireccionando A Home... ");
        // setShowToast(true);

        setTimeout(() => setShowToast(false), 3000);
      } catch (error) {

        toast.error(`Verifica tu conexión y vuelve a intentarlo`, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Lado izquierdo */}
      <div className="w-full lg:w-[45%] bg-white flex justify-center items-center transition-all duration-1000 ease-in-out">
        <div className="text-center">
          <img src={usuario} alt="" className="mx-auto size-10" />
          <h3 className="text-black my-7 font-semibold tracking-widest">Welcome to SITRAMrd!</h3>
          {/* Formulario */}
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-8 mt-5 mb-10">
              <Input
                valor={correo}
                type="email"
                PlHolder="Email"
                onChange={(e) => setCorreo(e.target.value)}
              />
              <Input
                valor={contraseña}
                type="password"
                PlHolder="Password"
                onChange={(e) => setContraseña(e.target.value)}
              />
            </div>
            <Button placeholder="Login" type="submit" icon={arrow} />
          </form>
          <p className="text-black mt-7 font-semibold">
            Forgot Password?{" "}
            <a
              href="/forgot"
              className="text-[#FF5353] border-b-1 border-transparent hover:border-[#FF5353] duration-300 ease-in-out"
            >
              Change Password
            </a>
          </p>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="w-0 lg:w-[55%] bg-black transition-all duration-1000 ease-in-out">
        <img
          src={background}
          alt="Background Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Toast de notificación */}
      <Toast/>
    </div>
  );
}

export default Auth;
