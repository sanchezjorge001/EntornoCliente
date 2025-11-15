import React, { useState, useEffect } from 'react';

// Componente principal del juego Adivina el Número
export default function AdivinaNumero() {
  
  // Rango del número a adivinar
  const MIN = 1;
  const MAX = 100;
  
  // Número máximo de intentos permitidos
  const MAX_INTENTOS = 7;

  // Estado que guarda el número secreto a adivinar
  const [numeroSecreto, setNumeroSecreto] = useState(0);
  
  // Estado que guarda el número que el jugador ha introducido
  const [numeroJugador, setNumeroJugador] = useState('');
  
  // Estado que guarda el historial de intentos del jugador
  const [intentos, setIntentos] = useState([]);
  
  // Estado que guarda la pista para el jugador
  const [pista, setPista] = useState('');
  
  // Estado que indica si el juego ha terminado
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  
  // Estado que indica si el jugador ganó
  const [haGanado, setHaGanado] = useState(false);

  // Función que genera un número entero aleatorio entre min y max
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // useEffect que se ejecuta al inicio para generar el número secreto
  useEffect(function() {
    iniciarJuego();
  }, []);

  // Función que inicia un nuevo juego
  function iniciarJuego() {
    // Generar número secreto aleatorio
    let nuevoNumeroSecreto = getRandomInt(MIN, MAX);
    setNumeroSecreto(nuevoNumeroSecreto);
    
    // Resetear todos los estados
    setNumeroJugador('');
    setIntentos([]);
    setPista('Adivina el número entre ' + MIN + ' y ' + MAX);
    setJuegoTerminado(false);
    setHaGanado(false);
  }

  // Función que maneja cuando el jugador introduce un número
  function manejarCambioInput(evento) {
    setNumeroJugador(evento.target.value);
  }

  // Función que verifica el número introducido por el jugador
  function verificarNumero() {
    // Convertir el input a número entero
    let numero = parseInt(numeroJugador);
    
    // Validar que sea un número válido
    if(isNaN(numero)) {
      setPista('Por favor, introduce un número válido');
      return;
    }
    
    // Validar que esté en el rango
    if(numero < MIN || numero > MAX) {
      setPista('El número debe estar entre ' + MIN + ' y ' + MAX);
      return;
    }
    
    // Validar que no se haya intentado antes
    if(intentos.includes(numero)) {
      setPista('Ya has intentado ese número');
      return;
    }

    // Añadir el número a la lista de intentos
    let nuevosIntentos = [...intentos, numero];
    setIntentos(nuevosIntentos);
    
    // Limpiar el input
    setNumeroJugador('');

    // Comprobar si acertó
    if(numero == numeroSecreto) {
      // ¡GANÓ!
      setPista('🎉 ¡Felicidades! Has acertado el número en ' + nuevosIntentos.length + ' intentos');
      setJuegoTerminado(true);
      setHaGanado(true);
      return;
    }

    // Comprobar si se quedó sin intentos
    if(nuevosIntentos.length >= MAX_INTENTOS) {
      // PERDIÓ
      setPista('😢 Te quedaste sin intentos. El número era ' + numeroSecreto);
      setJuegoTerminado(true);
      setHaGanado(false);
      return;
    }

    // Dar pista si no acertó
    if(numero < numeroSecreto) {
      setPista('📈 El número es MAYOR que ' + numero);
    } else {
      setPista('📉 El número es MENOR que ' + numero);
    }
  }

  // Función que maneja cuando se presiona Enter en el input
  function manejarTeclaEnter(evento) {
    if(evento.key == 'Enter') {
      verificarNumero();
    }
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🎲 Adivina el Número</h1>
      
      {/* Información del juego */}
      <div style={{
        backgroundColor: '#f0f0f0',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <p style={{ fontSize: '18px', margin: '5px' }}>
          Intentos: {intentos.length} / {MAX_INTENTOS}
        </p>
        <p style={{ fontSize: '16px', margin: '5px', color: '#666' }}>
          Rango: {MIN} - {MAX}
        </p>
      </div>

      {/* Pista actual */}
      <div style={{
        backgroundColor: haGanado ? '#d4edda' : juegoTerminado ? '#f8d7da' : '#fff3cd',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        border: '2px solid ' + (haGanado ? '#28a745' : juegoTerminado ? '#dc3545' : '#ffc107')
      }}>
        {pista}
      </div>

      {/* Input y botón para adivinar */}
      {!juegoTerminado && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="number"
            value={numeroJugador}
            onChange={manejarCambioInput}
            onKeyPress={manejarTeclaEnter}
            placeholder="Introduce un número"
            style={{
              padding: '10px',
              fontSize: '18px',
              width: '200px',
              marginRight: '10px',
              borderRadius: '5px',
              border: '2px solid #ccc'
            }}
          />
          <button
            onClick={verificarNumero}
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Intentar
          </button>
        </div>
      )}

      {/* Botón para jugar de nuevo */}
      {juegoTerminado && (
        <button
          onClick={iniciarJuego}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px'
          }}
        >
          Jugar de Nuevo
        </button>
      )}

      {/* Historial de intentos */}
      {intentos.length > 0 && (
        <div style={{
          marginTop: '30px',
          textAlign: 'left'
        }}>
          <h3>Historial de intentos:</h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center'
          }}>
            {intentos.map(function(intento, index) {
              return (
                <div
                  key={index}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: intento == numeroSecreto ? '#28a745' : '#6c757d',
                    color: 'white',
                    borderRadius: '5px',
                    fontWeight: 'bold'
                  }}
                >
                  {intento}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Instrucciones */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        textAlign: 'left'
      }}>
        <h3>Cómo jugar:</h3>
        <p>1. La computadora ha elegido un número entre {MIN} y {MAX}</p>
        <p>2. Tienes {MAX_INTENTOS} intentos para adivinarlo</p>
        <p>3. Después de cada intento, recibirás una pista</p>
        <p>4. ¡Intenta adivinar el número con la menor cantidad de intentos!</p>
      </div>
    </div>
  );
}
