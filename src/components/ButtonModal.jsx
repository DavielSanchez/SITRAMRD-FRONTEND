import { jwtDecode } from "jwt-decode";
import { useBGForButtons, useText } from "../ColorClass";

export const BotonModal = ({ text, OnClick }) => {

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token)
    const theme = decodedToken.theme
    const ButtonColor = useBGForButtons(theme)
    const textColor = useText(theme)


    return (
        <>
            {/*Onclick para abrir el modal*/}
            <button
                className={`${ButtonColor} text-white p-4 rounded-2xl font-semibold text-2xl`}
                onClick={OnClick}>
                <div className={`${textColor}`}>
                    {text}
                </div>
            </button>
        </>
    )
}