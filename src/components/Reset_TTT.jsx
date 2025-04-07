import GameState from "./GameState_TTT.js";

function Reset({gameState, onReset}) {
    console.log("Current GameState:", gameState);
    if (gameState === GameState.inProgress) {
        return null;
    }
    return (<button onClick={onReset} className="reset-button-ttt">Play again</button>) ;
}

export default Reset;