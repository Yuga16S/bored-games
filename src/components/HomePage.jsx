import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import dotsAndBoxesImage from '../assets/dnb3.png';
import ticTacToeImage from '../assets/ttt2.png';
import Header from './Header.jsx';

const HomePage = ({ authenticated , onLogout}) => {
    const navigate = useNavigate();
    const reviewRef = useRef([]);
    const [currentReview, setCurrentreview] = useState("");
    const goToDotsAndBoxes = () => navigate('/dotsandboxes');
    const goToTicTacToe = () => navigate('/tictactoe');

    const fetchReviews = async () => {
        const response = await fetch('/api/reviews'); // need to fix this, add an api to backend
        const data = await response.json();
        reviewRef.current = data;
    };

    useEffect(() => {
        fetchReviews();
        const interval = setInterval(() => {
            if(reviewRef.current.length > 0) {
                const randomIndex = Math.floor(Math.random() * reviewRef.current.length);
                setCurrentreview(reviewRef.current[randomIndex].review);
            }
        }, 1000);
        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="homepage-container">
            <section className="homepage-section section-1">
                <Header authenticated={authenticated} onLogout={onLogout} />
                <div className="game-intro">
                    <h1>Game on!</h1>
                    <p>
                        Bored Games is your go-to destination for classic games with a modern twist.<br></br>
                        Whether you’re up for a quick round of Tic-Tac-Toe or diving into Dots and Boxes,
                        there’s always fun waiting.
                        <br />
                        We’re constantly adding new games and features — boredom doesn’t stand a chance!
                    </p>
                </div>

                <div className="homepage-games">
                    <div className="game-card" onClick={goToDotsAndBoxes}>
                        <img src={dotsAndBoxesImage} alt="Dots and Boxes" />
                    </div>
                    <div className="game-card" onClick={goToTicTacToe}>
                        <img src={ticTacToeImage} alt="Tic Tac Toe" />
                    </div>
                </div>
            </section>
            <hr style={{ borderTop: '2px solid #0d001f', borderBottom: '2px solid #0d001f' }} ></hr>
            <section id="news-section" className="homepage-section section-2">
                <div className="scrolling-text">
                    <p>New updates coming soon! Stay tuned for the latest releases. Below are the upcoming games and features. Release dates will be shared soon!</p>
                </div>
                <div className="homepage-upcoming-card mp-mode" style={{ backgroundImage: "url('/mp.jpg')" }}>
                    <p className="homepage-game-title">Multi Player Mode</p>
                    <p className="homepage-game-description">Play against your friends in real-time with this multiplayer feature!</p>
                </div>
                <div className="homepage-upcoming-card cwp-mode" style={{ backgroundImage: "url('/cwp1.jpg')" }}>
                    <p className="homepage-game-title">Cross Word Puzzle</p>
                    <p className="homepage-game-description">Challenge your vocabulary and solve the crossword puzzle!</p>
                </div>
                <div className="homepage-upcoming-card snl-mode" style={{ backgroundImage: "url('/snl1.jpg')" }}>
                    <p className="homepage-game-title">Snake and Ladder</p>
                    <p className="homepage-game-description">A classic game where players race to reach the top by rolling dice and avoiding snakes!</p>
                </div>
            </section>
            <hr style={{ borderTop: '2px solid #0d001f', borderBottom: '2px solid #0d001f' }} ></hr>
            <section id="reviews" className="review-section">
                <h2>What Players Are Saying</h2>
                <div className="review-box">
                    <p className="review-text">{ currentReview || "Loading reviews..."}</p>
                </div>
            </section>

            <footer className="homepage-section section-3 homepage-footer">
                <div className="footer-container">
                    <div className="footer-text">
                        <p>&copy; 2025 Bored Games. All rights reserved.</p>
                    </div>
                    <div id="contact-section" className="footer-social">
                        <a href="https://www.linkedin.com/in/yugapriya-shankar-0a5669176" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="HTTPS://YUGAPRIYA-PORTFOLIO.ONRENDER.COM" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-briefcase"></i>
                        </a>
                        <a href="HTTPS://GITHUB.COM/YUGA16S" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="mailto:yugapriyaky@gmail.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

