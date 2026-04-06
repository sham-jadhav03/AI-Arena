import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { ChatProvider } from './context/chat.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>

  </StrictMode>,
)
