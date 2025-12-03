import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListaCartas from './pages/ListaCartas';
import DetalleCarta from './pages/DetalleCarta';
import CrearCarta from './pages/CrearCarta';
import './App.css'
import ModificarCarta from './pages/EditarCarta';

function App() {

  return (
    <>
      <Router>
        {/* Barra de navegación con enlaces dinámicos */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/nueva-carta">Nueva Carta</Link>
        </nav>

        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<ListaCartas />} />
          <Route path="/carta/:id" element={<DetalleCarta />} />
          <Route path="/nueva-carta" element={<CrearCarta />} />
          <Route path="/modificar-carta" element={<ModificarCarta />} />
        </Routes>
      </Router>
    </>
  )
}

export default App