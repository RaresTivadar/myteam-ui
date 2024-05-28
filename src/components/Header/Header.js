import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      navigate('/', { replace: true });
    }
  };

  const getHomeLink = () => {
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

  return (
    <header className="header-container">
      <div className="logo">
        <h3>MyTeam</h3>
      </div>
      <nav className="nav-links">
        {userId ? (
          <>
            <Link to={getHomeLink()}>Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
