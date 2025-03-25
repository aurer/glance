import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './app'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
)
