import React, { useState, useEffect, useRef } from 'react';
import './About.css';
import tushantImage from "../assets/tushant.jpg"; // Make sure the path is correct

function About() {
  const [showMore, setShowMore] = useState(false);

  // States and Refs for Intersection Observer
  const [imageVisible, setImageVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const handleToggle = () => setShowMore(!showMore);

  // Intersection Observer Logic
  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Callback function for observers
    const observerCallback = (entries, observerInstance, setVisible) => {
      entries.forEach(entry => {
        // Log intersection status for debugging
        console.log(`Element intersecting: ${entry.isIntersecting}`, entry.target);
        if (entry.isIntersecting) {
          console.log(`Setting visible:`, entry.target); // Log when setting visible
          setVisible(true);
          observerInstance.unobserve(entry.target); // Stop observing once visible
        }
      });
    };

    // Create observers
    const imageObserver = new IntersectionObserver(
        (entries, observer) => observerCallback(entries, observer, setImageVisible),
        options
    );

    const contentObserver = new IntersectionObserver(
        (entries, observer) => observerCallback(entries, observer, setContentVisible),
        options
    );

    // Store refs in variables to use in cleanup function
    const currentImageRef = imageRef.current;
    const currentContentRef = contentRef.current;

    // Start observing elements if they exist
    if (currentImageRef) {
      imageObserver.observe(currentImageRef);
    }
    if (currentContentRef) {
      contentObserver.observe(currentContentRef);
    }

    // Cleanup function to disconnect observers when component unmounts
    return () => {
      if (currentImageRef) {
        imageObserver.unobserve(currentImageRef);
      }
      if (currentContentRef) {
        contentObserver.unobserve(currentContentRef);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section id="about" className="about-section">
      <div className="about-container">

        {/* Left Side - Image */}
        <div
          // Add ref and conditional class based on visibility state
          className={`about-image ${imageVisible ? 'is-visible' : ''}`}
          ref={imageRef}
        >
          <img src={tushantImage} alt="Tushant Kumar" />
        </div>

        {/* Right Side - Content */}
        <div
          // Add ref and conditional class based on visibility state
          className={`about-content ${contentVisible ? 'is-visible' : ''}`}
          ref={contentRef}
        >
          <h2>
            <span className="heading-highlight">Hey,</span> {/* Yellow Part */}
            <span className="heading-main"> I’m Tushant Kumar</span> {/* Default/Dark Part */}
          </h2>
          <p> An AIML and IoT specialist with 4+ years of experience. I’ve led hands-on projects and trained 600+ students in cutting-edge technologies. I hold an M.Tech and am pursuing a PhD under the prestigious Visvesvaraya Scheme by MeitY.
            <br /><br />
            {showMore && (
              <>
              I believe in practical, skill-based learning that empowers every student. One proud moment was mentoring a team that built an IoT-based healthcare system using AIML to predict health risks from real-time sensor data—proving how tech can truly save lives
                <br /><br />
                When I’m not working, I enjoy roadside chai and local markets, drawing inspiration from everyday life. My mission is to spark confidence in every learner—city or village—so they can shape their future with pride.
              </>
            )}
          </p>
          <button className="read-more-btn" onClick={handleToggle}>
            {showMore ? 'Read Less ▲' : 'Read More ▼'}
          </button>
        </div>

      </div>
    </section>
  );
}

export default About;