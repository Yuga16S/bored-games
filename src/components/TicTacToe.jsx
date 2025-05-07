import {useState, useEffect} from 'react';
import Board from './Board.jsx';
import GameOver from './GameOver_TTT.jsx';
import GameState from './GameState_TTT.js';
import Reset from './Reset_TTT.jsx';
import gameOverSoundAsset from '../sounds/slot-machine-win.wav';
import clickSoundAsset from '../sounds/click.wav';
import drawSoundAsset from '../sounds/draw.wav';
import Header from './Header.jsx';
import Confetti from 'react-confetti';
import Footer from './Footer.jsx';
import '../TicTacToe.css';

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;
const drawSound = new Audio(drawSoundAsset);
drawSound.volume = 0.5;

const PLAYER_X = "X";
const PLAYER_O = "O";

function useWindowSize() {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

const winningCombinations = [
    //rows
    {combo:[0,1,2], strikeClass: "strike-row-1"},
    {combo:[3,4,5], strikeClass: "strike-row-2"},
    {combo:[6,7,8], strikeClass: "strike-row-3"},
    //columns
    {combo:[0,3,6], strikeClass: "strike-column-1"},
    {combo:[1,4,7], strikeClass: "strike-column-2"},
    {combo:[2,5,8], strikeClass: "strike-column-3"},
    //diagonal
    {combo:[0,4,8], strikeClass: "strike-diagonal-1"},
    {combo:[2,4,6], strikeClass: "strike-diagonal-2"},
];

function checkWinner(tiles, setStrikeClass, setGameState) {
    for(const winningCombo of winningCombinations) {
        const {combo, strikeClass} = winningCombo;
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];

        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            setStrikeClass(strikeClass);
            if(tileValue1 === PLAYER_X) {
                setGameState(GameState.playerXWins);
            } else {
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }

    const areAllTilesFilledIn = tiles.every((tile) => tile != null);
    if(areAllTilesFilledIn) {
        setGameState(GameState.draw);
    }
}

function TicTacToe({ authenticated , onLogout }) {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [showConfetti, setShowConfetti] = useState(false);
    const [width, height] = useWindowSize();

    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]);

    useEffect(() => {
        if(tiles.some((tile) => tile !== null)) {
            clickSound.play();
        }
    }, [tiles]);

    useEffect(() => {
        if((gameState !== GameState.inProgress) && (gameState !== GameState.draw)) {
            gameOverSound.play();
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [gameState]);

    useEffect(() => {
        if(gameState === GameState.draw) {
            drawSound.play();
        }
    }, [gameState]);

    const handleTileclick = (index) => {
        if(gameState !== GameState.inProgress) {
            return;
        }
        if(tiles[index] !== null) {
            return;
        }
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        if(playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        } else {
            setPlayerTurn(PLAYER_X);
        }
    }

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    }

    return (
    <div className="tictactoe-game-container">
        {showConfetti && <Confetti width={width} height={height} numberOfPieces={1000} recycle={false} gravity={0.8} colors={['#ff0', '#f0f', '#0ff', '#0f0', '#f90']} />}
        <Header authenticated={authenticated} onLogout={onLogout} />
        <main className="tictactoe-main">
            <h1 className="tictactoe-heading">Tic Tac Toe</h1>
            <Board playerTurn={playerTurn} tiles={tiles} onTileClick = {handleTileclick} strikeClass={strikeClass}/>
            <GameOver gameState={gameState}/>
            <Reset onReset={handleReset} gameState={gameState}/>
        </main>
        <Footer />
    </div>
    );
}

export default TicTacToe;