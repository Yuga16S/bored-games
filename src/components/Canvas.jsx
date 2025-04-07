import React, {useEffect, useState} from 'react';
import GameState from './GameState.js';

function Canvas({player1,
    player2,
    gameState,
    setGameState,
    currentPlayer,
    setCurrentPlayer,
    drawLines,
    setDrawLines,
    completedBoxes,
    setCompletedBoxes,
    scores,
    setScores,
    turns,
    setTurns,
    hoveredLine,
    setHoveredLine,
    canvasSize,
    p1Streak,
    setP1Streak,
    p2Streak,
    setP2Streak }) {

    const rows = 5;
    const cols = 5;

    const spacingX = canvasSize / (cols - 1) - 1;
    const spacingY = canvasSize / (rows - 1) - 1;

    
    const createDots = () => {
        const dots = [];

        for(let i = 0; i < rows; i++) {
            const row = [];
            for(let j = 0; j < cols; j++) {
                row.push({x: j * spacingX, y: i * spacingY});
            }
            dots.push(row);
        }
        return dots;
    };

    const [dots] = useState(createDots());
    const isGameOver = gameState === 'WIN' || gameState === 'DRAW';

    useEffect(() => {
        // Check if all boxes are completed
        if (completedBoxes.length === (rows - 1) * (cols - 1)) {
            const player1Score = scores[player1] || 0;
            const player2Score = scores[player2] || 0;

            if (player1Score > player2Score) {
                setGameState(GameState.WIN);
                //alert(`${player1} WINS!`);
            } else if (player2Score > player1Score) {
                setGameState(GameState.WIN);
                //alert(`${player2} WINS!`);
            } else {
                setGameState(GameState.DRAW);
                //alert("It's a draw!");
            }
        }
    }, [scores, completedBoxes, player1, player2, setGameState]);

  /*  useEffect(() => {
        if (gameState !== GameState.NOT_STARTED) {
            calculateScores();
            console.log("I ran!!!")
        }
    }, [completedBoxes]); 

    useEffect(() => {
        if (gameState === 'WIN' || gameState === 'DRAW') {
            calculateScores();
            console.log("Victory or Draw and I ran!!!")
        }
    }, [gameState, completedBoxes]); 

    const calculateScores = () => {
        const player1Score = (completedBoxes.filter(box => box.owner === player1).length)*10;
        const player2Score = (completedBoxes.filter(box => box.owner === player2).length)*10;
        setScores({ [player1]: player1Score, [player2]: player2Score });
    }; */

    function handleMouseMove(e) {
        let canvas = e.currentTarget;  // guarantees the canvas, not a dot
        const rect = canvas.getBoundingClientRect();  //gets the position of canvas from viewport(browser) from browser(left) to canvas left, browser(top) to top of the canvas.
        const mouseX = e.clientX - rect.left; // e.clientX and e.clientY gives the position of mouse from the view port. With this and the position of canvas from the view port we will be able to find the exact X and Y
        const mouseY = e.clientY - rect.top;

        if (mouseX < 0 || mouseX > canvasSize || mouseY < 0 || mouseY > canvasSize) {
            setHoveredLine(null);
            return;
        }

        let closestLine = null;
        let minDistance = 15;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (j < cols - 1) {
                    const midX = (dots[i][j].x + dots[i][j + 1].x) / 2;
                    const midY = dots[i][j].y;
                    const distance = Math.hypot(mouseX - midX, mouseY - midY); // Euclidean formula to find straight line diff between two points
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestLine = { x1: dots[i][j].x, y1: dots[i][j].y, x2: dots[i][j + 1].x, y2: dots[i][j + 1].y, direction: 'horizontal' };
                    }
                }
                if (i < rows - 1) {
                    const midX = dots[i][j].x;
                    const midY = (dots[i][j].y + dots[i + 1][j].y) / 2;
                    const distance = Math.hypot(mouseX - midX, mouseY - midY);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestLine = { x1: dots[i][j].x, y1: dots[i][j].y, x2: dots[i + 1][j].x, y2: dots[i + 1][j].y, direction: 'vertical'};
                    }
                }
            }
        }
        if (closestLine) {
            setHoveredLine(closestLine);
        } else {
            setHoveredLine(null); // No line detected
        }
    }

    function handleClick(e) {
        if (gameState !== GameState.IN_PROGRESS) {
            return; // Ignore clicks if the game is not in progress
        }
        if (hoveredLine && !isGameOver) {
            const lineExists = drawLines.some(line => 
                (line.x1 === hoveredLine.x1 && line.y1 === hoveredLine.y1 && line.x2 === hoveredLine.x2 && line.y2 === hoveredLine.y2) ||
                (line.x1 === hoveredLine.x2 && line.y1 === hoveredLine.y2 && line.x2 === hoveredLine.x1 && line.y2 === hoveredLine.y1)
            );
            // If the line already exists, do nothing
            if (lineExists) {
                return;
            }
            const newLines = [...drawLines, hoveredLine];
            let newCompletedBoxes = [...completedBoxes];
            
            for(let i = 0; i < rows-1; i++) {
                for(let j = 0; j < cols-1; j++) {
                    const top = newLines.some(line => line.x1 === dots[i][j].x && line.y1 === dots[i][j].y && line.x2 === dots[i][j + 1].x && line.y2 === dots[i][j + 1].y);
                    const bottom = newLines.some(line => line.x1 === dots[i + 1][j].x && line.y1 === dots[i + 1][j].y && line.x2 === dots[i + 1][j + 1].x && line.y2 === dots[i + 1][j + 1].y);
                    const left = newLines.some(line => line.x1 === dots[i][j].x && line.y1 === dots[i][j].y && line.x2 === dots[i + 1][j].x && line.y2 === dots[i + 1][j].y);
                    const right = newLines.some(line => line.x1 === dots[i][j + 1].x && line.y1 === dots[i][j + 1].y && line.x2 === dots[i + 1][j + 1].x && line.y2 === dots[i + 1][j + 1].y);
                    if (top && bottom && left && right) {
                        const completedBox = { row: i, col: j, owner: currentPlayer };
                        // Check if the box already exists in completedBoxes
                        const alreadyCompleted = newCompletedBoxes.some(box => box.row === completedBox.row && box.col === completedBox.col);
                        if (!alreadyCompleted) {
                            newCompletedBoxes.push(completedBox);
                            if(currentPlayer === player1) {
                                const newStreak = p1Streak + 1;
                                setP1Streak(newStreak);
                                setP2Streak(0);
                                setScores(prevScores => ({
                                    ...prevScores, 
                                    [player1]: prevScores[player1] + 10 * newStreak
                                }));
                            } else {
                                const newStreak = p2Streak + 1;
                                setP2Streak(newStreak);
                                setP1Streak(0);
                                setScores(prevScores => ({
                                    ...prevScores,
                                    [player2]: prevScores[player2] + 10 * newStreak
                                }));
                            }
                        }
                    }
                }
            }
            setDrawLines(newLines);
            if (newCompletedBoxes.length !== completedBoxes.length) { //length not the same
                setCompletedBoxes(newCompletedBoxes);
            } else {
                setTurns(turns + 1);
                setCurrentPlayer(turns % 2 === 0 ? player1 : player2);
            }

           /* if (newCompletedBoxes.length === (rows - 1) * (cols - 1)) {
                const player1Score = (newCompletedBoxes.filter(box => box.owner === player1).length) * 10;
                const player2Score = (newCompletedBoxes.filter(box => box.owner === player2).length) * 10;
                if ((player1Score > player2Score) || (player2Score > player1Score)) {
                    setGameState(GameState.WIN);
                    //alert(`${player1} WINS!`);
                } else {
                    setGameState(GameState.DRAW);
                    //alert("It's a draw!");
                }
            }*/
        }
    }

    return ( 
        <div className="canvas" style={{ width: canvasSize, height: canvasSize, position: "relative", opacity: gameState !== GameState.IN_PROGRESS ? 0.5 : 1 }} onMouseMove={handleMouseMove} onClick={handleClick}>
            {dots.map((row, rowIndex) => 
                row.map((dot, colIndex) => (
                    <div 
                        key={`${rowIndex}-${colIndex}`} 
                        className="dot" 
                        style={{
                            top: `${dot.y}px`, 
                            left: `${dot.x}px`
                        }}>
                    </div>
                ))
            )}

            {hoveredLine && (
                <div
                    className="line hover-line"
                    style={{
                        position: 'absolute',
                        top: `${hoveredLine.y1}px`,
                        left: `${hoveredLine.x1}px`,
                        width: hoveredLine.x1 === hoveredLine.x2 ? '3px' : `${Math.abs(hoveredLine.x2 - hoveredLine.x1)}px`,
                        height: hoveredLine.y1 === hoveredLine.y2 ? '3px' : `${Math.abs(hoveredLine.y2 - hoveredLine.y1)}px`,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    }}
                ></div>
            )}
            {drawLines.map((line, index) => (
                <div
                    key={index}
                    className="line solid-line"
                    style={{
                        position: 'absolute',
                        top: `${line.y1}px`,
                        left: `${line.x1}px`,
                        width: line.x1 === line.x2 ? '3px' : `${Math.abs(line.x2 - line.x1)}px`,
                        height: line.y1 === line.y2 ? '3px' : `${Math.abs(line.y2 - line.y1)}px`,
                        backgroundColor: 'white',
                    }}
                ></div>
            ))}
            {completedBoxes.map((box, index) => (
                <div 
                    key={index}
                    style={{
                        position: 'absolute',
                        top: `${dots[box.row][box.col].y + spacingY / 2}px`,
                        left: `${dots[box.row][box.col].x + spacingX / 2}px`,
                        transform: 'translate(-50%, -50%)',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: 'black'
                    }}>{box.owner}</div>
            ))}
        </div>
    );
}

export default Canvas;