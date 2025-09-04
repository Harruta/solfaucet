import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import App from './App.jsx'

// Add gradient background to body
document.body.className = 'bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 bg-fixed font-sans antialiased'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
