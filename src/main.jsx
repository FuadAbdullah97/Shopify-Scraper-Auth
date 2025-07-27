import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ProductLimitProvider} from "./context/ProductLimitContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ProductLimitProvider>
          <App />
      </ProductLimitProvider>
  </StrictMode>,
)
