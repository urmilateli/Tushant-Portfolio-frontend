// src/sections/AllProject.jsx (or src/pages/AllProject.jsx)

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. Import useNavigate
import './Projects.css'; // Adjust path if needed (e.g., '../sections/Projects.css')
import { FaExternalLinkAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Optional: If this is a full page, you might want a Navbar/Header
// import Navbar from '../components/Navbar'; // Example

const AllProject = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <--- 2. Initialize useNavigate

  // --- REQUIRED CHANGE for Vite Environment Variables ---
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  // -------------------------------------------------------

  useEffect(() => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        delay: 50,
    });

    setIsLoading(true);
    setError(null);

    fetch(`${apiBaseUrl}/api/myproject`)
      .then((response) => {
        if (!response.ok) {
           return response.text().then(text => {
             throw new Error(`HTTP error! status: ${response.status}, message: ${text || 'No error message'}`);
           });
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAllProjects(data);
        } else {
          console.error("Fetched projects data is not an array:", data);
          setAllProjects([]);
          setError("Invalid data format received from server.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching all projects:', error);
        setError(`Failed to load projects: ${error.message}`);
        setIsLoading(false);
        setAllProjects([]);
      });
  }, []); // Fetch on mount

  // --- 3. Create the handler function ---
  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page (root path)
  };

  // --- Handle Loading State ---
  if (isLoading) {
    return (
      <section id="all-projects-page" className="projects-section loading">
        <div className="container">
          <h2 className="section-heading">All My Projects</h2>
          {/* You might want the back button even during loading, or hide it */}
          {/* <button onClick={handleGoHome} className="back-home-button">Back to Home</button> */}
          <p style={{ textAlign: 'center', padding: '2rem 0' }}>Loading Projects...</p>
        </div>
      </section>
    );
  }

  // --- Handle Error State ---
  if (error) {
    return (
      <section id="all-projects-page" className="projects-section error">
        <div className="container">
           {/* --- 4. Add the button (also in error state) --- */}
          <button
              onClick={handleGoHome}
              className="back-home-button" // Add a class for potential styling
              style={{ marginBottom: '20px' }} // Basic inline style for spacing
            >
              ← Back to Home
            </button>
          <h2 className="section-heading">All My Projects</h2>
          <p className="error-message" style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>{error}</p>
        </div>
      </section>
    );
  }

  // --- Handle No Projects Found ---
  if (allProjects.length === 0 && !isLoading) { // Ensure loading is finished
    return (
      <section id="all-projects-page" className="projects-section">
        <div className="container">
           {/* --- 4. Add the button (also when no projects) --- */}
           <button
              onClick={handleGoHome}
              className="back-home-button" // Add a class for potential styling
              style={{ marginBottom: '20px' }} // Basic inline style for spacing
              data-aos="fade-up" // Optional animation
            >
              ← Back to Home
            </button>
          <h2 className="section-heading" data-aos="fade-up">All My Projects</h2>
          <p style={{ textAlign: 'center' }} data-aos="fade-up" data-aos-delay="100">No Projects available at the moment.</p>
        </div>
      </section>
    );
  }

  // --- Render the section displaying ALL projects ---
  return (
    <section id="all-projects-page" className="projects-section">
      <div className="container">

        {/* --- 4. Add the button HERE --- */}
        <button
          onClick={handleGoHome}
          className="back-home-button" // Add a class for potential styling
          style={{ marginBottom: '20px' }} // Basic inline style for spacing
          data-aos="fade-up" // Optional animation
        >
          ← Back to Home {/* ← is the left arrow ← */}
        </button>

        <h2 className="section-heading" data-aos="fade-up">
          All My Projects
        </h2>

        {/* --- Map over the FULL allProjects array --- */}
        <div className="projects-grid">
          {allProjects.map((item, index) => {
            const title = item?.title ?? 'Untitled Project';
            const description = item?.description ?? 'No description provided.';
            const imageUrl = item?.image ?
                (item.image.startsWith('http') ? item.image : `${apiBaseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`)
                : null;
            const link = item?.link;
            const tags = item?.tags;
            const projectKey = item?._id ?? `project-${index}`;

            return (
              <div key={projectKey} className="project-card card-style" data-aos="fade-up" data-aos-delay={index * 100 + 100}> {/* Adjusted delay */}
                 {imageUrl && (
                  <div className="project-image">
                    <img src={imageUrl} alt={title} loading="lazy"/>
                  </div>
                )}
                <div className="project-content">
                  <h3 className="project-title">
                    {link && link.trim() !== "" ? (
                      <a href={link} target="_blank" rel="noopener noreferrer" title={`Visit ${title} (opens in new tab)`}>
                        {title} <FaExternalLinkAlt className="project-link-icon" />
                      </a>
                    ) : (
                      title
                    )}
                  </h3>
                  <p className="project-description">{description}</p>
                  {Array.isArray(tags) && tags.length > 0 && (
                    <div className="project-tags">
                      {tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag-bubble">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllProject;