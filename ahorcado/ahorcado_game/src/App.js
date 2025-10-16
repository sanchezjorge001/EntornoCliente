import React, { useState, useEffect, useMemo } from 'react';

// Importar imágenes desde src/images
import img0 from './images/0.png';
import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';
import img5 from './images/5.png';
import img6 from './images/6.png';

export default function App() {
  const maxWrong = 6;
  const words = ["computadora", "bicicleta", "volcan", "escuela", "jirafa", "chocolate", "planeta", "biblioteca", "telefono", "montaña", "pirata", "astronauta", "teclado", "castillo", "mariposa"];

  // Array de imágenes
  const imagesArray = useMemo(() => [img0, img1, img2, img3, img4, img5, img6], []);

  // Estado del juego
  const [secret, setSecret] = useState(() => randomWord(words));
  const [guessed, setGuessed] = useState(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    checkEnd();
    
  }, [guessed, wrongCount, secret]);

  function randomWord(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function randomize() {
    setSecret(randomWord(words));
    setGuessed(new Set());
    setWrongCount(0);
    setGameOver(false);
    setWon(false);
  }

  function handleGuess(letter) {
    if (gameOver) return;
    letter = letter.toLowerCase();
    if (guessed.has(letter)) return;

    const next = new Set(guessed);
    next.add(letter);
    setGuessed(next);

    if (!secret.includes(letter)) {
      setWrongCount(c => Math.min(c + 1, maxWrong));
    }
  }

  function checkEnd() {
    if (wrongCount >= maxWrong) {
      setGameOver(true);
      setWon(false);
      return;
    }

    const letters = new Set(secret.toLowerCase().replace(/[^a-zñáéíóúü]/g, '').split(''));
    let all = true;
    for (let l of letters) {
      if (!guessed.has(l)) {
        all = false;
        break;
      }
    }

    if (all && secret.length > 0) {
      setGameOver(true);
      setWon(true);
    }
  }

  function revealWord() {
    return secret
      .split('')
      .map(ch => {
        if (/[^a-zñáéíóúü]/i.test(ch)) return ch;
        return guessed.has(ch.toLowerCase()) ? ch : '_';
      })
      .join(' ');
  }

}
