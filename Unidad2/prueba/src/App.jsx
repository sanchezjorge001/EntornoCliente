import { useReducer, useState } from 'react'; // ¡Aquí usaremos los dos!

function bancoReducer(state, action) {
    switch (action.type) {
        case 'INGRESAR':
            return { ...state, saldo: state.saldo + action.cantidad };
        case 'RETIRAR':
            if (state.saldo - action.cantidad < 0) {
                alert("No tienes suficiente saldo.");
                return state;
            }
            return { ...state, saldo: state.saldo - action.cantidad };
        case 'CHANGE_NAME':
            // Aquí no hay que cambiar nada, tu lógica ya era perfecta
            return { ...state, nombre: action.nombre };
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(bancoReducer, {
        nombre: 'Jorge',
        edad: 21,
        saldo: 1000,
    });

    // 1. Estado temporal solo para el input
    const [nuevoNombre, setNuevoNombre] = useState(''); 

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Billetera de: {state.nombre}</h2>
            
            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                <p>Cambio de titular:</p>
                {/* 2. Este input debe controlar 'nuevoNombre', NO el dispatch directamente */}
                <input
                    type="text"
                    placeholder="Escribe nuevo nombre..."
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)} // 
                />
                
                {/* 3. Al hacer click, enviamos lo que hay en 'nuevoNombre' al reducer */}
                <button onClick={() => dispatch({ type: 'CHANGE_NAME', nombre: nuevoNombre })}>
                    Guardar Cambio
                </button>
            </div>

            <p>Edad del titular: {state.edad}</p>
            <h1>Saldo: ${state.saldo}</h1>
            <hr />

            {/* Tus botones de dinero siguen igual... */}
             <button onClick={() => dispatch({ type: 'INGRESAR', cantidad: 100 })}>+ 100</button>
             <button onClick={() => dispatch({ type: 'RETIRAR', cantidad: 100 })}>- 100</button>
        </div>
    );
}

export default App;