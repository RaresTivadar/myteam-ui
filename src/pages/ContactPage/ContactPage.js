import React, { useState } from 'react';
import './ContactPage.css';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3107/api/contact/send-email', formData);
      setSubmitted(true);
    } catch (error) {
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or need further information, feel free to contact us using the form below.</p>
      {submitted ? (
        <p>Thank you for your message. We will get back to you shortly.</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="contact-info">
        <h2>Other Ways to Reach Us</h2>
        <p>Email: myteamwebapp@gmail.com</p>
        <p>Phone: +40734738838</p>
        <p>Address: Timisoara, Romania</p>
      </div>
    </div>
  );
};

export default ContactPage;
