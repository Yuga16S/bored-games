import GameState from './GameState_TTT.js'

function GameOver({gameState}) {
    switch (gameState) {
        case GameState.inProgress:
            return <></>;
        case GameState.playerXWins:
            return <div className="game-over-ttt">X Wins</div>
        case GameState.playerOWins:
            return <div className="game-over-ttt">O Wins</div>
        case GameState.draw:
            return <div className="game-over-ttt">Draw</div>
        default:
            return <></>                
    }
}

export default GameOver;