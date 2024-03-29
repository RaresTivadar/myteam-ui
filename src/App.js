import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Homepage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import AdminFirstPage from './pages/AdminFirstPage/AdminFirstPage';
import AdminTeamDetails from './pages/AdminTeamDetails/AdminTeamDetails'; 
import CoachDashboard from './pages/CoachDashboard/CoachDashboard';
import AdminTeamCreation from './pages/AdminTeamCreation/AdminTeamCreation';
import CoachTeamDetails from './pages/CoachTeamDetails/CoachTeamDetails'; 
import CoachAnnouncementPage from './pages/CoachAnnouncementPage/CoachAnnouncementPage';
import CoachCalendarPage from './pages/CoachCalendarPage/CoachCalendarPage'; 
import PlayerDashboard from './pages/PlayerDashboard/PlayerDashboard';
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
          <Route path="/create-team" element={<AdminTeamCreation />} />
          <Route path="/coach/team/:teamId" element={<CoachTeamDetails />} /> 
          <Route path="/coach/team/:teamId/announcements" element={<CoachAnnouncementPage />} />
          <Route path="/coach/team/:teamId/calendar" element={<CoachCalendarPage />} />
          <Route path="/player" element={<PlayerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
