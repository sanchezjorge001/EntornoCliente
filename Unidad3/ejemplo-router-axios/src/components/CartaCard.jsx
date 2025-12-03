import { Link } from 'react-router-dom';

export default function CartaCard({ carta }) {
  
    return (
        <li>
            <Link to={`/carta/${carta._id}`}>{carta.nombre} pide {carta.listaRegalos.length} regalos.</Link>
        </li>
    )
}