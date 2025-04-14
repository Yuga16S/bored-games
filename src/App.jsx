import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppHeader from './components/AppHeader.jsx';
import HomePage from './components/HomePage.jsx';
import DotsAndBoxes from './components/DotsAndBoxes.jsx';
import TicTacToe from './components/TicTacToe.jsx';

import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler.jsx';
import NotFound from './components/NotFound.jsx';
import LoadingIndicator from './components/LoadingIndicator.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import WelcomePage from './components/WelcomePage.jsx'
import { getCurrentUser } from './util/APIUtils.js';
import { ACCESS_TOKEN } from './constants/index.js';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  //below for testing purposes only
  /*useEffect(() => {
    console.log("Updated authenticated:", authenticated);
  }, [authenticated]);*/

  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    console.log("clicking me and is authenticated ? ", authenticated);
    toast.success("You're safely logged out!");
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Router>
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={authenticated} onLogout={handleLogout} />
        </div>
        <ToastContainer position="top-right" autoClose={1000} />
        <div className="app-body">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/homePage" element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout} element={<HomePage />} />} />
            <Route path="/dotsandboxes" element={<PrivateRoute authenticated={authenticated} element={<DotsAndBoxes />} />} />
            <Route path="/tictactoe" element={<PrivateRoute authenticated={authenticated} element={<TicTacToe />} />} />
            <Route path="/profile" element={<PrivateRoute authenticated={authenticated} element={<Profile currentUser={currentUser} />} />} />
            <Route path="/login" element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
            <Route path="/signup" element={<Signup authenticated={authenticated} />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        { /*<Alert
          stack={{ limit: 3 }}
          timeout={3000}
          position="top-right"
          effect="slide"
          offset={65}
        /> */ }
      </div>
    </Router>
  );
}

export default App;
