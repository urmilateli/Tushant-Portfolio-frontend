// src/sections/Projects.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Projects.css'; // Shared CSS
import { FaExternalLinkAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
// ******* NO VanillaTilt import or useEffect needed if you removed it ********
// If you KEPT VanillaTilt from previous step, keep its import and useEffect hooks

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const initialDisplayCount = 3;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // useEffect for AOS and Fetch (Keep this as it was)
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
        console.error('Error fetching projects:', error);
        setError(`Failed to load projects: ${error.message}`);
        setIsLoading(false);
        setAllProjects([]);
      });

  }, []); // Empty dependency array

  // ******* Keep the VanillaTilt useEffect hook ONLY IF you implemented it previously ********
  // useEffect(() => {
  //   // ... your VanillaTilt initialization logic ...
  // }, [isLoading, error, allProjects]);


  const projectsToShow = allProjects.slice(0, initialDisplayCount);

  // --- Loading State ---
  if (isLoading) {
    return (
      <section id="projects" className="projects-section loading">
        <div className="container">
          {/* Use spans for heading colors */}
          <h2 className="section-heading">
             <span>My</span> <span style={{ color: '#01EEFF' }}>Projects</span>
          </h2>
          <p style={{ textAlign: 'center', padding: '2rem 0' }}>Loading Projects...</p>
        </div>
      </section>
    );
  }
  // --- Error State ---
  if (error) {
    return (
      <section id="projects" className="projects-section error">
        <div className="container">
          {/* Use spans for heading colors */}
          <h2 className="section-heading">
             <span>My</span> <span style={{ color: '#01EEFF' }}>Projects</span>
          </h2>
          <p className="error-message" style={{ textAlign: 'center' }}>{error}</p>
        </div>
      </section>
    );
  }
  // --- No Projects State ---
  if (allProjects.length === 0) {
    return (
      <section id="projects" className="projects-section">
        <div className="container">
           {/* Use spans for heading colors */}
          <h2 className="section-heading" data-aos="fade-up">
             <span>My</span> <span style={{ color: '#01EEFF' }}>Projects</span>
          </h2>
          <p style={{ textAlign: 'center' }}>No Projects available at the moment.</p>
        </div>
      </section>
    );
  }

  const viewAllProjects = () => {
    navigate("/allprojects");
  };

  // --- Render Section ---
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* ***** MODIFIED HEADING HERE ***** */}
        <h2 className="section-heading" data-aos="fade-up">
           <span>My</span> <span style={{ color: '#01EEFF' }}>Projects</span>
        </h2>
        {/* ***** END OF MODIFIED HEADING ***** */}

        <div className="projects-grid">
          {projectsToShow.map((item, index) => {
            const title = item?.title ?? 'Untitled Project';
            const description = item?.description ?? 'No description provided.';
            const imageUrl = item?.image ?
              (item.image.startsWith('http') ? item.image : `${apiBaseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`)
              : null;
            const link = item?.link;
            const tags = item?.tags;
            const projectKey = item?._id ?? `project-${index}`;

            // Use the appropriate ref attribute if you are still using VanillaTilt
            const cardRef = /* el => tiltRefs.current[index] = el */ null; // Example placeholder

            return (
              <div
                 key={projectKey}
                 ref={cardRef} // Add back ref={el => tiltRefs.current[index] = el} if using Tilt
                 className="project-card" // Removed 'card-style' if not defined/needed, keep if it is
                 data-aos="fade-up"
                 data-aos-delay={index * 100}
              >
                {imageUrl && (
                  <div className="project-image">
                    <img src={imageUrl} alt={title} loading="lazy" />
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

        {allProjects.length > initialDisplayCount && (
          <div className="view-all-projects-container" data-aos="fade-up">
            <button className="view-all-projects-btn" onClick={viewAllProjects}>
              View All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;