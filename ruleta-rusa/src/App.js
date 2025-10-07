import { useState } from "react";

function App() {
  const [jugadorActual, setJugadorActual] = useState(1);
  const [balas, setBalas] = useState({
    1: Math.floor(Math.random() * 6) + 1,
    2: Math.floor(Math.random() * 6) + 1,
  });
  const [camaras, setCamaras] = useState({ 1: 6, 2: 6 });
  const [mensaje, setMensaje] = useState("🎮 Jugador 1 empieza. Pulsa disparar 🔫");
  const [gameOver, setGameOver] = useState(false);

  const disparar = () => {
    if (gameOver) return;

    const disparo = Math.floor(Math.random() * 6) + 1;

    if (disparo === balas[jugadorActual]) {
      setMensaje(`💀 ¡Bang! Jugador ${jugadorActual} ha perdido.`);
      setGameOver(true);
      return;
    }

    // jugador se salva
    const nuevasCamaras = { ...camaras, [jugadorActual]: camaras[jugadorActual] - 1 };

    if (nuevasCamaras[jugadorActual] === 0) {
      setMensaje(`🎉 Jugador ${jugadorActual} ha sobrevivido las 6 cámaras. ¡Gana la partida!`);
      setGameOver(true);
      return;
    }

    setCamaras(nuevasCamaras);

    const siguiente = jugadorActual === 1 ? 2 : 1;
    setMensaje(`😅 Jugador ${jugadorActual} se salvó. Turno del Jugador ${siguiente}.`);
    setJugadorActual(siguiente);
  };

  const reiniciar = () => {
    setJugadorActual(1);
    setBalas({
      1: Math.floor(Math.random() * 6) + 1,
      2: Math.floor(Math.random() * 6) + 1,
    });
    setCamaras({ 1: 6, 2: 6 });
    setMensaje("🎮 Jugador 1 empieza. Pulsa disparar 🔫");
    setGameOver(false);
  };

  // 🎨 Estilos
  const container = {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  };

  const box = {
    display: "inline-block",
    width: "200px",
    margin: "10px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const activePlayer = {
    border: "2px solid #007bff",
  };

  const button = {
    margin: "10px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  };

  const shootButton = {
    ...button,
    backgroundColor: "#28a745",
    color: "white",
  };

  const resetButton = {
    ...button,
    backgroundColor: "#dc3545",
    color: "white",
  };

  return (
    <div style={container}>
      <h1>🔫 Ruleta Rusa por Turnos</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        <div style={{ ...box, ...(jugadorActual === 1 ? activePlayer : {}) }}>
          <h2>Jugador 1 👷</h2>
          <p>Cámaras restantes: {camaras[1]}</p>
        </div>
        <div style={{ ...box, ...(jugadorActual === 2 ? activePlayer : {}) }}>
          <h2>Jugador 2 👷‍♂️</h2>
          <p>Cámaras restantes: {camaras[2]}</p>
        </div>
      </div>

      <p style={{ fontSize: "18px", marginTop: "20px" }}>{mensaje}</p>

      <div>
        <button onClick={disparar} style={shootButton} disabled={gameOver}>
          Disparar 🔫
        </button>
        <button onClick={reiniciar} style={resetButton}>
          Reiniciar 🔁
        </button>
      </div>
    </div>
  );
}

export default App;
