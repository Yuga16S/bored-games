import React from 'react';
import '../Rules.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export const Rules = ({ authenticated, onLogout }) => {

  return (
    <div className="rules-container">
      <Header authenticated={authenticated} onLogout={onLogout} />
      <main className="rules-main">
        <div className="rules-content">
          <div className="game-box">
            <div className="game-header">
              <h2 className="game-name">Tic Tac Toe</h2>
              <p className="game-intro">
              A classic 3x3 grid game where strategy meets simplicity. Outthink your opponent to get three in a row!
            </p>
            </div>
            <p className="rule-header">Rules</p>
            <ul className="game-rules">
              <li>Two players take turns marking X or O.</li>
              <li>The first player to align 3 in a row (horizontally, vertically, or diagonally) wins.</li>
              <li>If all squares are filled with no winner, it's a draw.</li>
            </ul>
            <Link to="/tictactoe" className="play-button">Play Tic Tac Toe</Link>
          </div>

          <div className="game-box">
            <div className="game-header">
              <h2 className="game-name">Dots and Boxes</h2>
              <p className="game-intro">
                Connect the dots and claim squares in this turn-based strategic game. Outsmart your opponent to win!
             </p>
            </div>
            <p className="rule-header">Rules</p>
            <ul className="game-rules">
              <li>Players take turns drawing lines between dots.</li>
              <li>Completing a box earns a point and an extra turn.</li>
              <li>The player with the most boxes wins.</li>
            </ul>
            <Link to="/dotsandboxes" className="play-button">Play Dots and Boxes</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rules;



