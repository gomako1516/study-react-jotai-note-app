import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

// ConvexProviderを作成することで、Convexサーバと通信できるようにする。
// Appをラップし、どのコンポーネントからでもConvexのAPIを呼び出せるようにする。

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <div className='flex h-screen w-screen'>
        <App />
      </div>
    </ConvexProvider>
  </StrictMode>,
)
