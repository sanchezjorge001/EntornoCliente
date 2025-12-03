import './App.css'
import RuletaPalanca from './components/ruletaPalanca'
import Saldo from './components/saldo'
import Tablero from './components/tablero'

function App() {
  return (
    <div className='app'>
      <Saldo />
      <main className='escena-casino'>
        <h1 className='titulo-casino'>STEM Casino</h1>
          <section className='zona-juego'>
            <div className='ruleta-separada'>
              <RuletaPalanca />
            </div>
            <div className='tablero-separado' style={{marginTop: '20rem'}}>
              <Tablero />
            </div>
          </section>
      </main>
    </div>
  )
}

export default App
