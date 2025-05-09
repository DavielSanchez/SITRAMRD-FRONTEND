import Button from "../components/Auth/Button";
import { useState, useEffect } from "react";
import background from "../assets/Auth/Q1A9065.png";
import arrow from "../assets/Auth/flecha-derecha.png";
import Toast from "../components/Auth/Toast";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { jwtDecode } from 'jwt-decode'
import PersonIcon from '@mui/icons-material/Person';
import '../../public/CSS/Auth.css'
import { useBG, useText, useColorsWithHover, useIconColor } from "../ColorClass";

function RegisterAuth() {
  const token = localStorage.getItem('token');
  const [theme, setTheme] = useState('light');
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();
  const [setShowToast] = useState(false);
  const bgColor = useBG(theme);
  const textColor = useText(theme);
  const primaryHover = useColorsWithHover(theme);
  const getIconColor = useIconColor(theme, 'black')


  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const usertheme = decodedToken.theme;
      if (usertheme !== theme) {
        setTheme('light');
      }
    } else {
      if (theme !== "light") {
        setTheme("light");
      }
    }
  }, [token, theme]); 

    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
        userImage: "https://res.cloudinary.com/dv4wfetu1/image/upload/v1740610245/avatar_qspfc1.svg",
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
        userImage: formData.userImage,
        userRole: 'Pasajero'
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
            <div className={`w-full lg:w-[45%] ${bgColor} flex justify-center items-center transition-all duration-1000 ease-in-out`}>
                <div className="text-center">
                <PersonIcon sx={{ color: getIconColor, fontSize: 200 }}/>
                    <h3 className={`${ textColor } my-7 font-semibold tracking-widest`}>Welcome to SITRAMrd!</h3>
                    {/* Formulario */}
                    <form onSubmit={handleRegister} autoComplete="off" className={theme === 'dark' ? 'dark' : ''}>
                      <div className="flex flex-col gap-8 mt-5 mb-10">
                          <input 
                              type="text"
                              id="nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                              className={` ${textColor} p-2 border-b border-gray-300 light:text-black dark:border-gray-600 w-xs lg:w-md font-semibold tracking-widest text-sm outline-none bg-transparent`}
                              placeholder="Nombre"
                              autoComplete="off"
                          />

                          <input 
                              type="email"
                              id="correo"
                              value={formData.correo}
                              onChange={handleChange}
                              className={`${textColor} p-2 border-b border-gray-300 dark:border-gray-600 w-xs lg:w-md font-semibold tracking-widest text-sm outline-none bg-transparent`}
                              placeholder="Correo"
                              autoComplete="off"
                          />

                          <input 
                              type="password"
                              id="contraseña"
                              value={formData.contraseña}
                              onChange={handleChange}
                              className={`${textColor} p-2 border-b border-gray-300 dark:border-gray-600 w-xs lg:w-md font-semibold tracking-widest text-sm outline-none bg-transparent`}
                              placeholder="Contraseña"
                              autoComplete="new-password"
                          />
                      </div>
                      <Button placeholder="Register" type="submit" icon={arrow} theme={theme} />
                  </form>
                    <p className={`${ textColor } mt-7 font-semibold`}>
                    Ya tienes una cuenta?{" "}
                    <a
                      href="/login"
                      className={`${ primaryHover } border-b-1 border-transparent duration-300 ease-in-out`}
                    >
                      Inicia sesion
                    </a>
                  </p>
                </div>
            </div>

            {/* Lado derecho */}
            <div className="w-0 lg:w-[55%] var(--bg-dark) transition-all duration-1000 ease-in-out">
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
