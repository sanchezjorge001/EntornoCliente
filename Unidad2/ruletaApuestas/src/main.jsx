import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CasinoProvider } from './context/CasinoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CasinoProvider>
      <App />
    </CasinoProvider>
  </StrictMode>,
)
