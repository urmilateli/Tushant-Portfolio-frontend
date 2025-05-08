// src/sections/Projects.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Projects.css'; // Shared CSS
// FaExternalLinkAlt ab card title mein use nahi hoga, agar kahin aur use na ho to hata sakte hain,
// lekin abhi ke liye rakhte hain.
import { FaExternalLinkAlt } from 'react-icons/fa'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const initialDisplayCount = 3;
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
        console.error('Error fetching projects:', error);
        setError(`Failed to load projects: ${error.message}`);
        setIsLoading(false);
        setAllProjects([]);
      });
  }, []);

  const projectsToShow = allProjects.slice(0, initialDisplayCount);

  if (isLoading) {
    return (
      <section id="projects" className="projects-section loading">
        <div className="container">
          <h2 className="section-heading">
             <span>My</span> <span style={{ color: '#01EEFF' }}>Projects</span>
          </h2>
          <p style={{ textAlign: 'center', padding: '2rem 0' }}>Loading Projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects-section error">
        <div className="container">
          <h2 className="section-heading">
             <span>My</span> <span style={{ color: '#01EEFF' }}>Projects</span>
          </h2>
          <p className="error-message" style={{ textAlign: 'center' }}>{error}</p>
        </div>
      </section>
    );
  }

  if (allProjects.length === 0 && !isLoading) { // Ensure not loading before showing "No Projects"
    return (
      <section id="projects" className="projects-section">
        <div className="container">
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

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-heading" data-aos="fade-up">
           <span>My</span> <span style={{ color: '#01EEFF' }}>Projects</span>
        </h2>

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
            const cardRef = null; // VanillaTilt ref placeholder, as per original

            // Card ka content
            const CardContent = (
              <>
                {imageUrl && (
                  <div className="project-image">
                    <img src={imageUrl} alt={title} loading="lazy" />
                  </div>
                )}
                <div className="project-content">
                  <h3 className="project-title">
                    {title} {/* Link aur icon yahan se hata diya gaya hai */}
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

            // Agar link hai, to card <a> tag hoga
            if (link && link.trim() !== "") {
              return (
                <a
                  key={projectKey}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visit ${title} (opens in new tab)`} // Accessibility ke liye title attribute
                  className="project-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  ref={cardRef} 
                >
                  {CardContent}
                </a>
              );
            } else {
              // Agar link nahi hai, to card <div> tag hoga
              return (
                <div
                  key={projectKey}
                  ref={cardRef}
                  className="project-card" // non-clickable card ke liye cursor default hoga
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {CardContent}
                </div>
              );
            }
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