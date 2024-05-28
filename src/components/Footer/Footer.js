import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <section className="footer-section">
          <h4>About Us</h4>
          <p>We are dedicated to providing the best service to our community.</p>
        </section>
        <section className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </section>
        <section className="footer-section">
          <h4>Contact Information</h4>
          <p>Email: myteamwebapp@gmail.com</p>
          <p>Phone: +40734738838</p>
        </section>
      </div>
      <div className="footer-bottom">
        <p>&copy; MyTeam WebApplication 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
