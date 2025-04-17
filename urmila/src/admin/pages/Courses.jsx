// src/admin/pages/Courses_admin.jsx

import { useState, useEffect } from "react";
import axios from "../api/axios"; // Your configured axios instance
import Navbar_admin from "../admin-components/Navbar_admin";
import ImageUploader_admin from "../admin-components/ImageUploader";
import "./admin-style.css"; // Ensure this CSS file is imported

function Courses_admin() {
  // State for courses list
  const [courses, setCourses] = useState([]);
  // State for the form (matches course schema fields)
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
    tags: "", // Store tags as a comma-separated string in the form
  });
  // State to track if editing or adding
  const [editId, setEditId] = useState(null);
  // Optional loading/error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch all courses ---
  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // *** Replace '/courses' with your ACTUAL API endpoint for courses ***
      const res = await axios.get("/courses");
      setCourses(res.data); // Assuming API returns an array of courses
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses.");
      setCourses([]); // Set empty on error
    } finally {
      setIsLoading(false);
    }
  };

  // --- Fetch courses when component mounts ---
  useEffect(() => {
    fetchCourses();
  }, []);

  // --- Handle form submission (Add or Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    // --- MODIFIED VALIDATION: Only Title is now required ---
    if (!form.title) {
      alert("Please fill in the Title."); // Updated alert message
      return; // Stop if title is empty
    }

    // Convert comma-separated tags string into an array for the backend
    const processedForm = {
      ...form,
      tags: form.tags
        .split(",") // Split the string by commas
        .map((tag) => tag.trim()) // Remove whitespace around each tag
        .filter((tag) => tag !== ""), // Remove any empty tags resulting from extra commas
    };

    try {
      if (editId) {
        // Update existing course
        // *** Replace `/courses/${editId}` with your ACTUAL update endpoint ***
        await axios.put(`/courses/${editId}`, processedForm);
      } else {
        // Add new course
        // *** Replace `/courses` with your ACTUAL add endpoint ***
        await axios.post("/courses", processedForm);
      }
      // Reset form and edit state, then refresh list
      setForm({ title: "", description: "", link: "", image: "", tags: "" });
      setEditId(null);
      fetchCourses();
    } catch (err) {
      console.error("Error saving course:", err);
      alert(`Failed to save course: ${err.response?.data?.message || err.message}`);
    }
  };

  // --- Handle clicking the Edit button ---
  const handleEdit = (item) => {
    // Pre-fill the form with the item's data
    // Join the tags array back into a comma-separated string for the form input
    setForm({
      title: item.title || "",
      description: item.description || "",
      link: item.link || "",
      image: item.image || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "", // Join tags for form input
    });
    setEditId(item._id); // Set the ID of the item being edited
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  // --- Handle clicking the Delete button ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        // *** Replace `/courses/${id}` with your ACTUAL delete endpoint ***
        await axios.delete(`/courses/${id}`);
        fetchCourses(); // Refresh the list
      } catch (err) {
        console.error("Error deleting course:", err);
        alert(`Failed to delete course: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  // --- Handle clicking the Cancel Edit button ---
  const handleCancelEdit = () => {
    setForm({ title: "", description: "", link: "", image: "", tags: "" }); // Reset form
    setEditId(null); // Clear edit state
  };


  // --- RETURN STATEMENT ---
  return (
    <>
      {/* Use your standard admin wrapper structure */}
      <div className="urmi">
        <Navbar_admin />
        <div className="admin-container">
          <div className="admin-page courses-admin"> {/* Specific class */}
            <h2 className="admin-heading">Manage Courses</h2>

            {/* --- Form Section --- */}
            <div className="admin-form-section card-style">
              <h3 className="form-title">{editId ? "Edit Course" : "Add New Course"}</h3>
              <form className="admin-form" onSubmit={handleSubmit}>

                {/* Form Fields */}
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  {/* --- Title is still required in the input field itself --- */}
                  <input id="title" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Course Title" required/>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  {/* --- Removed 'required' from textarea --- */}
                  <textarea id="description" className="form-textarea" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Course Description" />
                </div>

                <div className="form-group">
                  <label htmlFor="link">Link (Optional)</label>
                  <input id="link" className="form-input" type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://example.com/course" />
                </div>

                <div className="form-group">
                   <label htmlFor="tags">Tags (Comma-separated)</label>
                   <input id="tags" className="form-input" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="e.g., Web Dev, React, JavaScript" />
                </div>

                <div className="form-group">
                  <label>Image</label>
                  <ImageUploader_admin onUpload={(url) => setForm({ ...form, image: url })} />
                  {form.image && <img src={form.image} alt="Preview" className="image-preview" />}
                </div>

                {/* Buttons */}
                <div className="form-button-group">
                  <button className="submit-button" type="submit">
                    {editId ? "Update Course" : "Add Course"}
                  </button>
                  {editId && (
                    <button type="button" className="cancel-button" onClick={handleCancelEdit}>
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* --- List Section (No changes needed here for validation) --- */}
            <div className="admin-list-section">
              <h3 className="list-heading">Existing Courses ({courses.length})</h3>
              {isLoading && <p className="loading-text">Loading...</p>}
              {error && <p className="error-text">{error}</p>}
              {!isLoading && !error && courses.length === 0 && <p>No courses found.</p>}

              <ul className="item-list courses-item-list">
                {!isLoading && courses.map((item) => {
                  const tagsString = Array.isArray(item.tags) ? item.tags.join(", ") : "";
                  return (
                    <li className="item-card card-style" key={item._id}>
                      {item.image && ( <div className="item-image-wrapper"><img src={item.image} alt={item.title || 'Course'} className="item-image" loading="lazy"/></div> )}
                      <div className="item-content">
                        <h4 className="item-title">{item.title || "*Untitled*"}</h4>
                        <p className="item-description">{item.description || "*No description*"}</p>
                        {item.link && ( <div className="item-link-wrapper"><strong>Link: </strong><a href={item.link} target="_blank" rel="noopener noreferrer" className="item-link">{item.link}</a></div> )}
                        {tagsString && ( <div className="item-tags-wrapper"><strong>Tags: </strong><span className="item-tags">{tagsString}</span></div> )}
                      </div>
                      <div className="button-group">
                        <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses_admin;