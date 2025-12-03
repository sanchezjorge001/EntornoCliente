// Importa createContext y useReducer desde React.
// createContext nos permite crear un contexto que los componentes pueden proveer o leer.
// useReducer es un hook para manejar el estado de una manera más compleja que useState.
import { createContext, useReducer } from 'react';

// Crea el Contexto del Carrito. Este será el objeto que los componentes consumirán.
export const CartContext = createContext();

// El estado inicial del carrito es un array vacío.
const INITIAL_STATE = [];

// La función reducer del carrito. Maneja las acciones que modifican el estado del carrito.
// Recibe el estado actual y una acción, y devuelve el nuevo estado.
function CartReducer(state, action) {
  switch (action.type) {
    // Caso para agregar un producto al carrito.
    case 'AGREGAR_AL_CARRITO':
      // action.producto es el payload que contiene el producto a añadir.
      const nuevoProducto = action.producto;
      // Devuelve un nuevo array con todos los productos del estado anterior más el nuevo producto.
      // Se usa el operador de propagación (...) para no mutar el estado original.
      return [...state, nuevoProducto];

    // Caso para remover un producto del carrito.
    case 'REMOVER_DEL_CARRITO':
      // action.id es el payload que contiene el id del producto a remover.
      // filter() crea un nuevo array con todos los elementos que pasan la prueba implementada por la función dada.
      // En este caso, mantiene todos los productos cuyo id no coincide con el id a remover.
      return state.filter((producto) => producto.id !== action.id);

    // Caso para vaciar completamente el carrito.
    case 'VACIAR_CARRITO':
      // Devuelve un array vacío, que es el estado inicial.
      return [];

    // Si la acción no coincide con ningún caso, devuelve el estado actual sin cambios.
    default:
      return INITIAL_STATE;
  }
}

// El componente proveedor del contexto.
// Este componente envolverá a otros componentes para darles acceso al contexto del carrito.
export function CartProvider({ children }) {
  // useReducer toma la función reducer y el estado inicial, y devuelve el estado actual y una función dispatch.
  // 'carrito' es el estado actual de nuestro carrito de compras.
  // 'dispatch' es la función que usamos para enviar acciones a nuestro reducer.
  const [carrito, dispatch] = useReducer(CartReducer, INITIAL_STATE);

  return (
    // El componente Provider del contexto.
    // El prop 'value' es donde pasamos el estado y la función dispatch que queremos que estén disponibles para los componentes consumidores.
    <CartContext.Provider value={{ carrito, dispatch }}>
      {/* 'children' representa a todos los componentes que están envueltos por CartProvider. */}
      {children}
    </CartContext.Provider>
  );
}