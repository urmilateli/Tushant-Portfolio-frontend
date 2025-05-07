import React, { useState } from 'react';

// Icon Imports (assuming these are correct from the previous step)
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaSpotify,
  FaGithub,
  FaMediumM
} from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

// CSS Import - ENSURE THIS PATH IS CORRECT
import './Contact.css';


// SocialLinks component with YOUR ACTUAL URLs
const SocialLinks = ({ className }) => (
  <div className={`social-links ${className || ''}`}>
    <a href="https://www.linkedin.com/in/tushant2109/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
      <FaLinkedinIn />
    </a>
    <a href="https://www.facebook.com/tushantkumar.official" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
      <FaFacebookF />
    </a>
    <a href="https://www.instagram.com/tushant2109/profilecard/?igsh=MTRiZjFnenc4NjZ4eQ==" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
      <FaInstagram />
    </a>
    <a href="https://www.youtube.com/@tushantkumar" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="YouTube">
      <FaYoutube />
    </a>
    <a href="https://open.spotify.com/show/53AhFAZZKNJ9Gc3hPblDJv?si=f358b86d766849a6" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Spotify">
      <FaSpotify />
    </a>
    <a href="https://github.com/tushantkumar2109" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
      <FaGithub />
    </a>
    <a href="https://medium.com/@tushant2109" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Medium">
      <FaMediumM />
    </a>
    <a href="https://scholar.google.com/citations?hl=en&user=Lp89A7EAAAAJ" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Google Scholar">
      <SiGooglescholar />
    </a>
  </div>
);


const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_4uI-p9cF_CqCLyRmCXlCcRM0llC1yvmvyvZ1vvs50YA3hPIyEBERakrMq5oasFTr/exec';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const formParams = new URLSearchParams(formData);

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formParams.toString(),
    })
      .then(() => {
        setStatus('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        setStatus('Failed to send message.');
      });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">

          {/* Contact Form - Left Side */}
          <div className="contact-form-container" data-aos="fade-right">
            <h2 className="contact-form-heading">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row-grid">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name *"
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-grid">
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone (optional)"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject *"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message and Requirement *"
                  required
                  className="form-textarea"
                  rows="6"
                />
              </div>
              <div className="form-submit-wrapper">
                <button type="submit" className="btn-submit-custom" disabled={status === 'Sending...'}>
                  {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {status && <p className={`form-status ${status.includes('successfully') ? 'success' : 'error'}`}>{status}</p>}
            </form>
          </div>

          {/* Contact Info - Right Side */}
          <div className="contact-info-container contact-info-dark" data-aos="fade-left" data-aos-delay="100">
            <div className="contact-info-block">
              <div className="contact-info-item">
                <FaEnvelope className="contact-info-icon" style={{ color: '#01eeff' }} />
                <div>
                  <h4 className="contact-info-title">Email</h4>
                  <a href="mailto:tushant2109@gmail.com" className="contact-info-link">tushant2109@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <h4 className="contact-socials-title">Connect Online</h4>
              <SocialLinks className="contact-info-dark" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactPage;