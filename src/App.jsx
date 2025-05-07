import './App.css';
import React, { useEffect, useState } from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import DotsAndBoxes from './components/DotsAndBoxes.jsx';
import TicTacToe from './components/TicTacToe.jsx';
import AddReview from './components/AddReview.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler.jsx';
import NotFound from './components/NotFound.jsx';
import LoadingIndicator from './components/LoadingIndicator.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import News from './components/News.jsx';
import Rules from './components/Rules.jsx';
import AboutUs from './components/AboutUs.jsx';
import Reviews from './components/Reviews.jsx';
import Footer from './components/Footer.jsx';
import { getCurrentUser } from './util/APIUtils.js';
import { ACCESS_TOKEN } from './constants/index.js';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './components/Contact.jsx';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authenticated) {
      loadCurrentlyLoggedInUser();
    }
  }, [authenticated]);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);


  const loadCurrentlyLoggedInUser = () => {
    setLoading(true);
    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setAuthenticated(true);
      })
      .catch(error => {
        setAuthenticated(false);
        setCurrentUser(null);
      })
      .finally(() => {
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
      <div className="app-layout">
        <div className="app-top-box">
        </div>
        <ToastContainer position="top-right" autoClose={1000} />
        <div className="app-body">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/homePage" element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout} element={<HomePage />} />} />
            <Route path="/dotsandboxes" element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout} element={<DotsAndBoxes onLogout={handleLogout} />} />} />
            <Route path="/tictactoe" element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout} element={<TicTacToe onLogout={handleLogout}/>} />} />
            <Route path="/profile" element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout}  element={<Profile currentUser={currentUser} authenticated={authenticated} onLogout={handleLogout} />} />} />
            <Route path="/login" element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
            <Route path="/news" element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout}  element={<News />} />} />
            <Route path="/contact" element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout}  element={<Contact />} />} />
            <Route path="/rules" element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout}  element={<Rules />} />} />
            <Route path="/aboutus" element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout}  element={<AboutUs />}/>} />
            <Route path="/reviews" element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout}  element={<Reviews />}/>} />
            <Route path="/addAReview" element={<PrivateRoute authenticated={authenticated} element={<AddReview currentUser={currentUser} />} />} />
            <Route path="/footer" element={<PrivateRoute authenticated={authenticated} element={<Footer />} />} />
            <Route path="/signup" element={<Signup authenticated={authenticated} />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler setAuthenticated={setAuthenticated} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
