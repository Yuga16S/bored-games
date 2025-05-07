import GameState from './GameState.js'

function GameOver({gameState, scores, player1, player2}) {
    switch (gameState) {
        case GameState.IN_PROGRESS:
            return <></>;
        case GameState.WIN:
            let winner = '';
            if(scores[player1] > scores[player2]) {
                winner = player1;
            } else {
                winner = player2;
            }
            return <div className="dnb-game-over">{winner} wins! 🏆 </div>
        case GameState.DRAW:
            return <div className="dnb-game-over">Draw 😐</div>
        default:
            return <></>                
    }
}

export default GameOver;