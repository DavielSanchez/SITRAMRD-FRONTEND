
import Button from "../components/Auth/Button";
import { useState, useEffect } from "react";
import background from "../assets/Auth/Q1A9065.png";
import arrow from "../assets/Auth/flecha-derecha.png";
import Toast from "../components/Auth/Toast";
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode'
import PersonIcon from '@mui/icons-material/Person';

function Auth() {
  const Lasttoken = localStorage.getItem('token');
  const [theme, setTheme] = useState('');
  useEffect(() => {
    if (Lasttoken) {
      const decodedToken = jwtDecode(Lasttoken);
      const usertheme = decodedToken.theme;
      if (usertheme !== theme) {
        setTheme(usertheme);
      }
    } else {
      if (theme !== "white") {
        setTheme("white");
      }
    }
  }, [Lasttoken, theme]); 
  
  const [showToast, setShowToast] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const url = `${import.meta.env.VITE_API_LINK}/auth/login`

  function getIconColor(variant, theme) {
    if (theme === "dark") {
      if (variant === "chevronRight") return "white";
      return "#ff5353";
    } else {
      if (variant === "chevron") return "black";
      if (variant === "chevronRight") return "black";
      if (variant === "gray") return "gray";
      return "#6a62dc";
    }
  }

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
            // 'Authorization': `Bearer ${token}`
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
      <div className={`w-full lg:w-[45%] ${ theme === 'dark' ? 'bg-[var(--bg-dark)]' : 'bg-[var(--bg-light)]' } flex justify-center items-center transition-all duration-1000 ease-in-out`}>
        <div className="text-center">
          <PersonIcon sx={{ color: getIconColor("black", theme), fontSize: 200 }}/>
          {/* <img src={usuario} alt="" className="mx-auto size-10" /> */}
          <h3 className={`${ theme === 'dark' ? 'text-[var(--color-dark)]' : 'text-[var(--color-light)]' } my-7 font-semibold tracking-widest`}>Bienvenido a SITRAMRD!</h3>
          {/* Formulario */}
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-8 mt-5 mb-10">
            <input 
              type='email' 
              name="fake-email-field"
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              autoComplete="off"
              className={`p-2 border-b-1 w-xs lg:w-md font-semibold tracking-widest text-sm duration-1000 ease-in-out ${ theme === 'dark' ? 'text-[var(--color-dark)]' : 'text-[var(--color-light)]' } placeholder-[var(--color-gray)] `}
              placeholder='Correo'
              style={{
                color: theme === 'dark' ? 'white' : 'black',
                WebkitTextFillColor: theme === 'dark' ? 'white' : 'black',
                transition: 'background-color 9999s ease-in-out 0s'
              }}
            />
            <input 
              type='password' 
              name="fake-password-field"
              value={contraseña} 
              onChange={(e) => setContraseña(e.target.value)} 
              autoComplete="new-email"
              className={`p-2 border-b-1 w-xs lg:w-md font-semibold tracking-widest text-sm duration-1000 ease-in-out ${ theme === 'dark' ? 'text-[var(--color-dark)]' : 'text-black' } placeholder-gray-500`}
              placeholder='Contraseña'
              style={{
                color: theme === 'dark' ? 'white' : 'black',
                WebkitTextFillColor: theme === 'dark' ? 'white' : 'black',
              }}
            />
            </div>
            <Button placeholder="Entra" type="submit" icon={arrow} theme={theme} />
          </form>
          <p className={`${ theme === 'dark' ? 'text-[var(--color-dark)]' : 'text-black' } mt-7 font-semibold`}>
            Aun no tienes cuenta?{" "}
            <a
              href="/register"
              className={`${ theme === 'dark' ? 'text-[#ff5353]' : 'text-[#6a62dc]' } border-b-1 border-transparent hover:border-[#6A62DC] duration-300 ease-in-out`}
            >
              Registrate
            </a>
          </p>
          <p className={`${ theme === 'dark' ? 'text-[var(--color-dark)]' : 'text-black' } mt-7 font-semibold`}>
            Olvidaste la contraseña?{" "}
            <a
              href="/forgot"
              className={`${ theme === 'dark' ? 'text-[#ff5353]' : 'text-[#6a62dc]' } border-b-1 border-transparent hover:border-[#6A62DC] duration-300 ease-in-out`}
            >
              Cambiar
            </a>
          </p>
        </div>
      </div>

      {/* Lado derecho */}
      <div className={`w-0 lg:w-[55%] ${ theme === 'dark' ? 'bg-black' : 'bg-white' } transition-all duration-1000 ease-in-out`}>
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
