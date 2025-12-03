// Importa React y el hook useContext para poder usar el contexto.
import React from 'react';
import { useContext } from 'react';
// Importa el contexto del carrito para poder acceder al estado del carrito y la función dispatch.
import { CartContext } from '../context/CartContext';

// El componente Carrito que muestra los productos añadidos.
function Carrito() {
  // Usa el hook useContext para obtener el estado del carrito y la función dispatch del CartContext.
  const { carrito, dispatch } = useContext(CartContext);

  // Calcula el precio total de los productos en el carrito.
  // reduce() es un método de array que ejecuta una función reductora sobre cada elemento del array, devolviendo como resultado un único valor.
  const total = carrito.reduce((acc, producto) => acc + producto.price, 0);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        width: '45%',
        backgroundColor: '#f9f9f9',
        color: '#000',
      }}
    >
      <h3>🛒 Carrito ({carrito.length})</h3>

      {/* Comprueba si el carrito está vacío. */}
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        // Si el carrito no está vacío, muestra los productos.
        <>
          <ul>
            {/* Mapea sobre el array del carrito para mostrar cada producto. */}
            {/* Se usa el índice como clave por si se añade el mismo producto varias veces. */}
            {carrito.map((prod, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                <span>
                  {prod.name} - ${prod.price}
                </span>
                {/* Botón para eliminar un producto del carrito. */}
                {/* Al hacer clic, se despacha una acción de tipo 'REMOVER_DEL_CARRITO' con el id del producto. */}
                <button
                  onClick={() =>
                    dispatch({ type: 'REMOVER_DEL_CARRITO', id: prod.id })
                  }
                  style={{
                    marginLeft: '10px',
                    color: 'red',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                    border: '1px solid red',
                    padding: '2px 8px',
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <h4>Total: ${total}</h4>
          {/* Botón para vaciar todo el carrito. */}
          {/* Al hacer clic, se despacha una acción de tipo 'VACIAR_CARRITO'. */}
          <button onClick={() => dispatch({ type: 'VACIAR_CARRITO' })}>
            Vaciar Carrito
          </button>
          
        </>
      )}
    </div>
  );
}

// Exporta el componente Carrito.
export default Carrito;