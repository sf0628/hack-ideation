import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useNavigate, Outlet } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

const navigate = useNavigate();

const handleOnClickHome = () => {
  navigate('/');
};

const handleOnClickGames = () => {
  navigate("/explore");
};

const handleOnClickCreateGame = () => {
  navigate("/profile");
};

const handleOnClickStats = () => {
  navigate("/stats");
}

function Layout() {
  return (
    <>
      <Header onClickHome={handleOnClickHome} onClickGames={handleOnClickGames} onClickCreateGame={handleOnClickCreateGame}/>
      <Outlet /> 
      <Footer />
    </>
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
    <App />
  </StrictMode>,
)
