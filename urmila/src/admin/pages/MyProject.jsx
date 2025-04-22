// src/admin/pages/MyProjects_admin.jsx

import React, { useState, useEffect } from "react";
// Correctly configured axios instance with baseURL 'http://localhost:5000/api'
import axios from "../api/axios";
import Navbar_admin from "../admin-components/Navbar_admin";
import ImageUploader_admin from "../admin-components/ImageUploader";
import "./admin-style.css"; // Ensure this CSS file is imported

function MyProjects_admin() {
  const [myProjects, setMyProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: "", // Should store the relative path like /uploads/imagename.jpg
    tags: "",
  });
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for displaying images (without the /api part)
  // In a real app, get this from an environment variable too if it differs from VITE_API_BASE's domain
  const displayBaseUrl = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000';


  // --- Fetch all "My Projects" ---
  const fetchMyProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // *** CORRECTED PATH: Relative to baseURL ('http://localhost:5000/api') ***
      const res = await axios.get("/myproject"); // REMOVED /api prefix
      setMyProjects(res.data);
    } catch (err) {
      console.error("Error fetching my projects:", err);
      const errorMessage = err.response?.data?.message || err.message || "Unknown error occurred";
      // Include requested URL in error if available
      const requestedUrl = err.config?.url;
      setError(`Failed to load my projects${requestedUrl ? ` from ${requestedUrl}` : ''}: ${errorMessage}`);
      setMyProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Fetch projects when component mounts ---
  useEffect(() => {
    fetchMyProjects();
  }, []); // Empty dependency array ensures it runs once on mount

  // --- Handle form submission (Add or Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      alert("Please fill in the Title.");
      return;
    }
    const processedForm = {
      ...form,
      image: form.image, // Assuming this holds the correct relative path like /uploads/image.jpg
      tags: form.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
    };

    // Axios interceptor should handle the token automatically based on your config

    try {
      if (editId) {
        // *** CORRECTED PATH: Relative to baseURL ***
        await axios.put(`/myproject/${editId}`, processedForm); // REMOVED /api prefix
      } else {
        // *** CORRECTED PATH: Relative to baseURL ***
        await axios.post("/myproject", processedForm); // REMOVED /api prefix
      }
      setForm({ title: "", description: "", link: "", image: "", tags: "" });
      setEditId(null);
      fetchMyProjects(); // Refresh list
    } catch (err) {
      console.error("Error saving my project:", err);
      const errorMessage = err.response?.data?.message || err.message || "Unknown error occurred";
      alert(`Failed to save my project: ${errorMessage}`);
    }
  };

  // --- Handle clicking the Edit button ---
  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      description: item.description || "",
      link: item.link || "",
      image: item.image || "", // Use the stored relative image path
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
    });
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Handle clicking the Delete button ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
       // Axios interceptor handles token
      try {
        // *** CORRECTED PATH: Relative to baseURL ***
        await axios.delete(`/myproject/${id}`); // REMOVED /api prefix
        fetchMyProjects(); // Refresh list
        if (editId === id) {
            handleCancelEdit();
        }
      } catch (err) {
        console.error("Error deleting my project:", err);
        const errorMessage = err.response?.data?.message || err.message || "Unknown error occurred";
        alert(`Failed to delete my project: ${errorMessage}`);
      }
    }
  };

  // --- Handle clicking the Cancel Edit button ---
  const handleCancelEdit = () => {
    setForm({ title: "", description: "", link: "", image: "", tags: "" });
    setEditId(null);
  };

  // --- Construct full image URL for preview using displayBaseUrl ---
  const previewImageUrl = form.image ?
     (form.image.startsWith('http') || form.image.startsWith('blob:') ? form.image : `${displayBaseUrl}${form.image.startsWith('/') ? '' : '/'}${form.image}`)
     : null;


  // --- RETURN STATEMENT ---
  return (
    <>
      <div className="urmi">
        <Navbar_admin />
        <div className="admin-container">
          <div className="admin-page myprojects-admin">
            <h2 className="admin-heading"> My Projects</h2>

            {/* --- Form Section --- */}
            <div className="admin-form-section card-style">
              <form className="admin-form" onSubmit={handleSubmit}>
                 <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input id="title" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project Title" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea id="description" className="form-textarea" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Project Description" />
                </div>
                <div className="form-group">
                  <label htmlFor="link">Link (Optional)</label>
                  <input id="link" className="form-input" type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://example.com" />
                </div>
                <div className="form-group">
                   <label htmlFor="tags">Tags (Comma-separated)</label>
                   <input id="tags" className="form-input" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="e.g., React, Node.js, API" />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <ImageUploader_admin
                    onUpload={(url) => setForm({ ...form, image: url })} // Uploader should return relative path e.g., /uploads/image.jpg
                    existingImageUrl={form.image}
                  />
                  {/* Use the constructed preview URL */}
                  {previewImageUrl && <img src={previewImageUrl} alt="Preview" className="image-preview" />}
                </div>
                <div className="form-button-group">
                  <button className="submit-button" type="submit">
                    {editId ? "Update Project" : "Add Project"}
                  </button>
                  {editId && (
                    <button type="button" className="cancel-button" onClick={handleCancelEdit}>
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* --- List Section --- */}
            <div className="admin-list-section">
              <h3 className="list-heading">Existing My Projects ({myProjects.length})</h3>
              {isLoading && <p className="loading-text">Loading...</p>}
              {/* Display more informative error message */}
              {error && <p className="error-text" style={{ whiteSpace: 'pre-wrap' }}>{error}</p>}
              {!isLoading && !error && myProjects.length === 0 && <p>No projects found. Add one using the form above!</p>}

              <ul className="item-list myprojects-item-list">
                {!isLoading && !error && myProjects.map((item) => {
                  const tagsString = Array.isArray(item.tags) ? item.tags.join(", ") : "";
                   // Construct full image URL from stored path/URL using displayBaseUrl
                  const imageUrl = item.image ?
                     (item.image.startsWith('http') ? item.image : `${displayBaseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`)
                     : null;

                  return (
                    <li className="item-card card-style" key={item._id}>
                      {imageUrl && (
                        <div className="item-image-wrapper">
                          <img src={imageUrl} alt={item.title || 'My Project'} className="item-image" loading="lazy"/>
                        </div>
                      )}
                      <div className="item-content">
                        <h4 className="item-title">{item.title || "*Untitled*"}</h4>
                        <p className="item-description">{item.description || "*No description*"}</p>
                        {item.link && item.link.trim() !== "" && (
                          <div className="item-link-wrapper">
                            <strong>Link: </strong>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="item-link">{item.link}</a>
                          </div>
                         )}
                        {tagsString && (
                          <div className="item-tags-wrapper">
                            <strong>Tags: </strong>
                            <span className="item-tags">{tagsString}</span>
                          </div>
                        )}
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

export default MyProjects_admin;