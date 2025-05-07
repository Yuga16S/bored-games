import React, { useEffect, useState } from 'react';
import Canvas from './Canvas.jsx';
import GameState from './GameState.js';
import Reset from './Reset.jsx';
import gameOverSoundAsset from '../sounds/Game_over_win.wav';
import clickSoundAsset from '../sounds/click.wav';
import drawSoundAsset from '../sounds/draw.wav';
import GameOver from './GameOver.jsx';
import Header from './Header.jsx';
import Confetti from 'react-confetti';
import '../DotsAndBoxes.css';
import Footer from './Footer.jsx';

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;
const drawSound = new Audio(drawSoundAsset);
drawSound.volume = 0.5;

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

function DotsAndBoxes({ authenticated , onLogout }) {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [gameState, setGameState] = useState(GameState.NOT_STARTED);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [turns, setTurns] = useState(1);
    const [drawLines, setDrawLines] = useState([]); 
    const [completedBoxes, setCompletedBoxes] = useState([]); 
    const [scores, setScores] = useState({}); 
    const [hoveredLine, setHoveredLine] = useState(null);
    const [p1Streak, setP1Streak] = useState(0);
    const [p2Streak, setP2Streak] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [width, height] = useWindowSize();

    useEffect(() => {
        if(drawLines.some((line) => line !== null)) {
            clickSound.play();
        }
    }, [drawLines]);

    useEffect(() => {
        if(gameState === GameState.WIN) {
            gameOverSound.play();
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    },[gameState]);

    useEffect(() => {
        if(gameState === GameState.DRAW) {
            drawSound.play();
        }
    }, [gameState]);

    const canvasSize = 600;

    const isStartEnabled = player1.trim() !== '' && player2.trim() !== '';

    function handlePlayer1Change(e) {
        setPlayer1(e.target.value);
    }

    function handlePlayer2Change(e) {
        setPlayer2(e.target.value);
    }

    function handleStartGame() {
        setGameState(GameState.IN_PROGRESS);
        setCurrentPlayer(player1);
        setScores({ [player1]: 0, [player2]: 0 });
    }

    const resetGame = () => {
        setGameState(GameState.NOT_STARTED);
        setDrawLines([]);
        setCompletedBoxes([]);
        setTurns(1);
        setCurrentPlayer("Player 1");
        setPlayer1('');
        setPlayer2('');
        setScores({ [player1]: 0, [player2]: 0 });
        setHoveredLine(null);
        setP1Streak(0);
        setP2Streak(0);
    };

    return ( 
        <div className="dnb-game-container">
        {showConfetti && <Confetti width={width} height={height} numberOfPieces={1000} recycle={false} gravity={0.8} colors={['#ff0', '#f0f', '#0ff', '#0f0', '#f90']} />}
        <Header authenticated={authenticated} onLogout={onLogout} />   
        <main className="dnb-main">
        <h1 className="dnb-heading">Dots and boxes</h1>
        {gameState === GameState.NOT_STARTED ? (
            <>
            <div className="dnb-player-inputs">
                <div>
                    <label style={{ color: '#05aeb4' }}>Player 1: </label>
                    <input type="text" value={player1} onChange={(e) => {handlePlayer1Change(e)} } placeholder="Enter initials" maxLength={2} />
                </div>
                <div>
                    <label style={{ color: '#05aeb4' }}>Player 2: </label>
                    <input type="text" value={player2} onChange={(e) => {handlePlayer2Change(e)} } placeholder="Enter initials" maxLength={2} />
                </div>
                <button disabled={!isStartEnabled} onClick={handleStartGame}>START</button>
            </div>
            </>
        ) : ( 
        <>
        <Canvas player1={player1}
                player2={player2}
                gameState={gameState}
                setGameState={setGameState}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                drawLines={drawLines}
                setDrawLines={setDrawLines}
                completedBoxes={completedBoxes}
                setCompletedBoxes={setCompletedBoxes}
                scores={scores}
                setScores={setScores} 
                turns={turns}
                setTurns={setTurns} 
                hoveredLine={hoveredLine} 
                setHoveredLine={setHoveredLine} 
                canvasSize={canvasSize}
                p1Streak={p1Streak}
                setP1Streak={setP1Streak}
                p2Streak={p2Streak}
                setP2Streak={setP2Streak}
                />
        {gameState === GameState.IN_PROGRESS && (
            <div className="dnb-current-turn">
                <h2>Player ( {currentPlayer} ) turn</h2>
            </div>
        )}

        {gameState !== GameState.NOT_STARTED && (
            <div className='dnb-score-board'>
                <h3>Score ({player1})  :  {scores[player1]}</h3>
                <h3>Score ({player2})  :  {scores[player2]}</h3>
            </div>
        )}

        {gameState !== GameState.IN_PROGRESS && (
            <div className='dnb-result-container'>
                <div className='dnb-game-over-container'>
                    <GameOver gameState={gameState} scores={scores} player1={player1} player2={player2} />
                </div>
                <div className='dnb-reset-container'>
                    <Reset onReset={resetGame}/>
                </div>
            </div>
        )}
        </>
        )}
        </main>
        <Footer />
    </div> );
}

export default DotsAndBoxes;