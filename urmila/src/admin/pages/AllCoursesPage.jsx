// src/pages/AllCoursesPage.jsx
import React from 'react';
import Courses from '../sections/Courses'; // Import the Courses component
import './AllCoursesPage.css'; // Optional: Add styling for the page

function AllCoursesPage() {
  return (
    <div className="all-courses-page">
      <h1>Available Courses</h1>
      <p>Browse through our comprehensive list of courses.</p>
      <hr />
      <Courses /> {/* Render the component that lists courses */}
    </div>
  );
}

export default AllCoursesPage;