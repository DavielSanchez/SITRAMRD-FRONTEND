import Button from "../components/Auth/Button";
import { useState } from "react";
import background from "../assets/Auth/Q1A9065.png";
import arrow from "../assets/Auth/flecha-derecha.png";
import Toast from "../components/Auth/Toast";
import usuario from "../assets/Auth/usuario.png"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { jwtDecode } from 'jwt-decode'
import PersonIcon from '@mui/icons-material/Person';


function RegisterAuth() {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const usertheme = decodedToken.theme;
  const [theme, setTheme] = useState(usertheme);
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

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

    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
      });

    const url = `${import.meta.env.VITE_API_LINK}/auth/users/add`

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        // console.log(formData)
      };

    const data = {
        nombre: formData.nombre,
        correo: formData.correo,
        contraseña: formData.contraseña,
      }

    // Validaciones
    const validateSignIn = () => {
        if (!formData.nombre.trim().length) {
            toast.error(`El campo de nombre está vacío`, {
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
        if (!formData.correo.trim().length) {
            toast.error(`El campo de correo está vacío`, {
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
        if (!formData.contraseña.trim().length) {
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
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(formData)
        if (validateSignIn()) {
            try {

                const response = await fetch(url, {
                    method: 'POST',
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

                const userData = await response.json();
    
                if (userData.token) {
                    MySwal.fire({
                        icon: "success",
                        title: "Muy bien!",
                        text: "Te has registrado correctamente",
                        timer: 1000,
                        showConfirmButton: false,
                        allowOutsideClick: false, 
                        didOpen: () => {
                          setTimeout(() => {
                            localStorage.setItem("token", userData.token);
                            navigate('/');
                          }, 3000);
                        }
                      });
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

                // // Ocultar el Toast después de 3 segundos
                setTimeout(() => setShowToast(false), 3000);
            } catch (error) {
                console.log(error)
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
            <div className={`w-full lg:w-[45%] ${ theme === 'dark' ? 'bg-black' : 'bg-white'} flex justify-center items-center transition-all duration-1000 ease-in-out`}>
                <div className="text-center">
                <PersonIcon sx={{ color: getIconColor("black", theme), fontSize: 200 }}/>
                    <h3 className={`${theme === 'dark' ? 'text-white' : 'text-black'} my-7 font-semibold tracking-widest`}>Welcome to SITRAMrd!</h3>
                    {/* Formulario */}
                    <form onSubmit={handleRegister}>
    <div className="flex flex-col gap-8 mt-5 mb-10">
        <input 
            type='text' 
            id='nombre'
            value={formData.nombre} 
            onChange={handleChange} 
            className={`${theme === 'dark' ? 'text-white' : 'text-black'} p-2 border-b w-xs lg:w-md font-semibold tracking-widest text-sm outline-none bg-transparent duration-1000 ease-in-out`}
            placeholder='Nombre'
        />

        <input 
            type='email' 
            id='correo'
            value={formData.correo} 
            onChange={handleChange} 
            className={`${theme === 'dark' ? 'text-white border-gray-500' : 'text-black border-gray-300'} p-2 border-b w-xs lg:w-md font-semibold tracking-widest text-sm outline-none bg-transparent duration-1000 ease-in-out`}
            placeholder='Correo'
        />

        <input 
            type='password' 
            id='contraseña'
            value={formData.contraseña} 
            onChange={handleChange} 
            className={`${theme === 'dark' ? 'text-white border-gray-500' : 'text-black border-gray-300'} p-2 border-b w-xs lg:w-md font-semibold tracking-widest text-sm outline-none bg-transparent duration-1000 ease-in-out`}                            
            placeholder='Contraseña'
        />
    </div>
    <Button placeholder="Register" type="submit" icon={arrow} />
</form>

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

export default RegisterAuth;
