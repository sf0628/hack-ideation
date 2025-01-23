import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useNavigate, Outlet } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

function Layout() {
  const navigate = useNavigate();
  
  const handleOnClickHome = () => {
    navigate('/');
  };

  const handleOnClickGames = () => {
    navigate("/explore");
  };

  const handleOnClickStats = () => {
    navigate("/stats");
  }

  return (
    <div className="flex h-screen">
      <header className="fixed top-0 left-0 right-0 w-full z-10 bg-gray-500">
        <Header onClickHome={handleOnClickHome} onClickGames={handleOnClickGames} onClickStats={handleOnClickStats}/>
      </header>
      <main className="flex-grow pt-16 overflow-hidden">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
    <RouterProvider router={router}/>
  </StrictMode>,
)
