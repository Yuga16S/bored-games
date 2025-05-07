import React, { useEffect, useState, useWindowSize } from 'react';
import '../Profile.css';
import Header from './Header';
import Footer from './Footer';
import Confetti from 'react-confetti';
import LoadingIndicator from './LoadingIndicator.jsx'

const Profile = ({ currentUser, authenticated, onLogout }) => {

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]); //size is a two-element array: [width, height]
  
    useEffect(() => {
      const handleResize = () => {
        setSize([window.innerWidth, window.innerHeight]);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return size;
  };

  const [showConfetti, setShowConfetti] = useState(true);
  const [width, height] = useWindowSize();
  
  console.log("current user from profile", currentUser);
  return (
    <div className="profile-container">
      <Header authenticated={authenticated} onLogout={onLogout} />
      <main className="profile-main">
        {currentUser ? (
          <>
          {showConfetti && (<Confetti width={width} height={height} numberOfPieces={300} recycle={false} gravity={0.3} colors={['#ff0', '#f0f', '#0ff', '#0f0', '#f90']}/>)}
            <div className="profile-top-message">
              <h1 className="profile-greeting">Hey {currentUser.name} 👋</h1>
            </div>
            <div className="profile-card">
              <div className="profile-avatar">
                {currentUser.imageUrl ? (
                  <img src={currentUser.imageUrl} alt={currentUser.name} />
                ) : (
                  <div className="text-avatar">
                    {currentUser.name && currentUser.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className="profile-info">
                <h2>Username: {currentUser.name}</h2>
                <p>Email ID: {currentUser.email}</p>
                <p>Joined: </p>
              </div>
            </div>
          </>
        ) : (
          <LoadingIndicator/>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

