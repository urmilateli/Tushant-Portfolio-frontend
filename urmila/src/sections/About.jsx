import React, { useState } from 'react';
import './About.css';
import tushantImage from "../assets/tushant.jpg";
 // Correct image import path

function About() {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => setShowMore(!showMore);

  return (
    <section id="about" className="about-section">
      <div className="about-container">

        {/* Left Side - Image */}
        <div className="about-image">
          <img src={tushantImage} alt="Tushant Kumar" />
        </div>

        {/* Right Side - Content */}
        <div className="about-content">
        <h2>
            <span className="heading-highlight">Hey,</span> {/* Yellow Part */}
            <span className="heading-main"> I’m Tushant Kumar</span> {/* Default/Dark Part */}
          </h2>
          <p>
            With over 4 years of experience as an AIML and IoT specialist, I’ve worked on countless hands-on projects and trained more than 600 students...
            <br /><br />
            {showMore && (
              <>
                I guided students to create an IoT-based healthcare monitoring system that uses AIML to predict health risks...
                <br /><br />
                When I’m not teaching or building intelligent systems, you’ll likely find me sipping chai or exploring local markets...
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