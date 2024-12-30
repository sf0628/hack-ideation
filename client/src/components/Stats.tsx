import { Stats as StatsModel } from "../models/stats";
import { Game as GameModel } from "../models/game";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StatsProps {
    stats: StatsModel,
    games: GameModel[],
}

// update the data points and make the styling pretty
function Stats({ stats, games }: StatsProps) {
    const navigate = useNavigate();

    const [game, setGame] = useState<GameModel>();

    const {
        _id,
        game_id,
        number,
        title,
        comments,
        leaderboard,
        createdAt,
        updatedAt,
    } = stats; // destructured game statistics

    // get game as useEffect
    useEffect(() => {
        setGame(getGameByID(game_id));
    }, []);

    // get the game object given the game id
    const getGameByID = (gameID: string): GameModel => {
        games.forEach((game) => {
            if (game._id == _id) {
                return game;
            }
        });
        return null;
    };

    // handle navigate click game
    const handleClickGame = (gameID: string) => {
        navigate(`/game/${gameID}`);
    };

    // FIX STYLING
    return (
        <div className="">
            <h2 className="">{title}</h2>
            <h2 className="">{number}th game!</h2> 
            <p>{createdAt}</p>
            <p>{updatedAt}</p>
            <p onClick={() => handleClickGame(game_id)}>Game: {game.title}</p>
            {comments && ( <p className="">{comments}</p> )}
            <p>{leaderboard}</p>
        </div>
    );
}

export default Stats;