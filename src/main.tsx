import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { RecoilRoot } from 'recoil'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
)
