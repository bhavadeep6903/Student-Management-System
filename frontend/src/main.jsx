import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Master from './components/Master.jsx'
import Login from './components/Login.jsx'

createRoot(document.getElementById('root')).render(
  <Master></Master>
)
