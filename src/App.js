import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Homepage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import AdminFirstPage from './pages/AdminFirstPage/AdminFirstPage';
import AdminTeamDetails from './pages/AdminTeamDetails/AdminTeamDetails'; 
import CoachDashboard from './pages/CoachDashboard/CoachDashboard';
import AdminTeamCreation from './pages/AdminTeamCreation/AdminTeamCreation';
import CoachTeamDetails from './pages/CoachTeamDetails/CoachTeamDetails'; 
import PlayerDashboard from './pages/PlayerDashboard/PlayerDashboard';
import './App.css';
import backgroundImage from './assets/backgroundImage.png'; // Make sure the file name matches


function App() {
  return ( 
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100%'
    }}>
    <Router>
      <div className="App">
        <header className="App-header">
        <Header />
        </header>
        <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin" element={<AdminFirstPage />} />
          <Route path="/admin/team/:teamId" element={<AdminTeamDetails />} /> 
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/create-team" element={<AdminTeamCreation />} />
          <Route path="/coach/team/:teamId" element={<CoachTeamDetails />} /> 
          <Route path="/player" element={<PlayerDashboard />} />
        </Routes>
        </div>
        <footer className="App-footer">
        <Footer />
        </footer>
      </div>
    </Router>
    </div>
  );
}

export default App;
