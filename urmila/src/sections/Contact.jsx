// src/sections/Contact.jsx
import React, { useState } from 'react';
import SocialLinks from '../components/SocialLinks';
import './Contact.css'; // Make sure this CSS file is correctly imported
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", "dece19a1-a1e2-49fa-9e35-28e6e0a1ec1f"); // 🔑 Replace with your Web3Forms access key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Form submitted successfully!");
        form.reset(); // Reset form
        setTimeout(() => setStatus(''), 5000);
      } else {
        console.error("Web3Forms Error:", data); // Log the error details from Web3Forms
        setStatus(data.message || "Something went wrong.");
        setTimeout(() => setStatus(''), 7000);
      }
    } catch (error) {
      console.error("Submission Fetch Error:", error);
      setStatus("An error occurred. Please try again.");
      setTimeout(() => setStatus(''), 7000);
    }
  };

  return (
    <section id="contact" className="contact-section contact-section-dark">
      <div className="container">
        <div className="contact-grid">

          {/* Contact Form */}
          <div className="contact-form-container" data-aos="fade-right">
            <h2 className="contact-form-heading">Get in Touch</h2>
            <p className="contact-form-intro">
              Have a question or a project idea? Fill out the form below, and let's connect!
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* --- Updated Form Fields --- */}
              <div className="form-row-grid">
                {/* Name (Required) */}
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input"
                    placeholder="Name *"
                  />
                </div>

                {/* Email (Required) */}
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-input"
                    placeholder="Email *"
                  />
                </div>

                {/* Phone Number (Optional) */}
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone" // Keep name 'phone' for consistency or change if needed
                    className="form-input"
                    placeholder="Phone Number"
                  />
                </div>

                 {/* Subject (Required) */}
                 <div className="form-group">
                  <input
                    type="text"
                    name="subject" // Added name 'subject'
                    required
                    className="form-input"
                    placeholder="Subject *"
                  />
                </div>
              </div>
              {/* --- End of Grid Row --- */}

              {/* Message (Required) */}
              <div className="form-group">
                <textarea
                  name="message" // Keep name 'message'
                  rows="6"
                  required
                  className="form-textarea"
                  placeholder="Your Message and Requirement *" // Updated placeholder
                ></textarea>
              </div>

              {/* Submit Button & Status */}
              <div className="form-submit-wrapper">
                <button type="submit" className="btn-submit-custom" disabled={status === 'Sending...'}>
                  {status === 'Sending...' ? 'Sending...' : 'Submit Message'}
                </button>
                {status && <p className={`form-status ${status.includes('successfully') ? 'success' : 'error'}`}>{status}</p>}
              </div>
            </form>
          </div>

          {/* Contact Info (Remains the same) */}
          <div className="contact-info-container contact-info-dark" data-aos="fade-left" data-aos-delay="100">
            <div className="contact-info-block">
              <div className="contact-info-item">
                <FaEnvelope className="contact-info-icon" />
                <div>
                  <h4 className="contact-info-title">Email</h4>
                  <a href="mailto:tushant2109@gmail.com" className="contact-info-link">tushant2109@gmail.com</a>
                </div>
              </div>
              <div className="contact-info-item">
                <FaPhoneAlt className="contact-info-icon" />
                <div>
                  <h4 className="contact-info-title">Phone</h4>
                  <a href="tel:+919451689037" className="contact-info-link">+91 94516 89037</a>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <h4 className="contact-socials-title">Connect Online</h4>
              <SocialLinks className="contact-info-dark" /> {/* Assuming SocialLinks handles its own styling */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;