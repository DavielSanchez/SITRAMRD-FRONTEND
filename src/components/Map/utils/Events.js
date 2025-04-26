import { getViaje } from "./ApiCall"

//Usuario Cancelo Viaje

export const CancelarViaje = () =>{
    
}

//Usuario Comenzo un viaje

//Realizar el pago
//Guardar la actividad del usuario
//


export const StartViaje = (lat, lng, destinoLat, destinoLng, map) =>{
    const origen = {lat: lat, lng: lng}
    const destino = {destinoLat: destinoLat, destinoLng: destinoLng}
    getViaje(lat, lng, destinoLat, destinoLng, map);
    localStorage.setItem("origen", JSON.stringify(origen));
    localStorage.setItem("destino", JSON.stringify(destino));
}


//Usuario llego a una parada