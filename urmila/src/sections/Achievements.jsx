// src/sections/Achievements.jsx
import React, { useEffect, useState } from 'react';
import './Achievements.css'; // Your frontend CSS (Modified below)
import AOS from 'aos';      // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const Achievements = () => {
  const [coreAchievements, setCoreAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Initialize AOS (Matches the fade-up effect seen on Banqix)
    AOS.init({
      duration: 800, // Adjust duration as needed
      once: true,    // Animation happens once
      offset: 50,    // Offset for triggering animation
      delay: 50,     // Small delay
      easing: 'ease-in-out', // Smooth easing
    });

    setIsLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/achievements')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setCoreAchievements(sortedData);
        } else {
          console.error("Fetched data is not an array:", data);
          setCoreAchievements([]);
          setError("Received invalid data format.");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching achievements:", err);
        setError("Failed to load achievements.");
        setIsLoading(false);
        setCoreAchievements([]);
      });
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <section id="achievements" className="achievements-section loading">
        <div className="container"><p style={{ textAlign: 'center', padding: '2rem 0' }}>Loading Achievements...</p></div>
      </section>
    );
  }
  if (error) {
    return (
      <section id="achievements" className="achievements-section error">
        <div className="container">
          {/* --- Section Heading (Modified for Color) --- */}
          <h2 className="section-heading">
             Achievements & <span style={{ color: '#01EEFF' }}>Recognitions</span>
          </h2>
          <p className="error-message" style={{ textAlign: 'center', color: 'var(--error-color)' }}>{error}</p>
        </div>
      </section>
    );
  }
   if (coreAchievements.length === 0) {
     return (
        <section id="achievements" className="achievements-section">
            <div className="container">
                {/* --- Section Heading (Modified for Color) --- */}
                <h2 className="section-heading" data-aos="fade-up">
                   Achievements & <span style={{ color: '#01EEFF' }}>Recognitions</span>
                </h2>
                <p style={{ textAlign: 'center' }}>No achievements have been added yet.</p>
            </div>
        </section>
     );
   }

  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        {/* --- Section Heading (Modified for Color) --- */}
        <h2 className="section-heading" data-aos="fade-up">
           Achievements & <span style={{ color: '#01EEFF' }}>Recognitions</span>
        </h2>

        <div className="achievements-grid">
          {coreAchievements.map((ach, index) => {
            const title = ach?.title ?? 'Untitled Achievement';
            const description = ach?.description ?? 'No description available.';
            const imageUrl = ach?.image;
            const date = ach?.date;
            const achievementKey = ach?._id ?? `ach-${index}`;

            return (
              // --- Card with AOS fade-up animation ---
              <div key={achievementKey} className="achievement-card card-style" data-aos="fade-up" data-aos-delay={index * 100}>
                {imageUrl && (
                  <div
                    className="achievement-card-image clickable"
                    onClick={() => handleImageClick(imageUrl)}
                    title="Click to enlarge image"
                  >
                    <img src={imageUrl} alt={`${title} representation`} loading="lazy" />
                  </div>
                )}
                <div className="achievement-card-content">
                  {/* --- Card Title (Uses Lora Font via CSS) --- */}
                  <h3 className="achievement-card-title">{title}</h3>
                  {/* --- Card Description (Uses Inter Font via CSS) --- */}
                  <p className="achievement-card-description">{description}</p>
                  {date && (
                    /* --- Card Date (Uses Inter Font via CSS) --- */
                    <p className="achievement-card-date">
                      {new Date(date).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Modal (Styling adjusted in CSS) */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={handleCloseModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={handleCloseModal} aria-label="Close image view">
              ×
            </button>
            <img src={selectedImage} alt="Enlarged achievement" className="image-modal-image"/>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;