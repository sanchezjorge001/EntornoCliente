-- Ejercicio de Cookie con Context Api

/src
  ├── /assets          (tus imágenes: galleta.png, etc.)
  ├── /context         (Nueva carpeta)
  │     └── GameContext.jsx
  ├── /components      (Nueva carpeta)
  │     └── GameUI.jsx
  ├── App.jsx
  └── main.jsx


  ¡Genial! Esta es la forma profesional de hacerlo y la que probablemente te pedirán si el examen es práctico en un entorno real.

Vamos a dividir el proyecto en 3 archivos (más el principal App).

Shutterstock
Explorar

Estructura de Carpetas Recomendada
Imagina que tu proyecto se ve así:

Plaintext

/src
  ├── /assets          (tus imágenes: galleta.png, etc.)
  ├── /context         (Nueva carpeta)
  │     └── GameContext.jsx
  ├── /components      (Nueva carpeta)
  │     └── GameUI.jsx
  ├── App.jsx
  └── main.jsx
Aquí tienes el código separado archivo por archivo:

1. Archivo: src/context/GameContext.jsx
Este será el cerebro de tu aplicación. Aquí vive toda la lógica (reducer, useEffect y estado).

JavaScript

import { createContext, useContext, useReducer, useEffect } from 'react';

// Creamos el Contexto
const GameContext = createContext();

// Estado Inicial
const INITIAL_STATE = {
  cookies: 0,
  cursorCount: 0,
  clickMultiplier: 1,
  grandmaCount: 0,
  cursorPrice: 15,
  multiplierPrice: 50,
  grandmaPrice: 100,
  multiplierPriceIncrement: 1.2,
  cursorPriceIncrement: 1.1,
  grandmaPriceIncrement: 1.3,
};

// Reducer (Toda tu lógica de ifs)
function cookieReducer(state, action) {
  // ... (Aquí va EXACTAMENTE el mismo switch/ifs que tenías antes) ...
  // Por resumen, pongo la lógica abreviada, pero tú copias todo tu reducer aquí:
  
  let outputState = state;

  if (action.type === 'CLICK_COOKIE') {
      outputState = { ...state, cookies: state.cookies + state.clickMultiplier };
  } 
  else if (action.type === 'GENERATE_COOKIES') {
      outputState = { ...state, cookies: state.cookies + state.cursorCount * 0.1 + state.grandmaCount * 1 };
  }
  // ... Agrega aquí el resto de tus condiciones (BUY_CURSOR, etc) ...
  // IMPORTANTE: Recuerda añadir la lógica de compra aquí.
  
  return outputState;
}

// El Provider
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(cookieReducer, INITIAL_STATE);

  // El motor del tiempo
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'GENERATE_COOKIES' });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom Hook (Truco Pro para el examen):
// Esto ahorra tener que importar useContext y GameContext en cada componente
export function useGame() {
  return useContext(GameContext);
}

========================================================================================================

2. Archivo: src/components/GameUI.jsx
Esta es la cara de tu aplicación. Solo se encarga de pintar cosas. Fíjate que importamos useGame desde nuestro archivo anterior.

JavaScript

// Importamos nuestro Custom Hook
import { useGame } from '../context/GameContext';

// Importamos imágenes (Asegúrate que la ruta sea correcta)
import cookieImg from "../assets/galleta.png";
import cursorImg from "../assets/cursor.png";
import grandmaImg from "../assets/abuela.png";
import multiplierImg from "../assets/corre.png";

export default function GameUI() {
  // Usamos el hook para sacar los datos
  const { state, dispatch } = useG  ame();

  return (
    <div className='container'>
      {/* Sección superior */}
      <div className='row justify-content-center'>
        <h1 className='col-12'>{Math.round(state.cookies)} 🍪</h1>
        <button className='col-5' onClick={() => dispatch({ type: 'CLICK_COOKIE' })}>
          <img className='img-fluid' src={cookieImg} alt="Galleta" />
        </button>
      </div>

      {/* Sección botones */}
      <div className='row justify-content-center'>
        {/* Cursor */}
        <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_CURSOR' })}>
          <img className='img-fluid' src={cursorImg} alt="Cursor" />
          <p>x{state.cursorCount}</p>
        </button>

        {/* Multiplicador */}
        <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_MULTIPLIER' })}>
          <img className='img-fluid' src={multiplierImg} alt="Multiplicador" />
          <p>x{state.clickMultiplier}</p>
        </button>

        {/* Abuela */}
        <button className='col-md-2 col-12' onClick={() => dispatch({ type: 'BUY_GRANDMA' })}>
          <img className='img-fluid' src={grandmaImg} alt="Abuela" />
          <p>x{state.grandmaCount}</p>
        </button>
      </div>

      {/* Sección Precios */}
      <div className='row justify-content-center'>
         <p className='col-md-2'>Precio: {state.cursorPrice}</p>
         <p className='col-md-2'>Precio: {state.multiplierPrice}</p>
         <p className='col-md-2'>Precio: {state.grandmaPrice}</p>
      </div>
    </div>
  );
}

=============================================================================================================

3. Archivo: src/App.jsx
Este es el esqueleto que une todo. Queda muy limpio.

JavaScript

