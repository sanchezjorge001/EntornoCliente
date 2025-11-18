import { createContext, useContext, useMemo, useState } from 'react'

const NUMEROS_RULETA = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23,
  10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
]

const ROJOS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])
const NEGROS = new Set([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35])

const anguloSegmento = 360 / NUMEROS_RULETA.length
const CHIP_VALUE = 1

const CasinoContext = createContext(null)

function obtenerColor(numero) {
  if (numero === 0) return 'Verde'
  if (ROJOS.has(numero)) return 'Rojo'
  if (NEGROS.has(numero)) return 'Negro'
  return 'Desconocido'
}

function CasinoProvider({ children }) {
  const [saldo, setSaldo] = useState(1000)
  const [modal, setModal] = useState({ abierto: false, tipo: null })
  const [cantidad, setCantidad] = useState('')
  const [girando, setGirando] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [rotacionBola, setRotacionBola] = useState(0)
  const [ultimoObjetivo, setUltimoObjetivo] = useState(0)
  const [apuestas, setApuestas] = useState([])
  const [historialLlaves, setHistorialLlaves] = useState([])
  const [apuestasPrevias, setApuestasPrevias] = useState([])
  const [gananciaReciente, setGananciaReciente] = useState(0)

  const totalApostado = useMemo(() => apuestas.reduce((acc, apuesta) => acc + apuesta.cantidad, 0), [apuestas])

  function giraRuleta(audioRef = null) {
    if (girando) return

    const apuestasEnJuego = apuestas.map((apuesta) => ({ ...apuesta }))

    const audio = audioRef?.current
    if (audio) {
      audio.currentTime = 0
      audio.play()
    }

    const indice = Math.floor(Math.random() * NUMEROS_RULETA.length)
    const numero = NUMEROS_RULETA[indice]
    const color = obtenerColor(numero)
    const nuevoObjetivo = indice * anguloSegmento
    const diferencia = ((nuevoObjetivo - ultimoObjetivo) + 360) % 360
    const vueltasExtra = 360 * 4

    setGirando(true)
    setResultado(null)
    setRotacionBola((prev) => prev + vueltasExtra + diferencia)
    setUltimoObjetivo(nuevoObjetivo)

    setTimeout(() => {
      setGirando(false)
      setResultado({ numero, color })
      const colorLower = color.toLowerCase()
      const ganancia = calcularGanancia(apuestasEnJuego, numero, colorLower)
      setGananciaReciente(ganancia)
      if (ganancia > 0) {
        setSaldo((prev) => prev + ganancia)
      }
      setApuestasPrevias(apuestasEnJuego)
      setApuestas([])
      setHistorialLlaves([])
      if (audio) {
        audio.pause()
      }
    }, 5500)
  }

  function calcularGanancia(apuestasEnJuego, numero, colorLower) {
    if (!apuestasEnJuego.length) return 0

    return apuestasEnJuego.reduce((acum, apuesta) => {
      if (apuestaAcertada(apuesta, numero, colorLower)) {
        return acum + apuesta.cantidad * (apuesta.payout + 1)
      }
      return acum
    }, 0)
  }

  function apuestaAcertada(apuesta, numero, colorLower) {
    switch (apuesta.tipo) {
      case 'numero':
        return numero === apuesta.valor
      case 'color':
        return colorLower === apuesta.valor
      case 'paridad':
        if (numero === 0) return false
        return apuesta.valor === 'even' ? numero % 2 === 0 : numero % 2 !== 0
      case 'rango':
        if (numero === 0) return false
        return apuesta.valor === '1-18' ? numero >= 1 && numero <= 18 : numero >= 19 && numero <= 36
      case 'docena':
        return docenaDeNumero(numero) === apuesta.valor
      case 'columna':
        return columnaDeNumero(numero) === apuesta.valor
      default:
        return false
    }
  }

  function docenaDeNumero(numero) {
    if (numero === 0) return null
    if (numero <= 12) return 'docena1'
    if (numero <= 24) return 'docena2'
    return 'docena3'
  }

  function columnaDeNumero(numero) {
    if (numero === 0) return null
    const resto = numero % 3
    if (resto === 0) return 'columna1'
    if (resto === 2) return 'columna2'
    return 'columna3'
  }

  function colocarApuesta({ tipo, valor, payout }) {
    if (girando || saldo < CHIP_VALUE) return false
    const key = `${tipo}-${valor}`
    setSaldo((prev) => prev - CHIP_VALUE)
    setApuestas((prev) => {
      const existente = prev.find((apuesta) => apuesta.key === key)
      if (existente) {
        return prev.map((apuesta) => apuesta.key === key ? { ...apuesta, cantidad: apuesta.cantidad + 1 } : apuesta)
      }
      return [...prev, { key, tipo, valor, payout, cantidad: 1 }]
    })
    setHistorialLlaves((prev) => [...prev, key])
    return true
  }

  function limpiarApuestas() {
    if (!apuestas.length || girando) return
    setSaldo((prev) => prev + totalApostado * CHIP_VALUE)
    setApuestas([])
    setHistorialLlaves([])
  }

  function eliminarUltimaApuesta() {
    if (!historialLlaves.length || girando) return
    const keyAEliminar = historialLlaves[historialLlaves.length - 1]
    setHistorialLlaves((prev) => prev.slice(0, -1))
    setApuestas((prev) => prev
      .map((apuesta) => apuesta.key === keyAEliminar ? { ...apuesta, cantidad: apuesta.cantidad - 1 } : apuesta)
      .filter((apuesta) => apuesta.cantidad > 0)
    )
    setSaldo((prev) => prev + CHIP_VALUE)
  }

  function repetirApuestas() {
    if (!apuestasPrevias.length || girando || apuestas.length) return
    const coste = apuestasPrevias.reduce((acc, apuesta) => acc + apuesta.cantidad, 0)
    if (coste > saldo) return
    setSaldo((prev) => prev - coste * CHIP_VALUE)
    setApuestas(apuestasPrevias.map((apuesta) => ({ ...apuesta })))
    const nuevoHistorial = []
    apuestasPrevias.forEach((apuesta) => {
      for (let i = 0; i < apuesta.cantidad; i += 1) {
        nuevoHistorial.push(apuesta.key)
      }
    })
    setHistorialLlaves(nuevoHistorial)
  }

  function abrirModal(tipo) {
    setModal({ abierto: true, tipo })
    setCantidad('')
  }

  function cerrarModal() {
    setModal({ abierto: false, tipo: null })
    setCantidad('')
  }

  function procesarOperacion() {
    const valor = Number(cantidad)
    if (!valor || valor <= 0) return

    setSaldo((prev) => {
      if (modal.tipo === 'retirar') {
        const nuevoSaldo = prev - valor
        return nuevoSaldo < 0 ? 0 : nuevoSaldo
      }
      return prev + valor
    })

    cerrarModal()
  }

  const tieneApuestasPrevias = apuestasPrevias.length > 0

  return (
    <CasinoContext.Provider
      value={{
        saldo,
        modal,
        cantidad,
        girando,
        resultado,
        rotacionBola,
        abrirModal,
        cerrarModal,
        procesarOperacion,
        setCantidad,
        giraRuleta,
        apuestas,
        colocarApuesta,
        limpiarApuestas,
        eliminarUltimaApuesta,
        repetirApuestas,
        totalApostado,
        gananciaReciente,
        tieneApuestasPrevias,
        chipValue: CHIP_VALUE
      }}
    >
      {children}
    </CasinoContext.Provider>
  )
}

function useCasino() {
  const context = useContext(CasinoContext)
  if (!context) {
    throw new Error('useCasino debe utilizarse dentro de un CasinoProvider')
  }
  return context
}

export { CasinoProvider, useCasino }

