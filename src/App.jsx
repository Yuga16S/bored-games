import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DotsAndBoxes from './components/DotsAndBoxes.jsx';
import TicTacToe from './components/TicTacToe.jsx';
import HomePage from './components/HomePage.jsx';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dotsandboxes" element={<DotsAndBoxes />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
      </Routes>
    </Router>
      
    
  )
}

export default App;
