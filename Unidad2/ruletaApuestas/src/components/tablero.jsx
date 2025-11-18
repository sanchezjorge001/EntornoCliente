import { useMemo } from 'react'
import './tablero.css'
import { useCasino } from '../context/CasinoContext.jsx'

const ROJOS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])
const NUMEROS_LAYOUT = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
]

const DOCENAS = [
  { label: '1st 12', valor: 'docena1' },
  { label: '2nd 12', valor: 'docena2' },
  { label: '3rd 12', valor: 'docena3' }
]

const COLUMNAS = [
  { label: '2/1', valor: 'columna1' },
  { label: '2/1', valor: 'columna2' },
  { label: '2/1', valor: 'columna3' }
]

const OPCIONES_FINALES = [
  { label: 'Odd', tipo: 'paridad', valor: 'odd', payout: 1 },
  { label: 'Even', tipo: 'paridad', valor: 'even', payout: 1 },
  { label: 'Rojo', tipo: 'color', valor: 'rojo', payout: 1, className: 'rojo', contenido: '' },
  { label: 'Negro', tipo: 'color', valor: 'negro', payout: 1, className: 'negro', contenido: '' },
  { label: '1-18', tipo: 'rango', valor: '1-18', payout: 1 },
  { label: '19-36', tipo: 'rango', valor: '19-36', payout: 1 }
]

function Tablero() {
  const {
    resultado,
    girando,
    giraRuleta,
    apuestas,
    colocarApuesta,
    limpiarApuestas,
    eliminarUltimaApuesta,
    repetirApuestas,
    totalApostado,
    gananciaReciente,
    chipValue,
    tieneApuestasPrevias
  } = useCasino()

  const apuestasMap = useMemo(() => {
    return apuestas.reduce((acc, apuesta) => {
      acc[apuesta.key] = apuesta.cantidad
      return acc
    }, {})
  }, [apuestas])

  const getColor = (numero) => {
    if (numero === 0) return 'verde'
    if (ROJOS.has(numero)) return 'rojo'
    return 'negro'
  }

  const handleNumero = (numero) => {
    colocarApuesta({ tipo: 'numero', valor: numero, payout: 35 })
  }

  const handleDocena = (valor) => {
    colocarApuesta({ tipo: 'docena', valor, payout: 2 })
  }

  const handleColumna = (valor) => {
    colocarApuesta({ tipo: 'columna', valor, payout: 2 })
  }

  const handleOpcion = (opcion) => {
    colocarApuesta(opcion)
  }

  return (
    <section className="tablero-container">
      <div className="chips-row">
        <button className="chip chip-activo" disabled>
          {chipValue}
        </button>
      </div>

      <div className="chip-actions">
        <div className="resumen-apuestas">
          <span>Apostado: €{totalApostado}</span>
          <span>Último premio: €{gananciaReciente}</span>
        </div>
        <button
          className="btn-spin"
          onClick={() => giraRuleta()}
          disabled={girando || !apuestas.length}
        >
          {girando ? 'Girando...' : 'Spin'}
        </button>
      </div>

      <div className="mesa">
        <div className="columna-cero">
          {(() => {
            const cantidad = apuestasMap['numero-0'] || 0
            return (
              <div
                className="casilla casilla-cero"
                onClick={() => handleNumero(0)}
              >
                0
                {cantidad > 0 && <small>€{cantidad}</small>}
              </div>
            )
          })()}
        </div>

        <div className="cuadricula-numeros">
          {NUMEROS_LAYOUT.map((fila, idxFila) => (
            <div key={idxFila} className="fila-numeros">
              {fila.map((numero) => {
                const esResultado = resultado?.numero === numero
                const key = `numero-${numero}`
                const cantidad = apuestasMap[key] || 0
                return (
                  <div
                    key={numero}
                    className={`casilla numero ${getColor(numero)} ${esResultado ? 'numero-activo' : ''}`}
                    onClick={() => handleNumero(numero)}
                  >
                    <span>{numero}</span>
                    {cantidad > 0 && <small>€{cantidad}</small>}
                    {esResultado && <span className="chip-resultado">💰</span>}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="columna-21">
          {COLUMNAS.map((columna, index) => {
            const key = `${columna.valor}`
            const cantidad = apuestasMap[`columna-${columna.valor}`] || 0
            return (
              <div
                key={key}
                className="casilla casilla-lateral"
                onClick={() => handleColumna(columna.valor)}
              >
                {columna.label}
                {cantidad > 0 && <small>€{cantidad}</small>}
              </div>
            )
          })}
        </div>
      </div>

      <div className="fila-docenas">
        {DOCENAS.map((docena) => {
          const cantidad = apuestasMap[`docena-${docena.valor}`] || 0
          return (
            <div
              key={docena.valor}
              className="casilla casilla-docena"
              onClick={() => handleDocena(docena.valor)}
            >
              {docena.label}
              {cantidad > 0 && <small>€{cantidad}</small>}
            </div>
          )
        })}
      </div>

      <div className="fila-opciones">
        {OPCIONES_FINALES.map((opcion) => {
          const key = `${opcion.tipo}-${opcion.valor}`
          const cantidad = apuestasMap[key] || 0
          return (
            <div
              key={key}
              className={`casilla casilla-opcion ${opcion.className ?? ''}`}
              aria-label={opcion.label}
              onClick={() => handleOpcion(opcion)}
            >
              {opcion.contenido ?? opcion.label}
              {cantidad > 0 && <small>€{cantidad}</small>}
            </div>
          )
        })}
    </div>
    </section>
  )
}

export default Tablero
