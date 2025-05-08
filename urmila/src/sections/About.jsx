import React, { useState, useEffect, useRef } from 'react';
import './About.css'; // Ensure this CSS file is in the same directory or path is correct
import tussuImage from '../assets/Tussu.jpg'; // Verify this path

function About() {
  const [showMore, setShowMore] = useState(false);
  const textBlockRef = useRef(null);
  const imageBlockRef = useRef(null);
  const [textBlockVisible, setTextBlockVisible] = useState(false);

  const handleToggle = () => setShowMore(prevShowMore => !prevShowMore);

  useEffect(() => {
    const currentTextBlockRef = textBlockRef.current;
    if (!currentTextBlockRef) return;

    const options = { root: null, rootMargin: '0px', threshold: 0.2 };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTextBlockVisible(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(currentTextBlockRef);

    return () => {
      if (currentTextBlockRef) {
        observer.unobserve(currentTextBlockRef);
      }
    };
  }, []);

  return (
    <section id="about" className="about-section-new">
      <div className="about-container-new">
        <div
          className={`about-text-block ${textBlockVisible ? 'is-visible' : ''}`}
          ref={textBlockRef}
        >
          <h2 className="about-heading-new">
            About <span className="highlight-new">me</span>
          </h2>
          <h3 className="about-subheading-new">
            <span className="highlight-new">AIML & IoT</span> Specialist
          </h3>
          <p className="about-paragraph-new">
            An AIML and IoT specialist with 4+ years of experience. I've led
            hands-on projects and trained 600+ students in cutting-edge
            technologies. I hold an M.Tech and am pursuing a PhD under the
            prestigious Visvesvaraya Scheme by MeitY.
          </p>
          {showMore && (
            <div className="additional-text-new">
              <p>
                I believe in practical, skill-based learning that empowers every student.
                One proud moment was mentoring a team that built an IoT-based healthcare
                system using AIML to predict health risks from real-time sensor
                data—proving how tech can truly save lives.
              </p>
              <p>
                When I’m not working, I enjoy roadside chai and local markets,
                drawing inspiration from everyday life. My mission is to spark
                confidence in every learner—city or village—so they can shape
                their future with pride.
              </p>
            </div>
          )}
          {/* MODIFIED BUTTON CODE STARTS HERE */}
          <button className="about-button-new" onClick={handleToggle}>
            {showMore ? 'See less' : 'See more'}
            <span className="about-button-new__blobs">
              <div></div>
              <div></div>
              <div></div>
            </span>
          </button>
          {/* MODIFIED BUTTON CODE ENDS HERE */}
        </div>

        <div
          className="about-image-block"
          ref={imageBlockRef}
        >
          <img src={tussuImage} alt="Tushant Kumar" className="profile-image-new" />
        </div>
      </div>
      {/*
        REMINDER: Ensure the SVG filter for the gooey effect is included in your project.
        You can add this SVG code to your main index.html (in the public folder)
        or render it once at the root of your React application.

        <svg style="position: absolute; width: 0; height: 0;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      */}
    </section>
  );
}

export default About;