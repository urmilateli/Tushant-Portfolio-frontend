// src/admin/admin-components/Navbar_admin.jsx

import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import './Navbar_admin.css';

function Navbar_admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
    color: isActive ? "white" : "#d1d5db"
  });

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-links">
        <NavLink to="/dashboard" className="admin-nav-link" style={navLinkStyle}>Dashboard</NavLink>
         <NavLink to="/myprojects" className="admin-nav-link" style={navLinkStyle}>My Projects</NavLink> 
        <NavLink to="/achievements" className="admin-nav-link" style={navLinkStyle}>Achievements</NavLink>
        <NavLink to="/articles" className="admin-nav-link" style={navLinkStyle}>Articles</NavLink>
        <NavLink to="/PracticesProject_Admin" className="admin-nav-link" style={navLinkStyle}>Practice Projects</NavLink>
      </div>
      <div className="admin-navbar-actions">
        <Link to="/" className="admin-nav-button go-home">Go to Site</Link>
        <button onClick={handleLogout} className="admin-nav-button logout">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar_admin;