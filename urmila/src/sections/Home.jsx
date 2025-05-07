// src/sections/Home.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
// Icons (Keep your existing imports)
import {
  FaSpotify,
  FaInstagram,
  FaHome,
  FaFacebookF,
  FaMediumM,
  FaYoutube,
  FaGithub,
  FaLinkedinIn
} from 'react-icons/fa';
import { SiGooglescholar } from "react-icons/si"; // Assuming you added this
import './Home.css';
import profilePic from '../assets/TK.jpg'; // Make sure path is correct

// --- Configuration for Typing/Erasing Loop (Keep as is) ---
const PHRASES = [
  "AIML & IoT Specialist",
  "Tech that empowers lives.",
  "Turning ideas into innovation."
];
const TYPING_SPEED_MS = 50;
const ERASING_SPEED_MS = 20;
const PAUSE_BEFORE_ERASE_MS = 1500;
const PAUSE_BEFORE_TYPE_MS = 100;

const Home = () => {
  const navigate = useNavigate(); // Get the navigate function

  // --- State for Typing Effect (Keep as is) ---
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef(null);

  // --- Typing/Erasing Effect Logic (Keep as is) ---
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!PHRASES || PHRASES.length === 0) return;

    const currentPhrase = PHRASES[phraseIndex];

    const handleTypingLoop = () => {
      if (isTyping) {
        // Typing
        if (charIndex < currentPhrase.length) {
          setDisplayedText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(prevIndex => prevIndex + 1);
          timeoutRef.current = setTimeout(handleTypingLoop, TYPING_SPEED_MS);
        } else {
          // Pause then erase
          timeoutRef.current = setTimeout(() => {
            setIsTyping(false);
          }, PAUSE_BEFORE_ERASE_MS);
        }
      } else {
        // Erasing
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
          timeoutRef.current = setTimeout(handleTypingLoop, ERASING_SPEED_MS);
        } else {
          // Pause then type next phrase
          timeoutRef.current = setTimeout(() => {
            const nextPhraseIndex = (phraseIndex + 1) % PHRASES.length;
            setPhraseIndex(nextPhraseIndex);
            setCharIndex(0);
            setIsTyping(true);
          }, PAUSE_BEFORE_TYPE_MS);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTypingLoop, isTyping ? PAUSE_BEFORE_TYPE_MS : ERASING_SPEED_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayedText, isTyping, charIndex, phraseIndex]);


  // --- Scroll Function (Keep as is) ---
  const scrollToSection = (id) => {
     const element = document.getElementById(id);
     if (element) {
       const navbarHeight = 70; // Adjust if needed
       const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
       const offsetPosition = elementPosition - navbarHeight;
       window.scrollTo({ top: offsetPosition, behavior: "smooth" });
     } else {
       console.warn(`Element with id "${id}" not found for scrolling.`);
     }
   };

  return (
    <section id="home" className="home-section"> {/* Use id="home" or id="hero" consistently */}
      <div className="container home-container">

        {/* Left Content Area */}
        <div className="home-text-content">
          <p className="intro-text">Hi, I am</p>
          {/* --- UPDATED H1 Tag --- */}
          <h1 className="main-name">
            <span className="first-name-highlight">Tushant</span> Kumar
          </h1>
          {/* --- END UPDATED H1 Tag --- */}
          <p className="specialization-text">
             And I am an{' '}
             <span className="highlight">{displayedText}</span>
             {/* Assuming cursor is handled by CSS or added here if needed */}
             {/* <span className="typing-cursor">|</span> */}
          </p>
          <p className="description-text">
            Expert here to unlock your potential. Having trained over 600 students, I’m on a mission to equip you with the skills to carve your own path—without limits. Let’s build your tomorrow, today.
          </p>

          {/* Social Icons (Keep your existing icons with updated links) */}
          <div className="social-icons">
             <a href="https://www.linkedin.com/in/tushant2109/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
             <a href="https://github.com/tushantkumar2109" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
             <a href="https://open.spotify.com/show/53AhFAZZKNJ9Gc3hPblDJv?si=f358b86d766849a6" target="_blank" rel="noopener noreferrer" aria-label="Spotify"><FaSpotify /></a>
             <a href="https://www.instagram.com/tushant2109/profilecard/?igsh=MTRiZjFnenc4NjZ4eQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
             <a href="https://www.facebook.com/tushantkumar.official" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
             <a href="https://medium.com/@tushant2109" target="_blank" rel="noopener noreferrer" aria-label="Medium"><FaMediumM /></a>
             <a href="https://www.youtube.com/@tushantkumar" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
             <a href="https://scholar.google.com/citations?hl=en&user=Lp89A7EAAAAJ" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar"><SiGooglescholar /></a>
             <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Homepage/Portfolio"><FaHome /></a>
          </div>

          {/* UPDATED Buttons */}
          <div className="home-cta-buttons">
            {/* Button 1: Navigates to /practiceprojects */}
            <button onClick={() => navigate('/practiceprojects')} className="btn btn-primary">
              Practice project
            </button>
            {/* Button 2: Scrolls to #contact section */}
            <button onClick={() => scrollToSection('contact')} className="btn btn-secondary-outline">
              Get in touch
            </button>
          </div>
          {/* END UPDATED Buttons */}

        </div>

        {/* Right Content Area (Image) (Keep as is) */}
        <div className="home-image-content image-hover-area">
          <div className="profile-image-wrapper">
            <img src={profilePic} alt="Tushant Kumar" className="profile-image" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Home;