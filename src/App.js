import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Homepage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import AdminFirstPage from './pages/AdminFirstPage/AdminFirstPage';
import AdminTeamDetails from './pages/AdminTeamDetails/AdminTeamDetails'; 
import CoachDashboard from './pages/CoachDashboard/CoachDashboard';
import AdminTeamCreation from './pages/AdminTeamCreation/AdminTeamCreation';
import CoachTeamDetails from './pages/CoachTeamDetails/CoachTeamDetails'; 
import PlayerDashboard from './pages/PlayerDashboard/PlayerDashboard';
import AboutPage from './pages/AboutPage/AboutPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import backgroundImage from './assets/backgroundImage.png';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('userId');

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
              <Route path="/" element={isAuthenticated ? <Navigate to={getHomeLink()} /> : <HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={
                <ProtectedRoute role="admin">
                  <AdminFirstPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/team/:teamId" element={
                <ProtectedRoute role="admin">
                  <AdminTeamDetails />
                </ProtectedRoute>
              } />
              <Route path="/coach" element={
                <ProtectedRoute role="coach">
                  <CoachDashboard />
                </ProtectedRoute>
              } />
              <Route path="/create-team" element={
                <ProtectedRoute role="admin">
                  <AdminTeamCreation />
                </ProtectedRoute>
              } />
              <Route path="/coach/team/:teamId" element={
                <ProtectedRoute role="coach">
                  <CoachTeamDetails />
                </ProtectedRoute>
              } />
              <Route path="/player" element={
                <ProtectedRoute role="player">
                  <PlayerDashboard />
                </ProtectedRoute>
              } />
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

const getHomeLink = () => {
  const userRole = localStorage.getItem('userRole');
  switch (userRole) {
    case 'admin':
      return '/admin';
    case 'coach':
      return '/coach';
    case 'player':
      return '/player';
    default:
      return '/';
  }
};

export default App;
