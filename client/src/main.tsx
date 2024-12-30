import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { // welcome page
        path: '/',
        element: <App />
      },
      { // start and configure game
        path: '/start-game',
        element: <App />
      },
      { // in game
        path: '/game',
        element: <App />

      }, 
      { // look at the previous game statistics
        path: '/stats',
        element: <App />
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
