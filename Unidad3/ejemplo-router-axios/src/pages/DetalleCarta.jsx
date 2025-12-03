import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { getCartaByID } from "../services/cartaService.js"
import CartaCard from "../components/cartaCard.jsx";

const cartaVacia = {
    _id: "",
    nombre: "",
    direccion: "",
    listaRegalos: []
}


export default function DetalleCarta() {

    const { id } = useParams();
    const [carta, setCarta] = useState(cartaVacia)

    useEffect(() => {
        console.log(id)

        getCartaByID(id)
            .then((response) => setCarta(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <h2>Carta de {carta.nombre}</h2>
            <h3>Direccion: {carta.direccion}</h3>
            {carta.listaRegalos.map((regalo, index) => (
                <li key={index}>{regalo}</li>
            ))}
            <br/>
            <button onClick={modificarCarta}>Modificar</button>
        </>
    )
}