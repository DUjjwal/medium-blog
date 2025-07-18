import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  
    <RecoilRoot>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </RecoilRoot>
  
)
