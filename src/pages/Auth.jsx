import Input from "../components/Auth/Input";
import Button from "../components/Auth/Button";
import { useState } from "react";
import background from "../assets/Auth/Q1A9065.png";
import arrow from "../assets/Auth/flecha-derecha.png";
import usuario from "../assets/Auth/usuario.png";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'


function Auth() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const showErrorToast = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  };

  const showSuccessToast = () => {
    let timerInterval;
    Swal.fire({
      title: "Login Succeed!",
      html: "You will be redirected to home page",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  // Validaciones
  const validateSignIn = () => {
    if (!correo.trim().length) {
      showErrorToast("El campo de email está vacío.");
      return false;
    }
    if (!contraseña.trim().length) {
      showErrorToast("El campo de password está vacío.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateSignIn()) {
      try {
        const response = await axios.post(import.meta.env.VITE_SERVER_API_URL, {
          correo,
          contraseña,
        });

        if (response.status !== 401) {
          const token = response.data.token;
          // Aqui guardo el token
          localStorage.setItem('token', token);
          showSuccessToast();
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          showErrorToast("Email o Password Incorrectos");
        } else {
          showErrorToast("Error en el servidor. Intenta más tarde.");
        }
      }
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Lado izquierdo */}
      <div className="w-full lg:w-[45%] bg-white flex justify-center items-center transition-all duration-1000 ease-in-out">
        <div className="text-center">
          <img src={usuario} alt="" className="mx-auto size-10" />
          <h3 className="text-black my-7 font-semibold tracking-widest">
            Welcome to SITRAMrd!
          </h3>
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
              href="#"
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
    </div>
  );
}

export default Auth;
