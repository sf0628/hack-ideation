import { useEffect, useState } from 'react'
import { Game as GameModel} from './models/game';
import * as GamesApi from "./network/games_api";
import Header from './components/Header';
import WelcomePage from './pages/WelcomePage';
import { useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);
  const [games, setGames] = useState<GameModel[]>([]); // array of notes

  useEffect(() => {
    async function loadGames() {
      try {
        const games = await GamesApi.fetchGames();
        setGames(games);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadGames();
  }, []); // empty array, executes on first render, no array, execute on every render

  return (
    <div className="">
      <WelcomePage />
      
      <p>meow</p>
    </div>
  );
}

export default App;
