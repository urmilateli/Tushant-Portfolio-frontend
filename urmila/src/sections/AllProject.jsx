// src/sections/AllProject.jsx (or src/pages/AllProject.jsx)

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css'; // Adjust path if needed
import { FaExternalLinkAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AllProject = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  // --- Handle Loading State ---
  if (isLoading) {
    return (
      // Pehle section tag ID "all-projects-page" aur class "projects-section loading" ke saath
      <section id="all-projects-page" className="projects-section loading">
        {/* Gradient/Background CSS ::before se aayega */}
        <div className="container"> {/* Container heading aur button ko wrap karega header ke andar */}
          {/* Note: Loading state mein button ko CSS se position karna hoga agar gradient header ke upar dikhana hai */}
          {/* <button onClick={handleGoHome} className="back-home-button">Back to Home</button> */}
          <h2 className="section-heading">All My Projects</h2>
          <p style={{ textAlign: 'center', padding: '2rem 0' }}>Loading Projects...</p>
        </div>
      </section>
    );
  }

  // --- Handle Error State ---
  if (error) {
    return (
      <section id="all-projects-page" className="projects-section error">
        {/* Gradient/Background CSS ::before se aayega */}
        <div className="container">
          {/* Error state mein order aapke original code jaisa rakha gaya hai */}
          <h2 className="section-heading" data-aos="fade-up">All My Projects</h2>
           <button
              onClick={handleGoHome}
              className="back-home-button"
              data-aos="fade-up" 
              data-aos-delay="100"
            >
               Back to Home
            </button>
          <p className="error-message" style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }} data-aos="fade-up" data-aos-delay="200">{error}</p>
        </div>
      </section>
    );
  }

  // --- Handle No Projects Found ---
  if (allProjects.length === 0 && !isLoading) {
    return (
      <section id="all-projects-page" className="projects-section">
         {/* Gradient/Background CSS ::before se aayega */}
        <div className="container">
          {/* No projects state mein order aapke original code jaisa rakha gaya hai */}
          <h2 className="section-heading" data-aos="fade-up">All My Projects</h2>
           <button
              onClick={handleGoHome}
              className="back-home-button"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Back to Home
            </button>
          <p style={{ textAlign: 'center' }} data-aos="fade-up" data-aos-delay="200">No Projects available at the moment.</p>
        </div>
      </section>
    );
  }

  // --- Render the section displaying ALL projects ---
  return (
    <section id="all-projects-page" className="projects-section">
      {/* Gradient/Background CSS ::before se aayega (CSS file mein defined) */}
      
      {/* Aapka container yahan se shuru ho sakta hai agar heading aur button ko gradient header ke upar rakhna hai */}
      {/* CSS mein inki positioning (negative margin, z-index) zaroori hogi */}
      <div className="container"> {/* Yeh container grid ke liye hai, heading/button header mein honge */}

        {/* === MODIFIED ORDER STARTS HERE === */}
        {/* Pehle "All My Projects" heading */}
        <h2 className="section-heading" data-aos="fade-up">
          All My Projects
        </h2>

        {/* Fir "Back to Home" button */}
        <button
          onClick={handleGoHome}
          className="back-home-button"
          data-aos="fade-up" 
          data-aos-delay="100" // Heading ke baad thoda delay
        >
           Back to Home
        </button>
        {/* === MODIFIED ORDER ENDS HERE === */}

        {/* Map over the FULL allProjects array */}
        <div className="projects-grid" data-aos="fade-up" data-aos-delay="200"> {/* Grid ko bhi animation */}
          {allProjects.map((item, index) => {
            const title = item?.title ?? 'Untitled Project';
            const description = item?.description ?? 'No description provided.';
            const imageUrl = item?.image ?
                (item.image.startsWith('http') ? item.image : `${apiBaseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`)
                : null;
            const link = item?.link;
            const tags = item?.tags;
            const projectKey = item?._id ?? `project-${index}`;

            // JSX for project card
            const CardContent = (
              <>
                {imageUrl && (
                  <div className="project-image">
                    <img src={imageUrl} alt={title} loading="lazy"/>
                  </div>
                )}
                <div className="project-content">
                  <h3 className="project-title">
                    {title} {/* Link handling needs to be decided for whole card clickable */}
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
              </>
            );
            
            // Making entire card clickable if link exists
            if (link && link.trim() !== "") {
              return (
                <a
                  key={projectKey}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card" // Removed card-style, assuming it's part of .project-card from Projects.css
                  data-aos="fade-up"
                  data-aos-delay={(index * 50) + 250} // Staggered delay for cards
                  title={`Visit ${title} (opens in new tab)`}
                >
                  {CardContent}
                </a>
              );
            } else {
              return (
                <div 
                  key={projectKey} 
                  className="project-card" // Removed card-style
                  data-aos="fade-up" 
                  data-aos-delay={(index * 50) + 250}
                >
                  {CardContent}
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default AllProject;