// Importación de hooks de React necesarios para el juego
import { useEffect, useReducer } from 'react'
import './App.css'

// Importación de imágenes para los elementos del juego
import cookieImg from "./assets/galleta.png";
import cursorImg from "./assets/cursor.png";
import grandmaImg from "./assets/abuela.png";
import multiplierImg from "./assets/corre.png";

// Estado inicial del juego - Define todos los valores al inicio
const INITIAL_STATE = {
  // Contador principal de galletas
  cookies: 0,

  // Cantidad de mejoras compradas
  cursorCount: 0,        // Número de cursores automáticos
  clickMultiplier: 1,    // Multiplicador de galletas por clic (empieza en 1)
  grandmaCount: 0,       // Número de abuelas compradas

  // Precios iniciales de cada mejora
  cursorPrice: 15,       // Precio inicial del cursor
  multiplierPrice: 50,   // Precio inicial del multiplicador
  grandmaPrice: 100,     // Precio inicial de la abuela

  // Factores de incremento de precio (cada vez que compras, el precio sube)
  multiplierPriceIncrement: 1.2,  // El multiplicador sube 20% cada vez
  cursorPriceIncrement: 1.1,      // El cursor sube 10% cada vez
  grandmaPriceIncrement: 1.3,     // La abuela sube 30% cada vez
}

export default function App() {

  // Reducer: función que gestiona todas las acciones del juego
  // Recibe el estado actual y una acción, devuelve el nuevo estado
  function cookieReducer(state, action) {

    // Variable para almacenar el nuevo estado
    let outputState = state;

    // ACCIÓN: Clic en la galleta principal
    if (action.type == 'CLICK_COOKIE') {
      // Suma galletas según el multiplicador actual
      outputState = { ...state, cookies: state.cookies + state.clickMultiplier }
    }
    // ACCIÓN: Comprar multiplicador (si tienes galletas suficientes)
    else if (action.type == 'BUY_MULTIPLIER' && state.cookies >= state.multiplierPrice) {
      outputState =
      {
        ...state,
        clickMultiplier: state.clickMultiplier + 1,  // Aumenta el multiplicador en 1
        cookies: state.cookies - state.multiplierPrice,  // Resta el precio
        multiplierPrice: Math.round(state.multiplierPrice * state.multiplierPriceIncrement)  // Aumenta el precio un 20%
      }
    }
    // ACCIÓN: Comprar cursor automático (si tienes galletas suficientes)
    else if (action.type == 'BUY_CURSOR' && state.cookies >= state.cursorPrice) {
      outputState =
      {
        ...state,
        cursorCount: state.cursorCount + 1,  // Añade un cursor
        cookies: state.cookies - state.cursorPrice,  // Resta el precio
        cursorPrice: Math.round(state.cursorPrice * state.cursorPriceIncrement)  // Aumenta el precio un 10%
      }
    }
    // ACCIÓN: Comprar abuela (si tienes galletas suficientes)
    else if (action.type == 'BUY_GRANDMA' && state.cookies >= state.grandmaPrice) {
      outputState =
      {
        ...state,
        grandmaCount: state.grandmaCount + 1,  // Añade una abuela
        cookies: state.cookies - state.grandmaPrice,  // Resta el precio
        grandmaPrice: Math.round(state.grandmaPrice * state.grandmaPriceIncrement)  // Aumenta el precio un 30%
      }
    }
    // ACCIÓN: Generación automática de galletas (se ejecuta cada segundo)
    else if (action.type == 'GENERATE_COOKIES') {
      outputState =
      {
        ...state,
        // Cada cursor genera 0.1 galletas/seg + cada abuela genera 1 galleta/seg
        cookies: state.cookies + state.cursorCount * 0.1 + state.grandmaCount * 1
      }
    }

    // Devuelve el nuevo estado
    return outputState;

  }

  // Inicializa el reducer con el estado inicial
  // state: contiene todos los datos del juego
  // dispatch: función para enviar acciones al reducer
  const [state, dispatch] = useReducer(cookieReducer, INITIAL_STATE)

  // useEffect: ejecuta código cuando el componente se monta
  useEffect(() => {
    // Crea un temporizador que se ejecuta cada segundo (1000ms)
    let timer = setInterval(() => {
      // Dispara la acción de generar galletas automáticamente
      dispatch({ type: 'GENERATE_COOKIES' })
    }, 1000);

    // Función de limpieza: elimina el temporizador cuando el componente se desmonta
    return () => clearInterval(timer)
  }, []);  // [] significa que solo se ejecuta una vez al montar el componente

  // Renderiza la interfaz del juego
  return (
    <>
      <div className='container'>
        {/* Sección superior: contador de galletas y botón principal */}
        <div className='row justify-content-center'>
          {/* Muestra el total de galletas (redondeado sin decimales) */}
          <h1 className='col-12'>{Math.round(state.cookies)} 🍪</h1>

          {/* Botón de galleta principal - al hacer clic genera galletas */}
          <button className='col-5' onClick={() => dispatch({ type: 'CLICK_COOKIE' })}>
            <img className='img-fluid' src={cookieImg} />
          </button>
        </div>

        {/* Sección media: botones de compra de mejoras */}
        <div className='row justify-content-center'>
          {/* Botón para comprar cursores - genera 0.1 galletas/segundo */}
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_CURSOR' })}>
            <img className='img-fluid' src={cursorImg} />
            x{state.cursorCount}  {/* Muestra cantidad de cursores comprados */}
          </button>

          {/* Botón para comprar multiplicador - aumenta galletas por clic */}
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_MULTIPLIER' })}>
            <img className='img-fluid' src={multiplierImg} />
            x{state.clickMultiplier}  {/* Muestra el nivel actual del multiplicador */}
          </button>

          {/* Botón para comprar abuelas - genera 1 galleta/segundo */}
          <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_GRANDMA' })}>
            <img className='img-fluid' src={grandmaImg} />
            x{state.grandmaCount}  {/* Muestra cantidad de abuelas compradas */}
          </button>
        </div>

        {/* Sección inferior: muestra los precios de cada mejora */}
        <div className='row justify-content-center'>
          <p className='col-md-2 col-12'>{state.cursorPrice} 🍪</p>        {/* Precio del cursor */}
          <p className='col-md-2 col-12'>{state.multiplierPrice} 🍪</p>    {/* Precio del multiplicador */}
          <p className='col-md-2 col-12'>{state.grandmaPrice} 🍪</p>       {/* Precio de la abuela */}
        </div>
      </div>
    </>
  )
}