import './App.css'
// Importamos el Provider del contexto
import { GameProvider } from './context/GameContext';
// Importamos el componente visual
import GameUI from './components/GameUI';

function App() {
  return (
    // Envolvemos UI con la Lógica
    <GameProvider>
       <GameUI />
    </GameProvider>
  )
}

export default App;





_________________________________________________
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import canion from './assets/torre.png'
import { CañonProvider, useCañon } from './context/CañonContext'
import UpgardesBoard from './components/UpgardesBoard.jsx'

function AppContent() {
  const { state, dispatch } = useCañon();

  return (
    <div>
      <div>
        <h1>Defensor del Polo Norte</h1>
        <button onClick={() => dispatch({ type: 'CLICK_SHOT' })}>DISPARAR</button><br/>
        
        <img src={canion} alt="Cañón" width={200} />
      </div>
      <div>
        <UpgardesBoard />
      </div>
    </div>
  );
}

function App() {
  return (
    <CañonProvider>
      <AppContent />
    </CañonProvider>
  )
}

export default App



import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import canion from './assets/torre.png'
import { CañonProvider, useCañon } from './context/CañonContext'
import UpgardesBoard from './components/UpgardesBoard.jsx'

function AppContent() {
  const { state, dispatch } = useCañon();

  return (
    <div>
      <div>
        <h1>Defensor del Polo Norte</h1>
        <div>
          <p>Oleada: {state.waveNumber || 1}</p>
          <p>Daño de Oleada: {state.waveGoal}</p>
          <p>Caramelos: {state.caramels}</p>
        </div>
        <button onClick={() => dispatch({ type: 'CLICK_SHOT' })}>DISPARAR</button><br/>
        
        <img src={canion} alt="Cañón" width={200} />
      </div>
      <div>
        <UpgardesBoard />
      </div>
    </div>
  );
}

function App() {
  return (
    <CañonProvider>
      <AppContent />
    </CañonProvider>
  )
}

export default App





















import React, { createContext, use, useEffect, useReducer, useContext } from 'react'

const CañonContext = createContext();

const initialState = {
    damageDealt: 0,
    waveGoal: 100,
    caramels: 20,
    damagePerShot: 1,
    waveNumber: 1,
    autoShotsPerSecond: 1,
    priceMultiplier: 10,
    upgrades: {
        canionTurron: { damage: 2, price: 15, count: 0 },
        renosLanzamisiles: { damage: 5, price: 30, count: 0 },
        arbolLaser: { damage: 10, price: 50, count: 0 }
    },
};


function CañonReducer(state, action) {

    let output = state;

    if(action.type == 'CLICK_SHOT' && state.waveGoal > 0) {
        output = {
            ...state, 
            waveGoal: state.waveGoal - state.damagePerShot,
            damageDealt: state.damageDealt + state.damagePerShot
        }
    } else if(action.type == 'AUTO_SHOT' && state.waveGoal > 0) {
        output = {
            ...state, 
            waveGoal: state.waveGoal - state.autoShotsPerSecond * state.damagePerShot,
            damageDealt: state.damageDealt + state.autoShotsPerSecond * state.damagePerShot
        }

    } else if(action.type == 'BUY_MULTIPLIER' && state.caramels >= state.priceMultiplier) {
        output = {
            ...state, 
            caramels: state.caramels - state.priceMultiplier,
            autoShotsPerSecond: state.autoShotsPerSecond + 1,
            priceMultiplier: Math.round(state.priceMultiplier * 1.2),
        }

    } else if(action.type == 'BUY_DAMAGE_UPGRADE') {
        const upgradeType = action.payload;
        const upgrade = state.upgrades[upgradeType];
        
        if(state.caramels >= upgrade.price) {
            output = {
                ...state,
                caramels: state.caramels - upgrade.price,
                damagePerShot: state.damagePerShot + upgrade.damage,
                upgrades: {
                    ...state.upgrades,
                    [upgradeType]: {
                        ...upgrade,
                        count: upgrade.count + 1,
                        price: Math.round(upgrade.price * 1.15)
                    }
                }
            }
        }

    } else if(action.type == 'NEXT_WAVE' && state.waveGoal <= 0) {
        output = {
            ...state,
            waveNumber: state.waveNumber + 1,
            waveGoal: Math.round(state.waveGoal * 1.1 + 100),
            caramels: state.caramels + 10,
            damageDealt: 0,
        }
    }

    return output;
}

export function CañonProvider({ children }) {
    const [state, dispatch] = useReducer(CañonReducer, initialState);

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: 'AUTO_SHOT' });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <CañonContext.Provider value={{ state, dispatch }}>
            {children}
        </CañonContext.Provider>
    );
}

export function useCañon() {
    return useContext(CañonContext);
}


















export function CañonProvider({ children }) {
    const [state, dispatch] = useReducer(CañonReducer, initialState);

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: 'AUTO_SHOT' }); // ✅ Sin espacio
        }, 1000 / state.autoShotsPerSecond); // ✅ Dividir entre autoShotsPerSecond
        
        return () => clearInterval(timer);
    }, [state.autoShotsPerSecond]); // ✅ Añadir dependencia

    return (
        <CañonContext.Provider value={{ state, dispatch }}>
            {children}
        </CañonContext.Provider>
    );
}