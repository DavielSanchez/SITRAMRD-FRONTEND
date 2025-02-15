import Input from "../components/Auth/Input";
import Button from "../components/Auth/Button";
import { useState } from "react";
import background from "../assets/Auth/Q1A9065.png";
import arrow from "../assets/Auth/flecha-derecha.png";
import Toast from "../components/Auth/Toast";
import usuario from "../assets/Auth/usuario.png"

function RegisterAuth() {
    // Estados para las validaciones
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Validaciones
    const validateSignIn = () => {
        if (!userName.trim().length) {
            setToastMessage('El campo userName está vacío ❌')
            setShowToast(true)
            return false;
        }
        if (!email.trim().length) {
            setToastMessage("El campo email está vacío ❌");
            setShowToast(true);
            return false;
        }
        if (!password.trim().length) {
            setToastMessage("El campo contraseña está vacío ❌");
            setShowToast(true);
            return false;
        }
        return true;
    };

    // Estado de llamado al login junto con las verificaciones
    const handleRegister = async (e) => {
        e.preventDefault();
        if (validateSignIn()) {
            try {
                // Aquí debe ir la autenticación JWT
                setToastMessage("Redireccionando A Login... ");
                setShowToast(true);

                // Ocultar el Toast después de 3 segundos
                setTimeout(() => setShowToast(false), 3000);
            } catch (error) {
                // y si devuelve error alguno de los 2 campos esta incorrecto
                console.log(error);
                setToastMessage("Error al ingresar los datos");
                setShowToast(true);
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
                    <form onSubmit={handleRegister}>
                        <div className="flex flex-col gap-8 mt-5 mb-10">
                            <Input
                                valor={userName}
                                type={''}
                                PlHolder={'Username'}
                                onChange={(e) => setUserName(e.target.value)} />

                            <Input
                                valor={email}
                                type="email"
                                PlHolder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                valor={password}
                                type="password"
                                PlHolder="Password"
                                onChange={(e) => setPassword(e.target.value)}
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
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}

export default RegisterAuth;
