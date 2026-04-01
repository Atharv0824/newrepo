import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastProvider } from './context/ToastContext'
import ErrorBoundary from './components/ui/ErrorBoundary'
import { DarkModeProvider } from './context/DarkModeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <DarkModeProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </DarkModeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)