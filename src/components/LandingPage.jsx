import React from 'react';
import  { useNavigate } from 'react-router-dom';
import dotsAndBoxesImage from '../assets/dnb3.png';
import ticTacToeImage from '../assets/ttt2.png';

function LandingPage() {
    const navigate = useNavigate();

    const goToDotsAndBoxes = () => {
        navigate('/dotsandboxes');
    };

    const goToTicTacToe = () => {
        navigate('/tictactoe');
    }

    return (
        <>
        <h1 className="main-container">Bored Games</h1>
        <div className="landing-container">
            <div className="lcontainer" onClick={goToDotsAndBoxes}>
                <img src={dotsAndBoxesImage} alt="Dots and Boxes" />
                <p>Dots and Boxes</p>
            </div>

            <div className="lcontainer" onClick={goToTicTacToe}>
                <img src={ticTacToeImage} alt="Tic Tac Toe" />
                <p>Tic Tac Toe</p>
            </div>

        </div>
        </>
    );
}

export default LandingPage;
