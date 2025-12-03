import { useReducer, useState } from 'react';

function listaReducer(state, action) {
    switch (action.type) {
        case 'AGREGAR':
            const nuevoInvitado = { id: Date.now(), nombre: action.nombre };
           return {
                ...state,
                invitados: [...state.invitados, nuevoInvitado]
            };

        case 'ELIMINAR':
            return {
                ...state,
                invitados: state.invitados.filter(invitado => invitado.id !== action.id)
            };

        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(listaReducer, {
        invitados: [{ id: 1, nombre: 'Elon Musk' }]
    });

    const [nombreInput, setNombreInput] = useState('');

    const handleAgregar = () => {
        if (nombreInput.trim() === '') return; // Evitar vacíos
        dispatch({ type: 'AGREGAR', nombre: nombreInput });
        setNombreInput(''); // Limpiar input
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Lista de Invitados VIP ({state.invitados.length})</h2>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    value={nombreInput}
                    onChange={(e) => setNombreInput(e.target.value)}
                    placeholder="Nuevo invitado..."
                />
                <button onClick={handleAgregar}>Agregar</button>
            </div>

            <ul>
                {state.invitados.map((invitado) => (
                    <li key={invitado.id} style={{ marginBottom: '10px' }}>
                        {invitado.nombre} 
                        {/* Botón para eliminar a ESTE invitado específico */}
                        <button 
                            onClick={() => dispatch({ type: 'ELIMINAR', id: invitado.id })}
                            style={{ marginLeft: '10px', color: 'red' }}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;