// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoImage from '../assets/tushantlogo5.png'; // Updated path to tushantlogo5.png
import './Navbar.css';

const Navbar = () => {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  // State to track if the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  // State to track the currently active section for highlighting the link
  const [activeSection, setActiveSection] = useState('');

  // --- Configuration: Define Navigation Links and their Target Section IDs ---
  const navLinks = [
    { title: 'Home', id: 'hero' },
    { title: 'About', id: 'about' },
    { title: 'Achievements', id: 'achievements' },
    { title: 'Projects', id: 'projects' },
    { title: 'Blog', id: 'blog' },
  ];
  const contactLinkId = 'contact';
  // --- End Configuration ---

  const allSectionIds = [...navLinks.map(link => link.id), contactLinkId];
  const homeSectionId = navLinks.length > 0 ? navLinks[0].id : '';

  // --- Smooth Scrolling Function ---
  const scrollToSection = (id) => {
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

  // --- Effect for Navbar Style Change on Scroll ---
  useEffect(() => {
    const handleScrollStyle = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScrollStyle);
    return () => window.removeEventListener('scroll', handleScrollStyle);
  }, []);

  // --- Effect for Scrollspy (Highlighting Active Nav Link) ---
  useEffect(() => {
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
      if ((window.innerHeight + scrollPosition) >= document.body.offsetHeight - 50) {
         if(allSectionIds.length > 0){
            currentSection = allSectionIds[allSectionIds.length - 1];
         }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      } else if (!currentSection && activeSection && scrollPosition < 50) {
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

        {/* Logo/Brand Name - Updated to use image */}
        <img
          src={logoImage} // Uses the updated imported image variable (tushantlogo5.png)
          alt="Tushant Kumar Logo"
          onClick={() => scrollToSection(homeSectionId)}
          className="nav-logo"
          aria-label="Scroll to top"
          style={{ cursor: 'pointer', height: '40px' }}
        />

        {/* --- Desktop Navigation Menu --- */}
        <div className="nav-menu-desktop">
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

          {/* Contact Button */}
          <button
            onClick={() => scrollToSection(contactLinkId)}
            className={`btn btn-primary nav-contact-btn ${activeSection === contactLinkId ? 'active' : ''}`}
           >
            Contact Me
          </button>
        </div>

        {/* --- Mobile Menu Toggle Button --- */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* --- Mobile Navigation Menu Panel --- */}
      <div className={`nav-links-mobile ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`nav-link-mobile ${activeSection === link.id ? 'active' : ''}`}
          >
            {link.title}
          </button>
        ))}
        {/* Contact Button for Mobile */}
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