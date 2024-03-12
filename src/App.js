import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import AdminFirstPage from './pages/AdminFirstPage/AdminFirstPage';
import TeamDetails from './pages/TeamDetails/TeamDetails';
import './App.css';

function App() {
  return ( 
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin" element={<AdminFirstPage />} />
          <Route path="/team/:teamId" element={<TeamDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
