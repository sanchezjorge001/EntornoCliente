// Importa React y el hook useContext para poder usar el contexto.
import React, { useContext } from 'react';
// Importa el contexto del carrito para poder acceder a la función dispatch.
import { CartContext } from '../context/CartContext';

// El componente Tienda que muestra los productos disponibles.
function Tienda() {
  // Usa el hook useContext para obtener la función dispatch del CartContext.
  // dispatch se utiliza para enviar acciones al reducer y actualizar el estado del carrito.
  const { dispatch } = useContext(CartContext);

  // Un array de objetos que representa los productos disponibles en la tienda.
  const productos = [
    { id: 1, name: 'Laptop Gamer', price: 1000 },
    { id: 2, name: 'Auriculares Sony', price: 200 },
    { id: 3, name: 'Teclado Mecánico', price: 150 },

  ];

  
  return (
    <div>
      {/* Mapea sobre el array de productos para mostrar cada uno. */}
      {productos.map((producto) => (
        <div key={producto.id}>
          <h3>{producto.name}</h3>
          <p>${producto.price}</p>
          {/* Botón para añadir el producto al carrito. */}
          {/* Al hacer clic, se despacha una acción de tipo 'AGREGAR_AL_CARRITO' con el producto como payload. */}
          <button
            onClick={() =>
              dispatch({ type: 'AGREGAR_AL_CARRITO', producto: producto })
            }
          >
            Añadir al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

// Exporta el componente Tienda para que pueda ser utilizado en otros lugares.
export default Tienda;