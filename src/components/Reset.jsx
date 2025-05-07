import GameState from "./GameState.js";

function Reset({gameState, onReset}) {
    if(gameState === GameState.IN_PROGRESS) {
        return null;
    }
    return <button onClick={onReset} className="dnb-reset-button">Play again</button>;
}

export default Reset;