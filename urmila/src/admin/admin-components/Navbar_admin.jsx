import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import './Navbar_admin.css'; // Ensure this CSS is created/updated

function Navbar_admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the authentication token
    navigate('/login'); // Redirect to the login page (adjust if your login route is /admin)
  };

  // Define NavLink style based on active state
  const navLinkStyle = ({ isActive }) => {
      return {
          fontWeight: isActive ? "bold" : "normal",
          backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
          color: isActive ? "white" : "#d1d5db"
      };
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-links">
        {/* Use NavLink for active styling */}
        <NavLink to="/dashboard" className="admin-nav-link" style={navLinkStyle}>Dashboard</NavLink>
        <NavLink to="/courses" className="admin-nav-link" style={navLinkStyle}>Courses</NavLink>
        <NavLink to="/achievements" className="admin-nav-link" style={navLinkStyle}>Achievements</NavLink>
        <NavLink to="/articles" className="admin-nav-link" style={navLinkStyle}>Articles</NavLink>
      </div>
      <div className="admin-navbar-actions">
        {/* Link to the public home page */}
        <Link to="/" className="admin-nav-button go-home">Go to Home</Link>
        {/* Logout Button */}
        <button onClick={handleLogout} className="admin-nav-button logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar_admin;