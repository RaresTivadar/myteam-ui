import React from 'react';
import './ServicesPage.css';

const ServicesPage = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <p>We offer a range of services to help you manage your sports team effectively:</p>
      <h2>Team Management</h2>
      <p>Our team management tools allow you to keep track of all your players, their statistics, and their performance. You can easily add, remove, and update player information.</p>
      <h2>Player Statistics</h2>
      <p>Track player performance with our comprehensive statistics module. Record goals, assists, matches played, and more to get a complete picture of each player's contributions.</p>
      <h2>Match Scheduling</h2>
      <p>Schedule matches effortlessly with our match scheduling feature. Set up match dates, locations, and opponents with just a few clicks.</p>
      <h2>Training Sessions</h2>
      <p>Manage your training sessions with ease. Schedule training dates and track attendance to ensure your team is always prepared.</p>
    </div>
  );
};

export default ServicesPage;
