import GameState from './GameState_TTT.js'

function GameOver({gameState}) {
    switch (gameState) {
        case GameState.inProgress:
            return <></>;
        case GameState.playerXWins:
            return <div className="tictactoe-game-over">X Wins</div>
        case GameState.playerOWins:
            return <div className="tictactoe-game-over">O Wins</div>
        case GameState.draw:
            return <div className="tictactoe-game-over">Draw</div>
        default:
            return <></>                
    }
}

export default GameOver;