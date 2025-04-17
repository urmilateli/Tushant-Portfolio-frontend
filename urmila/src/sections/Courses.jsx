// src/sections/Courses.jsx

import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './Courses.css'; // Your frontend CSS file
import { FaExternalLinkAlt } from 'react-icons/fa'; // Icon for external links in title
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const Courses = () => {
  // State to hold ALL courses fetched from the API
  const [allCourses, setAllCourses] = useState([]);
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);
  // Hook for navigation
  // const navigate = useNavigate();

  // --- Define how many courses to show initially ---
  const initialDisplayCount = 3;

  // --- Fetch data when component mounts ---
  useEffect(() => {
    // Initialize AOS
    AOS.init({
        duration: 800, // Animation duration
        once: true,    // Animation happens only once
        offset: 50,    // Offset from trigger point
        delay: 50,     // Animation delay
    });

    setIsLoading(true); // Set loading before fetch
    setError(null);    // Reset error state

    fetch('http://localhost:5000/api/courses') // Your backend API endpoint
      .then((response) => {
        if (!response.ok) {
          // Throw an error if response status is not 2xx
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAllCourses(data); // Store ALL fetched courses in state
        } else {
          // Handle cases where API might not return an array
          console.error("Fetched courses data is not an array:", data);
          setAllCourses([]); // Set empty array to avoid map errors
          setError("Invalid data format received from server.");
        }
        setIsLoading(false); // Set loading to false after successful fetch
      })
      .catch((error) => {
        // Handle fetch errors (network issue, API error)
        console.error('Error fetching courses:', error);
        setError(`Failed to load courses: ${error.message}`);
        setIsLoading(false); // Set loading to false even on error
        setAllCourses([]); // Ensure courses is empty on error
      });
  }, []); // Empty dependency array means this effect runs only once on mount

  // --- Determine which courses to display initially ---
  // Use slice() to get only the first 'initialDisplayCount' courses
  const coursesToShow = allCourses.slice(0, initialDisplayCount);

  // --- Handle Loading State ---
  if (isLoading) {
    return (
      <section id="courses" className="courses-section loading">
        <div className="container">
          <h2 className="section-heading">Courses & Certifications</h2>
          <p style={{ textAlign: 'center', padding: '2rem 0' }}>Loading Courses...</p>
        </div>
      </section>
    );
  }

  // --- Handle Error State ---
  if (error) {
    return (
      <section id="courses" className="courses-section error">
        <div className="container">
          <h2 className="section-heading">Courses & Certifications</h2>
          {/* Display the error message */}
          <p className="error-message" style={{ textAlign: 'center' }}>{error}</p>
        </div>
      </section>
    );
  }

  // --- Handle No Courses Found (after loading, no error) ---
  // If fetch was successful but returned 0 courses, you might want to show a message
  // or return null to hide the section entirely.
  if (allCourses.length === 0) {
    return (
      <section id="courses" className="courses-section">
        <div className="container">
          <h2 className="section-heading" data-aos="fade-up">Courses & Certifications</h2>
          <p style={{ textAlign: 'center' }}>No courses available at the moment.</p>
        </div>
      </section>
    );
    // Or return null; to hide the section completely if no courses.
  }

  // --- Navigate function for the button ---
  // const viewAllCourses = () => {
  //   navigate("/AllCourses"); // Use the path defined in your React Router setup
  // };

  // --- Render the main section ---
  return (
    <section id="courses" className="courses-section">
      <div className="container">
        <h2 className="section-heading" data-aos="fade-up">
          Courses & Certifications {/* Or your preferred heading */}
        </h2>

        {/* Grid displays only the first 3 courses */}
        <div className="courses-grid">
          {coursesToShow.map((item, index) => {
            // Basic validation for properties used in rendering
            const title = item?.title ?? 'Untitled Course';
            const description = item?.description ?? 'No description provided.';
            const imageUrl = item?.image;
            const link = item?.link;
            const tags = item?.tags;
            const courseKey = item?._id ?? `course-${index}`; // Use _id or index as key

            return (
              // --- Course Card Structure ---
              <div key={courseKey} className="course-card card-style" data-aos="fade-up" data-aos-delay={index * 100}>
                {/* Image */}
                {imageUrl && (
                  <div className="course-image">
                    <img src={imageUrl} alt={title} loading="lazy"/>
                  </div>
                )}
                {/* Content */}
                <div className="course-content">
                  <h3 className="course-title">
                    {link && link !== "#" ? (
                      <a href={link} target="_blank" rel="noopener noreferrer" title={`Visit ${title} (opens in new tab)`}>
                        {title} <FaExternalLinkAlt className="course-link-icon" />
                      </a>
                    ) : (
                      title
                    )}
                  </h3>
                  <p className="course-description">{description}</p>
                  {/* Tags */}
                  {Array.isArray(tags) && tags.length > 0 && (
                    <div className="course-tags">
                      {tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag-bubble">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              // --- End Course Card Structure ---
            );
          })}
        </div>

        {/* --- Conditionally render "View All" button --- */}
        {/* Check if the TOTAL number of courses is greater than the number shown */}
        {/* {allCourses.length > initialDisplayCount && (
          // <div className="view-all-courses-container" data-aos="fade-up">
          //   <button className="view-all-courses-btn" onClick={viewAllCourses}>
          //     View All Courses
          //   </button>
          // </div>
        )} */}

      </div>
    </section>
  );
};

export default Courses;