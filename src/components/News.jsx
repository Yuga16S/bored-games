import React from 'react';
import Footer from '../components/Footer.jsx';
import Header from './Header.jsx';
import '../News.css'; 

export const News = ({ authenticated , onLogout }) => {
    return (
        <div className="news-container">
            <Header authenticated={authenticated} onLogout={onLogout} />
            <main className="news-main">
                <div className="news-scrolling-text">
                    <p>New updates coming soon! Stay tuned for the latest releases. Below are the upcoming games and features. Release dates will be shared soon!</p>
                </div>
                <section className="news-content">
                    <div className="news-card mp-mode">
                        <div className="news-text-container">
                            <p className="news-game-title">Multi Player Mode</p>
                            <p className="news-game-description">Play against your friends in real-time with this multiplayer feature!</p>
                        </div>
                    </div>
                    <div className="news-card cwp-mode">
                        <div className="news-text-container">
                            <p className="news-game-title">Cross Word Puzzle</p>
                            <p className="news-game-description">Challenge your vocabulary and solve the crossword puzzle!</p>
                        </div>
                    </div>
                    <div className="news-card snl-mode">
                        <div className="news-text-container">
                            <p className="news-game-title">Snake and Ladder</p>
                            <p className="news-game-description">A classic game where players race to reach the top by rolling dice and avoiding snakes!</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default News;
