import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import AdminFirstPage from './pages/AdminFirstPage/AdminFirstPage';
import AdminTeamDetails from './pages/AdminTeamDetails/AdminTeamDetails'; 
import CoachDashboard from './pages/CoachDashboard/CoachDashboard';
import TeamCreation from './pages/TeamCreation/TeamCreation';
import CoachTeamDetails from './pages/CoachTeamDetails/CoachTeamDetails'; 
import CoachAnnouncementPage from './pages/CoachAnnouncementPage/CoachAnnouncementPage';
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
          <Route path="/admin/team/:teamId" element={<AdminTeamDetails />} /> 
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/create-team" element={<TeamCreation />} />
          <Route path="/coach/team/:teamId" element={<CoachTeamDetails />} /> 
          <Route path="/coach/team/:teamId/announcements" element={<CoachAnnouncementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
