import { jwtDecode } from "jwt-decode";
import { useBG, usePrimaryColors, useBGForButtons, useText, useIconColor } from "../ColorClass";
import NavBar from "../components/NavBar";
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";
import { useState } from "react";
import LocationIcon from "../assets/Home/LocationIcon";
import RefreshIcon from '../assets/Home/RefreshIcon'
import HamburgerMenu from "../components/Home/HamburgerMenu";

function HomeView() {
    const [openModal, setOpenModal] = useState(false)

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token)
    const theme = decodedToken.theme
    const bgColor = useBG(theme)
    const PrimaryColor = usePrimaryColors(theme)
    const ButtonColor = useBGForButtons(theme)
    const textColor = useText(theme)
    const iconColor = useIconColor(theme)
    console.log(decodedToken)

    const MySwal = withReactContent(Swal)

    const handleAlert = () => {
        MySwal.fire({
            text: 'Vista en preceso',
            icon: 'error',
            draggable: true,
        })
    }

    return (
        <>

            <div className={`flex flex-col items-center p-4 ${bgColor} min-h-screen relative`}>
            <div className="w-full absolute top-0 h-96 bg-cover bg-center z-0" style={{ backgroundImage: "url('src/assets/home/1_2.png')" }}></div>

                <div className={`flex ${textColor} font-semibold text-4xl w-max h-14">Sitramrd`}>
                    <div className="absolute left-10">
                        <HamburgerMenu />
                    </div> Sitramrd</div>
                    
                <div className={`${ButtonColor}  text-white rounded-2xl p-9 shadow-lg mt-12 z-10 w-full max-w-xl`}>
                    <p className="font-semibold text-2xl">Daviel Alexander Sanchez</p>
                    <p className="text-xl mt-2">RD$ 1000.00</p>
                    <p className="mt-2 text-sm">Última recarga: 2/9/2025</p>
                    <p className="text-sm">Último viaje: 2/9/2025 10:25 AM</p>
                </div>
                            

                <div className="flex gap-4 mt-4">
                    <button onClick={handleAlert} className={`${ButtonColor}  text-white px-6 z-10 py-4 rounded-lg shadow cursor-pointer`}>Recargar Balance</button>
                </div>
                <div className="mt-32 w-full max-w-2xl">
                    <div className="flex items-center mb-4">
                        <input onClick={() => setOpenModal(true)} type="text" placeholder="A donde vas?" className={`w-full p-3 border rounded-md ${textColor} `} />
                    </div>
                    <div className="sm:grid grid-cols-1 p-2 gap-4 xl:grid-cols-3">
                        <div className={`w-full flex gap-3 p-3 border rounded-md ${textColor}`}><RefreshIcon color={iconColor} /><p>Viaje 1</p></div>
                        <div className={`w-full flex gap-3 p-3 border rounded-md ${textColor}`}><LocationIcon color={iconColor} /><p>Viaje 2</p></div>
                        <div className={`w-full flex gap-3 p-3 border rounded-md ${textColor}`}><LocationIcon color={iconColor} /><p>Viaje 3</p></div>
                    </div>
                </div>

                {/*modal*/}
                {openModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-10 p-4 sm:p-6">
                        <div className={`${bgColor} p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col gap-4`}>
                            <h2 className="text-xl font-semibold text-center">Selecciona tu destino</h2>
                            <input
                                type="text"
                                placeholder="Escribe tu ubicación actual"
                                className={`w-full p-3 border rounded-md ${textColor}`}
                            />
                            <input
                                type="text"
                                placeholder="Escribe tu destino"
                                className={`w-full p-3 border rounded-md ${textColor}`}
                            />
                            <button className={`${ButtonColor} text-white px-4 py-2 rounded-lg w-full`}>Enviar</button>
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
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Dominican_Republic_location_map.svg" alt="" />
                </div>

            </div>

            <div className="md:block xl:hidden">
                <NavBar theme={bgColor} />
            </div>
        </>
    );
};
export default HomeView
