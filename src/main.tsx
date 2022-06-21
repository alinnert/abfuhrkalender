import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App'
import './main.scss'

const container = document.getElementById('root')

if (container !== null) {
  const jsx = (
    <StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </StrictMode>
  )

  createRoot(container).render(jsx)
}
