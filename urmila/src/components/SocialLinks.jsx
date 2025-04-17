import React from 'react';
import {
  FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaGithub, FaMediumM, FaSpotify
} from 'react-icons/fa';
import { SiGooglescholar } from "react-icons/si";
import './SocialLinks.css';

const socialMedia = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tushant2109/', icon: FaLinkedin },
  { name: 'Facebook', url: 'https://www.facebook.com/tushantkumar.official', icon: FaFacebook },
  { name: 'Instagram', url: 'https://www.instagram.com/tushant2109/', icon: FaInstagram },
  { name: 'Youtube', url: 'https://www.youtube.com/@tushantkumar', icon: FaYoutube },
  { name: 'Spotify', url: 'https://open.spotify.com/user/tushant2109', icon: FaSpotify },
  { name: 'GitHub', url: 'https://github.com/tushant2109', icon: FaGithub },
  { name: 'Medium', url: 'https://medium.com/@tushant2109', icon: FaMediumM },
  { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=tushant2109', icon: SiGooglescholar },
];

const SocialLinks = () => (
  <div className="social-links">
    {socialMedia.map(({ name, url, icon: Icon }) => (
      <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="social-icon">
        <Icon title={name} />
      </a>
    ))}
  </div>
);

export default SocialLinks;