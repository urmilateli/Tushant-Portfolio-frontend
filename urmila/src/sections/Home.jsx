// src/sections/Home.jsx  <-- File ka naam yeh hona chahiye

import React from 'react';
import './Home.css'; // <-- Step 1: Ensure CSS file is named Home.css and imported

// Step 2: Rename the function from Hero to Home
const Home = () => {
  // Re-use smooth scroll logic (yeh function sahi hai)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    // Use id="home" agar aap is section ko "Home" bolna chahte hain, ya "hero" hi rehne dein agar wahi ID use karni hai Navbar se link karne ke liye
    <section id="hero" className="hero-section"> {/* ID "hero" rakha hai taaki Navbar link kaam kare */}
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title" data-aos="fade-down">
          Tushant Kumar: <span className="highlight">Empowering the Future</span> with AIML & IoT
        </h1>
        <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
         expert here to unlock your potential. Having trained over 600 students, I’m on a mission to equip you with the skills to carve your own path—without limits. Let’s build your tomorrow, today.        </p>
        <div className="hero-cta-buttons" data-aos="fade-up" data-aos-delay="200">
          <button onClick={() => scrollToSection('projects')} className="btn btn-primary-inverted">
            View My Work
          </button>
          <button onClick={() => scrollToSection('contact')} className="btn btn-secondary-inverted-outline">
             Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

// Step 3: Export the component with the correct name 'Home'
export default Home;