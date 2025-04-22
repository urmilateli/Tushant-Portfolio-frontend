// src/sections/Home.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
      AOS.init({ duration: 1000, once: true });
  }, []);

  // Function to navigate to the PUBLIC practice projects display page
  const goToPracticeProjects = () => {
    // Navigates to the route defined in App.jsx for PracticeProjectsS
    navigate('/practiceprojects');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else {
      console.warn(`Element with id "${id}" not found for scrolling.`);
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title" data-aos="fade-down">
          Tushant Kumar: <span className="highlight">Empowering the Future</span> with AIML & IoT
        </h1>
        <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
         Expert here to unlock your potential. Having trained over 600 students, I’m on a mission to equip you with the skills to carve your own path—without limits. Let’s build your tomorrow, today.
        </p>
        <div className="hero-cta-buttons" data-aos="fade-up" data-aos-delay="200">
          {/* Button now calls the correct navigation function */}
          <button onClick={goToPracticeProjects} className="btn btn-primary-inverted">
            Practice Projects {/* This button takes user to /practiceprojects */}
          </button>
          <button onClick={() => scrollToSection('contact')} className="btn btn-secondary-inverted-outline">
             Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;