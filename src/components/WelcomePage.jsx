import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="welcomePage">
      <p>
        Welcome to <strong>Bored Games</strong>!{" "}<br></br>
        <span className="cta">
          Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to play!
        </span>
      </p>
    </div>
  );
};

export default WelcomePage;