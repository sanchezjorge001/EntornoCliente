// Importamos React y dos hooks esenciales:
// - useState: para crear y gestionar variables de estado que pueden cambiar
// - useEffect: para ejecutar código cuando el componente se monta/carga
import React, { useState, useEffect } from 'react';

// Importamos el archivo JSON que contiene todas las preguntas del juego
import preguntas from './preguntas.json';

// Importamos las 8 imágenes de los quesitos (de 0 a 7 quesitos ganados)
// Cada imagen representa visualmente el progreso del jugador
import quesito0 from './quesitos/quesito0.png';
import quesito1 from './quesitos/quesito1.png';
import quesito2 from './quesitos/quesito2.png';
import quesito3 from './quesitos/quesito3.png';
import quesito4 from './quesitos/quesito4.png';
import quesito5 from './quesitos/quesito5.png';
import quesito6 from './quesitos/quesito6.png';
import quesito7 from './quesitos/quesito7.png';

// Componente principal del juego Trivial
export default function Trivial() {
  // Estado que almacena la pregunta actual que se muestra en pantalla
  // Inicialmente se establece con la primera pregunta del array (preguntas[0])
  const [preguntaActual, setPreguntaActual] = useState(preguntas[0]);
  
  // Estado que cuenta cuántos quesitos ha ganado el jugador
  // Comienza en 0 y puede llegar hasta 7 para ganar el juego
  const [quesitos, setQuesitos] = useState(0);

  // Array que agrupa todas las imágenes importadas para acceder a ellas por índice
  // imagenesQuesitos[0] = quesito0.png, imagenesQuesitos[1] = quesito1.png, etc.
  const imagenesQuesitos = [quesito0, quesito1, quesito2, quesito3, quesito4, quesito5, quesito6, quesito7];

  // Función que genera un número entero aleatorio entre min y max (ambos inclusivos)
  // Ejemplo: getRandomInt(0, 5) puede devolver 0, 1, 2, 3, 4 o 5
  function getRandomInt(min, max) {
    min = Math.ceil(min);    // Redondea min hacia arriba para asegurar que sea entero
    max = Math.floor(max);   // Redondea max hacia abajo para asegurar que sea entero
    // Math.random() genera un número decimal entre 0 y 1
    // La fórmula lo convierte en un entero dentro del rango [min, max]
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Función que selecciona una pregunta aleatoria del array de preguntas
  function seleccionarPreguntaAleatoria() {
    // Genera un índice aleatorio entre 0 y la última posición del array
    // preguntas.length - 1 porque los arrays empiezan en 0
    let indiceAleatorio = getRandomInt(0, preguntas.length - 1)
    
    // Obtiene la pregunta en esa posición aleatoria
    let preguntaActual = preguntas[indiceAleatorio]

    // Actualiza el estado con la nueva pregunta seleccionada
    // Esto hace que React re-renderice el componente mostrando la nueva pregunta
    setPreguntaActual(preguntaActual)
  }

  // Hook useEffect que se ejecuta una sola vez cuando el componente se monta
  // El array vacío [] como segundo parámetro indica que solo se ejecuta al inicio
  useEffect(function () {
    // Selecciona y muestra la primera pregunta aleatoria al cargar el juego
    seleccionarPreguntaAleatoria();
  }, []); // Array de dependencias vacío = solo se ejecuta una vez

  // Función que maneja la lógica cuando el jugador selecciona una respuesta
  // Recibe como parámetro la respuesta que el jugador ha clickeado
  function manejarRespuesta(respuesta) {
    // Compara la respuesta del jugador con la respuesta correcta de la pregunta actual
    if(respuesta !== preguntaActual.respuesta){
      // ❌ RESPUESTA INCORRECTA
      // Muestra un mensaje de alerta al jugador
      alert("Respuesta incorrecta");
      // Cambia a una nueva pregunta sin sumar quesitos
      seleccionarPreguntaAleatoria();
    } else {
      // ✅ RESPUESTA CORRECTA
      // Calcula el nuevo número de quesitos (suma 1 al actual)
      const nuevosQuesitos = quesitos + 1;
      // Actualiza el estado con el nuevo contador de quesitos
      setQuesitos(nuevosQuesitos);

      // Verifica si el jugador ha ganado el juego (7 o más quesitos)
      if(nuevosQuesitos >= 7 ){
        // 🎉 VICTORIA - El jugador ha conseguido todos los quesitos
        alert("Felicidades has ganado la partida");
        // Reinicia el juego a su estado inicial
        reiniciarJuego();
        return; // Sale de la función para no ejecutar el código de abajo
      } else {
        // 🎮 CONTINUAR JUGANDO - Aún no ha ganado
        // Selecciona una nueva pregunta para continuar
        seleccionarPreguntaAleatoria();
      }
    }
  }

  // Función que reinicia el juego a su estado inicial
  function reiniciarJuego() {
    // Resetea el contador de quesitos a 0
    setQuesitos(0);
    // Selecciona una nueva pregunta aleatoria para empezar de nuevo
    seleccionarPreguntaAleatoria();
  }

  // Renderizado del componente - define qué se muestra en pantalla
  return (
    <div>
      {/* Título principal del juego */}
      <h1>Trivia</h1>
      
      <div>
        {/* Muestra el texto de la pregunta actual usando {} para insertar JavaScript */}
        <h2>{preguntaActual.pregunta}</h2>
        
        <div>
          {/* Botón para la primera opción de respuesta (índice 0) */}
          {/* onClick ejecuta una función cuando se hace clic */}
          {/* La arrow function () => permite pasar parámetros a manejarRespuesta */}
          <button onClick={() => manejarRespuesta(preguntaActual.opciones[0])}>
            {preguntaActual.opciones[0]}
          </button>
          
          {/* Botón para la segunda opción de respuesta (índice 1) */}
          <button onClick={() => manejarRespuesta(preguntaActual.opciones[1])}>
            {preguntaActual.opciones[1]}
          </button>
          
          {/* Botón para la tercera opción de respuesta (índice 2) */}
          <button onClick={() => manejarRespuesta(preguntaActual.opciones[2])}>
            {preguntaActual.opciones[2]}
          </button>
          
          {/* Botón para la cuarta opción de respuesta (índice 3) */}
          <button onClick={() => manejarRespuesta(preguntaActual.opciones[3])}>
            {preguntaActual.opciones[3]}
          </button>
        </div>
      </div>

      {/* Imagen que muestra el quesito correspondiente al progreso del jugador */}
      {/* imagenesQuesitos[quesitos] selecciona la imagen según el número de quesitos */}
      {/* Si quesitos = 0 → muestra quesito0.png */}
      {/* Si quesitos = 3 → muestra quesito3.png, etc. */}
      <img
        src={imagenesQuesitos[quesitos]}
        style={{ width: '200px', height: '200px' }}
      />
    </div>
  );
}