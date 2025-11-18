import '../App.css'
import { useCasino } from '../context/CasinoContext.jsx'

function Saldo() {
  const {
    saldo,
    modal,
    cantidad,
    abrirModal,
    cerrarModal,
    procesarOperacion,
    setCantidad
  } = useCasino()

  return (
    <div className="saldo">
      <span>Saldo restante:</span>
      <strong>{saldo.toLocaleString('es-ES')}€</strong>
      <div className="acciones-saldo">
        <button onClick={() => abrirModal('depositar')}>Depositar</button>
        <button onClick={() => abrirModal('retirar')}>Retirar</button>
      </div>

      {modal.abierto && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>{modal.tipo === 'depositar' ? 'Depositar' : 'Retirar'} saldo</h3>
            <input
              type="number"
              min="0"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <div className="modal-acciones">
              <button
                onClick={procesarOperacion}
                disabled={!cantidad}
              >
                Confirmar
              </button>
              <button onClick={cerrarModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Saldo

