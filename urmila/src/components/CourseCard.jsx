// src/components/CourseCard.jsx (Example Structure)
import React from 'react';
// You might not need to import Courses.css here if it's imported globally or in Courses.jsx
// import './CourseCard.css'; // Or import specific card styles if separated

function CourseCard({ course }) {
  // Destructure needed properties from the course object
  // Use placeholder data if properties might be missing
  const imageUrl = course.imageUrl || '/path/to/placeholder-image.jpg'; // Provide a default/placeholder
  const title = course.title || 'Course Title Not Available';
  // const description = course.shortDescription || ''; // Optional description

  return (
    // The main card container - applies background, shadow, padding etc.
    <div className="course-card">
      <div className="course-card-image-container">
        <img
          src={imageUrl}
          alt={`Image for ${title}`}
          className="course-card-image"
          onError={(e) => { e.target.onerror = null; e.target.src='/path/to/placeholder-image.jpg'; }} // Handle broken images
        />
      </div>
      <div className="course-card-content">
        <h3 className="course-card-title">{title}</h3>
        {/* You can add more details here if available and needed */}
        {/* <p className="course-card-description">{description}</p> */}
        {/* <span className="course-card-date">Start Date: {course.startDate}</span> */}
      </div>
    </div>
  );
}

export default CourseCard;