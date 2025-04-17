// src/components/Navbar.jsx
import React, { useState, useEffect} from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Ensure IDs are lowercase and match the section IDs
  const navLinks = [
    { title: 'Home', id: 'hero' },         // Matches Home section id
    { title: 'About', id: 'about' },        // Matches About section id
    { title: 'Achievements', id: 'achievements' }, // Matches Achievements section id
    { title: 'Courses', id: 'courses' },     // Matches Courses section id
    { title: 'Blog', id: 'blog' },        // Matches Blog section id
    // Contact button below uses 'contact' id
  ];

  // Smooth Scroll Function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else {
      console.error(`Navbar: Element with ID '${id}' not found.`);
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Add shadow after scrolling 50px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        {/* Logo */}
        <span onClick={() => scrollToSection('hero')} className="nav-logo" aria-label="Scroll to top">
          Tushant Kumar
        </span>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="nav-link">
                {link.title}
              </button>
            ))}
          </div>
           {/* Contact Button */}
           <button onClick={() => scrollToSection('contact')} className="btn btn-primary nav-contact-btn">
               Contact Me
           </button>
        </div>


        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle mobile menu">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`nav-links-mobile ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <button key={link.id} onClick={() => scrollToSection(link.id)} className="nav-link-mobile">
            {link.title}
          </button>
        ))}
        {/* Contact Button in Mobile Menu */}
        <button onClick={() => scrollToSection('contact')} className="btn btn-primary nav-contact-btn-mobile">
            Contact Me
        </button>
      </div>
    </nav>
  );
};

export default Navbar;