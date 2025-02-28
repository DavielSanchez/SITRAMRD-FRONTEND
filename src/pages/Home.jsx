import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react';
import NavBar from "../components/NavBar";
import { useBG, useText } from "../ColorClass";


function Home() {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userName = decodedToken.nombre
  const usertheme = decodedToken.theme;
  const [theme, setTheme] = useState(usertheme);
  const bgColor = useBG(theme);
  const textColor = useText(theme);

  console.log(theme)
  console.log(decodedToken)

  const handleLogout = () => {
    MySwal.fire({
      icon: "warning",
      iconColor: "#6A62DC",
      title: "Cerrar Sesión",
      text: '¿Estas seguro que quieres cerrar la sesión?',
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#6A62DC",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#FF5353",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    });
  }

  return (
    <>
    <div className={`${ bgColor } flex justify-center items-center w-full min-h-screen`}>
      <div className={` ${ bgColor } w-[1440px] flex flex-col items-center text-center`}>
        <h1 className={` ${ theme === 'dark' ? 'bg-[var(--color-dark)]' : 'bg-[var(--color-light)]' }font-bold text-5xl mb-4`}>
          Bienvenidos a SITRAMRD {userName}!
        </h1>
        
        <p className={` ${ textColor } font-normal text-[28px] mb-10 mt-5`}>
          Sistema Integral de Transporte y Movilidad de la República Dominicana.
        </p>
  
  
        <div className="flex gap-4 mb-6">
          <a href="https://github.com/DavielSanchez/SITRAMRD-FRONTEND.git" className="bg-[var(--primary-purple-color)] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-[var(--color-dark)] text-base">
            Repositorio Front-End
          </a>
          
          <a href="https://github.com/DavielSanchez/SITRAMRD-BACKEND.git" className="bg-[var(--primary-orange-color)] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-[var(--color-dark)] text-base">
            Repositorio Back-End
          </a>
        </div>
        <h2 className={` ${ textColor } font-semibold text-[40px] mb-10 mt-5`}>
          Rutas funcionales
        </h2>
  
        <div className="flex gap-4">
          <a href="/login" className="bg-[var(--primary-purple-color)] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-[var(--color-dark)] text-base">
            /login
          </a>
          
          <a href="/register" className="bg-[var(--primary-orange-color)] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-[var(--color-dark)] text-base">
            /register
          </a>
          
          <a href="/forgot" className="bg-[var(--primary-purple-color)] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-[var(--color-dark)] text-base">
            /forgot
          </a>

          <a href="/settings" className="bg-[var(--primary-orange-color)] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-[var(--color-dark)] text-base">
            /settings
          </a>

          <a onClick={handleLogout} className="bg-[var(--primary-purple-color)] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-[var(--color-dark)] text-base">
            logout
          </a>

          <a href='/pay' className="bg-[var(--primary-purple-color)] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-[var(--color-dark)] text-base">
            Pagos
          </a>
        </div>
      </div>
      <NavBar theme={theme}/>
    </div>
  </>
  
  )
}

export default Home