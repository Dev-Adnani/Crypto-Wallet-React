import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Buffer } from 'buffer';
import { RecoilRoot } from 'recoil';

(window as any).Buffer = Buffer;
createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
  <App />
</RecoilRoot>,
)
