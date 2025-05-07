// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
// import logoImage from '../assets/tushantlogo5.png'; // Removed image import
import './Navbar.css'; // Ensure this CSS includes styles for .logo-lastname

const Navbar = () => {
  // State variables remain the same
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Navigation links configuration remains the same
  const navLinks = [
    { title: 'Home', id: 'hero' },
    { title: 'About', id: 'about' },
    { title: 'Achievements', id: 'achievements' },
    { title: 'Projects', id: 'projects' },
    { title: 'Blog', id: 'blog' },
  ];
  const contactLinkId = 'contact';
  const allSectionIds = [...navLinks.map(link => link.id), contactLinkId];
  const homeSectionId = navLinks.length > 0 ? navLinks[0].id : '';

  // Scrolling and Effect hooks remain the same
  const scrollToSection = (id) => {
    // ... (keep the function code as is)
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    } else {
      console.error(`Navbar: Element with ID '${id}' not found for scrolling.`);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    // ... (keep scroll style effect as is)
    const handleScrollStyle = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScrollStyle);
    return () => window.removeEventListener('scroll', handleScrollStyle);
  }, []);

  useEffect(() => {
    // ... (keep scroll spy effect as is)
     const handleScrollSpy = () => {
      let currentSection = '';
      const scrollPosition = window.scrollY;
      const offset = 80;

      allSectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          if (scrollPosition >= elementTop - offset && scrollPosition < elementTop + elementHeight - offset) {
            currentSection = id;
          }
        }
      });

      const firstSectionElement = document.getElementById(homeSectionId);
      if (firstSectionElement && scrollPosition < firstSectionElement.offsetTop - offset) {
        currentSection = homeSectionId;
      }
       // Check if near the bottom
      if ((window.innerHeight + scrollPosition) >= document.body.offsetHeight - 50) {
         if(allSectionIds.length > 0){
            // Highlight the last section ID (usually contact)
            currentSection = allSectionIds[allSectionIds.length - 1];
         }
      }


      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      } else if (!currentSection && activeSection && scrollPosition < 50) {
         // Ensure 'Home' is active when scrolled to the very top
         setActiveSection(homeSectionId);
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy(); // Initial check
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [activeSection, allSectionIds, homeSectionId]);


  // --- Render the Navbar ---
  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">

        {/* Logo/Brand Name - UPDATED with span for last name */}
        <div
          onClick={() => scrollToSection(homeSectionId)}
          className="nav-logo" // Keep the class for styling
          aria-label="Scroll to top"
          style={{ cursor: 'pointer' }} // Keep pointer cursor
        >
          Tushant{/* First part gets default .nav-logo color (white) */}
          {' '} {/* Optional: Add a space */}
          <span className="logo-lastname">Kumar</span> {/* Wrap last name in span */}
        </div>

        {/* --- Desktop Navigation Menu (Keep as is) --- */}
        <div className="nav-menu-desktop">
          {/* ... (keep desktop links and contact button) ... */}
           <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.title}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollToSection(contactLinkId)}
            className={`btn btn-primary nav-contact-btn ${activeSection === contactLinkId ? 'active' : ''}`}
           >
            Contact Me
          </button>
        </div>

        {/* --- Mobile Menu Toggle Button (Keep as is) --- */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* --- Mobile Navigation Menu Panel (Keep as is) --- */}
      <div className={`nav-links-mobile ${isOpen ? 'open' : ''}`}>
         {/* ... (keep mobile links and contact button) ... */}
         {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`nav-link-mobile ${activeSection === link.id ? 'active' : ''}`}
          >
            {link.title}
          </button>
        ))}
        <button
          onClick={() => scrollToSection(contactLinkId)}
          className={`btn btn-primary nav-contact-btn-mobile ${activeSection === contactLinkId ? 'active' : ''}`}
        >
            Contact Me
        </button>
      </div>
    </nav>
  );
};

export default Navbar;