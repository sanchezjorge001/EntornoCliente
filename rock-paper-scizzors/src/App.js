import { useState } from "react";

export default function App() {
  const opciones = ["Piedra", "Papel", "Tijera"];

  // Constantes con el estado
  const [eleccionUsuario, setEleccionUsuario] = useState(null);
  const [eleccionMaquina, setEleccionMaquina] = useState(null);
  const [resultado, setResultado] = useState("");
  const [marcador, setMarcador] = useState({ usuario: 0, maquina: 0 });
  const [ganadorPartida, setGanadorPartida] = useState(null);

  const jugar = (opcion) => {
    if (ganadorPartida) return; // Si hay un ganador, acaba la partida

    const eleccionCPU = opciones[Math.floor(Math.random() * opciones.length)];
    setEleccionUsuario(opcion);
    setEleccionMaquina(eleccionCPU);

    // Bucle para todas las combinaciones posibles
    let res = "";
    if (opcion === eleccionCPU) {
      res = "¡Empate!";
    } else if (
      (opcion === "Piedra" && eleccionCPU === "Tijera") ||
      (opcion === "Papel" && eleccionCPU === "Piedra") ||
      (opcion === "Tijera" && eleccionCPU === "Papel")
    ) {
      res = "¡Ganaste!";
      setMarcador((prev) => {
        const nuevo = { ...prev, usuario: prev.usuario + 1 };
        if (nuevo.usuario === 2) setGanadorPartida("Jugador");
        return nuevo;
      });
    } else {
      res = "Perdiste...";
      setMarcador((prev) => {
        const nuevo = { ...prev, maquina: prev.maquina + 1 };
        if (nuevo.maquina === 2) setGanadorPartida("Máquina");
        return nuevo;
      });
    }

    setResultado(res);
  };

  // Reiniciar la partida
  const reiniciarPartida = () => {
    setEleccionUsuario(null);
    setEleccionMaquina(null);
    setResultado("");
    setMarcador({ usuario: 0, maquina: 0 });
    setGanadorPartida(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px", fontFamily: "Arial" }}>

      <h1>
        Marcador: {marcador.usuario} - {marcador.maquina}
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          margin: "20px",
          fontSize: "2rem",
        }}
      >
        <div>
          <h3>Jugador</h3>
          <p>{eleccionUsuario ? mostrarEmoji(eleccionUsuario) : "❔"}</p>
        </div>
        <div>
          <h3>Máquina</h3>
          <p>{eleccionMaquina ? mostrarEmoji(eleccionMaquina) : "❔"}</p>
        </div>
      </div>

      <h2>{resultado}</h2>
      {ganadorPartida && (
        <h1 style={{ color: ganadorPartida === "Jugador" ? "green" : "red" }}>
          Ganador de la partida: {ganadorPartida}
        </h1>
      )}

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => jugar("Piedra")}
          style={estiloBoton}
          disabled={ganadorPartida !== null}
        >
          ✊
        </button>
        <button
          onClick={() => jugar("Papel")}
          style={estiloBoton}
          disabled={ganadorPartida !== null}
        >
          🖐️
        </button>
        <button
          onClick={() => jugar("Tijera")}
          style={estiloBoton}
          disabled={ganadorPartida !== null}
        >
          ✌️
        </button>
      </div>

      {ganadorPartida && (
        <button
          onClick={reiniciarPartida}
          style={{
            marginTop: "30px",
            padding: "10px 20px",
            fontSize: "18px",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          Reiniciar Partida
        </button>
      )}
    </div>
  );
}

const estiloBoton = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "30px",
  width: "90px",
  height: "70px",
};

// Función para convertir nombres en emojis
function mostrarEmoji(nombre) {
  switch (nombre) {
    case "Piedra":
      return "✊";
    case "Papel":
      return "🖐️";
    case "Tijera":
      return "✌️";
    default:
      return "❔";
  }
}
