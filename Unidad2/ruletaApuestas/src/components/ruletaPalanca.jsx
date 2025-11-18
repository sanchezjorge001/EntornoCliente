import { useRef } from 'react'
import '../App.css'
import palancaSubida from '../assets/palancaSubida.png'
import palancaBajada from '../assets/palancaBajada.png'
import ruleta from '../assets/ruleta.png'
import sonidoRuleta from '../assets/sonidoRuleta.mp3'
import { useCasino } from '../context/CasinoContext.jsx'
const offsetBola = -90 // para que 0 quede arriba

function RuletaPalanca() {
  const { girando, resultado, rotacionBola, giraRuleta } = useCasino()
  const audioRef = useRef(null)

  return (
    <section className='ruleta-palanca'>
      <audio ref={audioRef} loop>
        <source src={sonidoRuleta} type="audio/mp3" />
      </audio>
      <div className='contenedor'>
        <div className='ruleta-wrapper'>
          <img src={ruleta} alt="ruleta" className={girando ? 'ruleta-gira' : ''}/>
          <div
            className='bola'
            style={{ transform: `rotate(${rotacionBola + offsetBola}deg)` }}
          >
            <span />
          </div>
        </div>
        <img
          onClick={() => giraRuleta(audioRef)}
          src={girando ? palancaBajada : palancaSubida}
          alt={girando ? 'palancaBajada' : 'palancaSubida'}
          className='palanca'
        />
      </div>
      {resultado && (
        <div className='marcador-ruleta'>
          <p>Número: <span className={`texto-${resultado.color.toLowerCase()}`}>{resultado.numero}</span></p>
          <p>Color: <span className={`texto-${resultado.color.toLowerCase()}`}>{resultado.color}</span></p>
        </div>
      )}
    </section>
  )
}

export default RuletaPalanca
