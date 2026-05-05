import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { scan } = await import('react-scan')

    scan({
      enabled: true,
      showToolbar: true,
      trackUnnecessaryRenders: true,
    })
  }

  createRoot(document.getElementById('root')!).render(<App />)
}

void bootstrap()
