// Importa los componentes Carrito y Tienda, así como el proveedor de contexto CartProvider.
import Carrito from './components/Carrito.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Tienda from './components/Tienda.jsx';

// El componente principal de la aplicación.
function App() {
  return (
    // El CartProvider envuelve a los componentes que necesitan acceso al estado del carrito.
    // Proporciona el estado del carrito y la función dispatch a todos sus hijos.
    <CartProvider>
      <h1>Tienda de Productos</h1>
      {/* El componente Tienda muestra la lista de productos disponibles. */}
      <Tienda />
      {/* El componente Carrito muestra los productos que se han añadido al carrito. */}
      <Carrito />
    </CartProvider>
  );
}

// Exporta el componente App para que pueda ser utilizado en otros lugares de la aplicación.
export default App;