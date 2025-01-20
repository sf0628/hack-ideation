import { Game } from "../models/game";
// make error handling for when fetching doesn't work
async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage); 
        // later distinguish between different error codes and make messages more specific
    }
}

export async function fetchGames(): Promise<Game[]> {
    const response = await fetch ("http://localhost:5001/api/games", {method: "GET"});
    return response.json(); // because of the endpoint sending json
}