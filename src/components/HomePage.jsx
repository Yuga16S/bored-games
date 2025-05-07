import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import dotsAndBoxesImage from '../assets/dnb3.png';
import ticTacToeImage from '../assets/ttt2.png';
import logo from "/logo4.png";
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import '../HomePage.css';

const HomePage = ({ authenticated , onLogout }) => {
    const navigate = useNavigate();
    const goToDotsAndBoxes = () => navigate('/dotsandboxes');
    const goToTicTacToe = () => navigate('/tictactoe');

    return (
        <div className="homepage-container">
            <Header authenticated={authenticated} onLogout={onLogout} />
            <main className="homepage-main">
            <div className="homepage-game-intro">
                <img className="temp-logo" src={logo} alt="Bored Games Logo" />
                <p>Escape Boredom - One Game at a Time!</p>
                <h1>Welcome to Bored Games</h1>
            </div>
            <section className="homepage-section">
                <div className="homepage-games">
                    <div className="homepage-game-card" onClick={goToDotsAndBoxes}>
                        <img src={dotsAndBoxesImage} alt="Dots and Boxes" />
                    </div>
                    <div className="homepage-game-card" onClick={goToTicTacToe}>
                        <img src={ticTacToeImage} alt="Tic Tac Toe" />
                    </div>
                </div>
            </section>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;

