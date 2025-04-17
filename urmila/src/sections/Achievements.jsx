// src/sections/Achievements.jsx (Frontend Component - Modified to Show ALL)
import React, { useEffect, useState } from 'react';
import './Achievements.css'; // Your frontend CSS
import AOS from 'aos';      // Import AOS if you use it
import 'aos/dist/aos.css'; // Import AOS styles if you use it

const Achievements = () => {
  // State to hold ALL fetched achievements
  const [coreAchievements, setCoreAchievements] = useState([]);
  // Loading and Error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for image modal
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Initialize AOS if using it
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      delay: 50,
      easing: 'ease-in-out',
    });


    setIsLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/achievements') // Your API endpoint
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          // Sort data if needed, e.g., by date descending
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
  }, []); // Empty dependency array

  // --- Functions to handle modal ---
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // --- Loading / Error / No Data Handling ---
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
          <h2 className="section-heading">Achievements & Recognition</h2>
          <p className="error-message" style={{ textAlign: 'center', color: 'var(--error-color)' }}>{error}</p>
        </div>
      </section>
    );
  }
   // Optional: Show message if fetch was successful but no data
   if (coreAchievements.length === 0) {
     return (
        <section id="achievements" className="achievements-section">
            <div className="container">
                <h2 className="section-heading" data-aos="fade-up">Achievements & Recognition</h2>
                <p style={{ textAlign: 'center' }}>No achievements have been added yet.</p>
            </div>
        </section>
     );
   }

  // --- REMOVED the line: const achievementsToShow = coreAchievements.slice(0, 3); ---

  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <h2 className="section-heading" data-aos="fade-up">
          Achievements & Recognition
        </h2>

        {/* --- CHANGE: Map directly over coreAchievements --- */}
        <div className="achievements-grid">
          {coreAchievements.map((ach, index) => { // Map over the FULL list
            const title = ach?.title ?? 'Untitled Achievement';
            const description = ach?.description ?? 'No description available.';
            const imageUrl = ach?.image;
            const date = ach?.date;
            const achievementKey = ach?._id ?? `ach-${index}`;

            return (
              <div key={achievementKey} className="achievement-card card-style" data-aos="fade-up" data-aos-delay={index * 100}>
                {/* Image with onClick */}
                {imageUrl && (
                  <div
                    className="achievement-card-image clickable"
                    onClick={() => handleImageClick(imageUrl)}
                    title="Click to enlarge image"
                  >
                    <img src={imageUrl} alt={`${title} representation`} loading="lazy" />
                  </div>
                )}
                {/* Content */}
                <div className="achievement-card-content">
                  <h3 className="achievement-card-title">{title}</h3>
                  <p className="achievement-card-description">{description}</p>
                  {date && (
                    <p className="achievement-card-date">
                      {new Date(date).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* --- Removed the "View All" button logic --- */}
      </div>

      {/* Image Modal */}
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