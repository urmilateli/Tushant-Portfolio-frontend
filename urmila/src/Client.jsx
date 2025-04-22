// src/Client.jsx
import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import Home from './sections/Home.jsx';
import About from './sections/About.jsx';
import Achievements from './sections/Achievements.jsx';
import Blog from './sections/Blog.jsx';
import Contact from './sections/Contact.jsx';
import AOS from 'aos';
import Projects from './sections/Projects.jsx';

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
        <Projects/>
        <Blog />
        <Contact />
      </main>
      <ScrollToTopButton />
    </div>
  );
}
export default Client;