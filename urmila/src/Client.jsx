// src/Client.jsx
import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import Home from './sections/Home.jsx';
import About from './sections/About.jsx';
import Achievements from './sections/Achievements.jsx';
import Courses from './sections/Courses.jsx'; // <<< ENSURE THIS IS PRESENT
import Blog from './sections/Blog.jsx';
import Contact from './sections/Contact.jsx';
import AOS from 'aos';

function Client() {
  useEffect(() => {
    AOS.init({ /* AOS settings */ });
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <Home />
        <About />
        <Achievements />
        <Courses /> {/* <<< Renders the featured courses section */}
        <Blog />
        <Contact />
      </main>
      <ScrollToTopButton />
    </div>
  );
}
export default Client;