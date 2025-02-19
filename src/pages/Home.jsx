import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react';

function Home() {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userName = decodedToken.nombre
  const [theme, setTheme] = useState(decodedToken.theme)
  console.log(theme)

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
    <div className={`${ theme === 'dark' ? 'bg-black' : 'bg-white' } flex justify-center items-center w-full min-h-screen`}>
      <div className={` ${ theme === 'dark' ? 'bg-black' : 'bg-white' } w-[1440px] flex flex-col items-center text-center`}>
        <h1 className={` ${ theme === 'dark' ? 'text-white' : 'text-black' }font-bold text-5xl mb-4`}>
          Bienvenidos a SITRAMRD {userName}!
        </h1>
        
        <p className={` ${ theme === 'dark' ? 'text-white' : 'text-black' } font-normal text-[28px] mb-10 mt-5`}>
          Sistema Integral de Transporte y Movilidad de la República Dominicana.
        </p>
  
  
        <div className="flex gap-4 mb-6">
          <a href="https://github.com/DavielSanchez/SITRAMRD-FRONTEND.git" className="bg-[#6a62dc] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-white text-base">
            Repositorio Front-End
          </a>
          
          <a href="https://github.com/DavielSanchez/SITRAMRD-BACKEND.git" className="bg-[#ff5353] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-white text-base">
            Repositorio Back-End
          </a>
        </div>
        <h2 className={` ${ theme === 'dark' ? 'text-white' : 'text-black' } font-semibold text-[40px] mb-10 mt-5`}>
          Rutas funcionales
        </h2>
  
        <div className="flex gap-4">
          <a href="/login" className="bg-[#6a62dc] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-white text-base">
            /login
          </a>
          
          <a href="/register" className="bg-[#ff5353] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-white text-base">
            /register
          </a>
          
          <a href="/forgot" className="bg-[#6a62dc] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-white text-base">
            /forgot
          </a>

          <a href="/register" className="bg-[#ff5353] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-white text-base">
            /register
          </a>

          <a onClick={handleLogout} className="bg-[#6a62dc] w-[181px] h-9 rounded-[10px] flex items-center justify-center text-white text-base">
            logout
          </a>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default Home