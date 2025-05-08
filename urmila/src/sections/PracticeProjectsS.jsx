// src/sections/PracticeProjectsS.jsx

import React, { useEffect, useState } from 'react';
// Import the CSS that will contain styles for BOTH header and projects
import './PracticeProjects.css';
// import { FaExternalLinkAlt } from 'react-icons/fa'; // Not used in the card currently
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import axios from '../admin/api/axios';

// Assuming Navbar might be used globally or imported elsewhere if needed
// import Navbar from '../components/Navbar';

const PracticeProjectsS = () => {
  const [allPracticeProjects, setAllPracticeProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlegohome = () => {
    navigate('/');
  };

  const API_ENDPOINT = "/practiceprojects";

  useEffect(() => {
    AOS.init();
    setIsLoading(true);
    setError(null);
    window.scrollTo(0, 0);

    const fetchProjects = async () => {
      try {
        console.log(`Fetching public practice projects from: ${API_ENDPOINT}`);
        const res = await axios.get(API_ENDPOINT);
        if (Array.isArray(res.data)) {
          setAllPracticeProjects(res.data);
        } else {
          console.error("Fetched data is not an array:", res.data);
          setAllPracticeProjects([]);
          setError("Invalid data format.");
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(`Failed to load projects: ${err.response?.data?.message || err.message}`);
        setAllPracticeProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      {/* <Navbar /> */} {/* Optional: If you have a global navbar */}

      {/* **** HEADER SECTION **** */}
      <section className="page-header-section">
        <div className="container header-content">
          {/* Use the title from the image */}
          <h1 data-aos="fade-up">Practice Projects</h1>
          {/* Add breadcrumbs like the image */}
          <nav aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="100">
            <ol className="breadcrumb">
              {/* Link the 'Home' part */}
              <li className="breadcrumb-item"><a href="#" onClick={(e) => { e.preventDefault(); handlegohome(); }}>Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Practice Projects</li>
            </ol>
          </nav>
        </div>
        {/* The curved gradient background will be applied via CSS pseudo-element */}
      </section>

      {/* **** PROJECTS CONTENT SECTION **** */}
      {/* Note: Renamed the outer section class */}
      <section id="practice-projects-content" className={`projects-content-area ${isLoading ? 'loading' : ''} ${error ? 'error' : ''}`}>
        <div className="container">
          {/* Moved Home Button here maybe? Or keep in header? Let's place it above grid */}
          {/* <button onClick={handlegohome} className="home-button"> Home </button> */}
          {/* If you want a heading specific to *practice* projects below the banner */}
          {/* <h2 className="section-heading-practice" data-aos="fade-up">Practice Projects</h2> */}


          {/* Loading / Error / No Data Messages */}
          {isLoading && <p className="status-message">Loading Projects...</p>}
          {error && <p className="error-message">{error}</p>}
          {!isLoading && !error && (!allPracticeProjects || allPracticeProjects.length === 0) && (
            <p className="status-message">No projects currently available.</p>
          )}

          {/* Grid for the Project Cards */}
          {!isLoading && !error && allPracticeProjects && allPracticeProjects.length > 0 && (
             <div className="courses-grid">
                {allPracticeProjects.map((item, index) => {
                  const title = item?.title ?? 'Untitled Project';
                  const projectKey = item?._id ?? `project-${index}`;
                  const description = item?.description ?? 'No description available for this project.'; // Default description
                  const image = item?.image; // Assuming image URL is correct
                  const link = item?.link;
                  // const tags = item?.tags ?? []; // Tags are not used in the target card style

                  return (
                    // Removed 'card-style' class as .course-card is now the primary style
                    <div key={projectKey} className="course-card" data-aos="fade-up" data-aos-delay={index * 50}>
                      {image && (
                        <div className="course-image">
                           <img src={image || 'https://via.placeholder.com/300x200?text=Project+Image'} alt={title} loading="lazy"/>
                        </div>
                      )}
                      <div className="course-content">
                        <h3 className="course-title-main">
                          {/* Pass raw title to let CSS handle text-transform: capitalize */}
                          {title}
                        </h3>
                        {/* Added paragraph for description, styled by .course-content p */}
                        <p>{description}</p>
                         <div className="course-actions">
                           <a href={link || '#'} target={link ? '_blank' : '_self'} rel="noopener noreferrer" className="read-more-btn">
                             Read more
                           </a>
                         </div>
                         {/* Tags are not part of the target card style from the first example */}
                         {/*
                         {Array.isArray(tags) && tags.length > 0 && (
                           <div className="course-tags">
                             {tags.map((tag, i) => <span key={`${projectKey}-tag-${i}`} className="tag-bubble">{tag}</span>)}
                           </div>
                         )}
                         */}
                      </div>
                    </div>
                  );
                })}
             </div>
          )}
        </div>
      </section>

      {/* <Footer /> */} {/* Optional: If you have a global footer */}
    </>
  );
};

export default PracticeProjectsS;