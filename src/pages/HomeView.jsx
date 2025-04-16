import { jwtDecode } from "jwt-decode";
import { useBG, useBGForButtons, useText, useIconColor, useBorderColor } from "../ColorClass";
import NavBar from "../components/NavBar";
import { useState } from "react";
import RefreshIcon from '../assets/Home/RefreshIcon'
import HamburgerMenu from "../components/Home/HamburgerMenu";
import TopBar from '../components/TopBar.jsx'
import { toast } from 'react-toastify'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PrincipalCard from "../components/Billetera/PrincipalCard.jsx";

function HomeView() {
    const [openModal, setOpenModal] = useState(false);
    const [location, setLocation] = useState("");
    const [destination, setDestination] = useState("");


    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token)
    const theme = decodedToken.theme
    const bgColor = useBG(theme)
    const ButtonColor = useBGForButtons(theme)
    const textColor = useText(theme)
    const iconColor = useIconColor(theme)
    const BorderColor = useBorderColor(theme)


    const handleSubmit = () => {
        if (!location.trim().length) {
            toast.error(`El campo de ubicacion está vacío`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            })
        }
        if (!destination.trim().length) {
            toast.error(`El campo de destino está vacío`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            })
        }
    }

    return (
        <>

            <div className={`flex flex-col items-center px-5 ${bgColor} min-h-screen relative`}>
                <div className="w-full absolute top-0 h-96 bg-cover bg-center z-0" style={{ backgroundImage: "url('src/assets/home/1_2.png')" }}></div>
                <TopBar nombre={'Sitramrd'} mostrarIcono={false} />
                <div className={`flex ${textColor} font-semibold text-4xl w-max`}>
                <div className="absolute left-10 z-49">
                    <HamburgerMenu />
                </div>
                </div>

                <PrincipalCard/>

                
                
                <div className="mt-15 mb-10 w-full max-w-2xl">

                    <p className={`${textColor} text-2xl font-semibold mb-4 `}>¡Ve a donde quieras!</p>
                    <div className="flex items-center mb-4">
                    <input 
                        onClick={() => setOpenModal(true)} 
                        type="text" 
                        placeholder="A donde vas?" 
                        className={`w-full p-3 border rounded-md bg-white ${textColor} ${BorderColor}`} 
                        />
                    </div>
                    <div className="sm:grid grid-cols-1 gap-4 xl:grid-cols-3">
                        <div className={`w-full flex gap-3 p-3 border rounded-md mt-2 ${textColor} ${BorderColor}`}><RefreshIcon color={iconColor} /><p>Viaje 1</p></div>
                        <div className={`w-full flex gap-3 p-3 border rounded-md mt-2 ${textColor} ${BorderColor}`}><RefreshIcon color={iconColor} /><p>Viaje 2</p></div>
                        <div className={`w-full flex gap-3 p-3 border rounded-md mt-2 ${textColor} ${BorderColor}`}><RefreshIcon color={iconColor} /><p>Viaje 3</p></div>
                    </div>
                </div>

                {/*modal*/}
                {openModal && (
                    <div className="fixed inset-0 flex items-center justify-center mt-15 md:mt-10 z-10 p-4 sm:p-6">
                        <div className={`${bgColor} p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col gap-4 border-2 ${BorderColor}`}>
                            <h2 className={` ${textColor} text-3xl font-semibold my-4 text-center`}>Selecciona tu destino</h2>
                            <div className={`flex items-center border ${BorderColor} rounded-md w-full`}>
                                <button className="p-1 text-gray-600" onClick={() => {/* Acción del icono aquí */}}>
                                    <LocationOnIcon color={iconColor} />
                                </button>
                                <input
                                    type="text"
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Escribe tu ubicación actual"
                                    className={`w-full p-3 ${textColor} pl-2`} // Agregar padding a la izquierda
                                />
                            </div>
                            <div className={`flex items-center border ${BorderColor} rounded-md w-full`}>
                                <button className="p-1 text-gray-600" onClick={() => {/* Acción del icono aquí */}}>
                                    <LocationOnIcon color={iconColor} />
                                </button>
                                    <input
                                    type="text"
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Escribe tu destino"
                                    className={`w-full p-3 ${textColor} pl-2`}
                                    />
                            </div>
                            
                            <button onClick={handleSubmit} className={`${ButtonColor} cursor-pointer text-white px-4 py-2 rounded-lg w-full`}>Enviar</button>
                            <img className="w-full h-auto max-h-64 object-cover" src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Dominican_Republic_location_map.svg" alt="Mapa" />
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className={`${ButtonColor} text-white px-4 py-2 rounded-lg cursor-pointer`}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Dominican_Republic_location_map.svg" alt="" className="w-full h-auto max-h-150" />
                </div>

            </div>

            <div className="block sm:hidden">
                <NavBar theme={bgColor} />
            </div>
        </>
    );
};
export default HomeView
