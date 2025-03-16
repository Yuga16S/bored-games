import GameState from "./GameState.js";

function Reset({gameState, onReset}) {
    if(gameState === GameState.IN_PROGRESS) {
        return null; // return nothing when the game is in progress
    }
    return <button onClick={onReset} className="reset-button">Play again</button>;
}

export default Reset;