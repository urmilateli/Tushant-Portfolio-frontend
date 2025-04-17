// src/admin/pages/Achievements.jsx

import { useState, useEffect } from "react";
import axios from "../api/axios";
import Navbar_admin from "../admin-components/Navbar_admin";
import ImageUploader_admin from "../admin-components/ImageUploader";
import "./admin-style.css"; // Make sure this CSS file is imported

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);       // Error state

  const fetchAchievements = async () => {
    setIsLoading(true);
    setError(null);
    try {
       // *** Replace '/achievements' with your ACTUAL endpoint if different ***
      const res = await axios.get("/achievements");
      setAchievements(res.data);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError("Failed to load achievements.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // --- MODIFIED VALIDATION: Only Title is now required ---
    if (!form.title) {
      alert("Please fill in the Title."); // Updated alert message
      return; // Stops if title is empty
    }

    try {
       // *** Replace endpoints if different ***
      if (editId) {
        await axios.put(`/achievements/${editId}`, form);
      } else {
        await axios.post("/achievements", form);
      }
      setForm({ title: "", description: "", date: "", image: "" }); // Reset form
      setEditId(null); // Reset edit state
      fetchAchievements(); // Refresh list
    } catch (err) {
       console.error("Error saving achievement:", err);
       alert(`Failed to save achievement: ${err.response?.data?.message || err.message}`); // Show error message
    }
  };

  const handleEdit = (item) => {
    // Ensure date is formatted correctly for the date input (YYYY-MM-DD)
    const formattedDate = item.date ? new Date(item.date).toISOString().split('T')[0] : "";
    setForm({ ...item, date: formattedDate });
    setEditId(item._id);
    // Optionally scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
     // Confirmation dialog
     if (window.confirm("Are you sure you want to delete this achievement?")) {
        try {
             // *** Replace endpoint if different ***
            await axios.delete(`/achievements/${id}`);
            fetchAchievements(); // Refresh list
        } catch (err) {
             console.error("Error deleting achievement:", err);
             alert(`Failed to delete achievement: ${err.response?.data?.message || err.message}`);
        }
     }
  };

   const handleCancelEdit = () => {
     setForm({ title: "", description: "", date: "", image: "" });
     setEditId(null);
   };

  return (
    <>
      {/* Assuming Navbar_admin is outside the main content flow or handled separately */}
      <Navbar_admin />
      {/* Added a container div for better structure and potential styling */}
      <div className="admin-container">
        <div className="admin-page achievements-admin"> {/* Added specific class */}
          <h2 className="admin-heading">Manage Achievements</h2>

          {/* Form Section */}
          <div className="admin-form-section card-style"> {/* Added card style */}
             <h3 className="form-title">{editId ? "Edit Achievement" : "Add New Achievement"}</h3>
             <form className="admin-form" onSubmit={handleSubmit}>
                {/* Input fields */}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    {/* Title remains required */}
                    <input id="title" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Achievement Title" required/>
                </div>
                <div className="form-group">
                     <label htmlFor="description">Description</label>
                    {/* --- Removed 'required' from textarea --- */}
                    <textarea id="description" className="form-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detailed description" rows="4"></textarea>
                </div>
                 <div className="form-group">
                    <label htmlFor="date">Date (Optional)</label>
                    <input id="date" className="form-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="form-group">
                     <label>Image</label>
                    <ImageUploader_admin onUpload={(url) => setForm({ ...form, image: url })} />
                    {form.image && <img src={form.image} alt="Preview" className="image-preview" />}
                </div>
                {/* Submit/Update/Cancel Buttons */}
                <div className="form-button-group">
                    <button className="submit-button" type="submit">
                        {editId ? "Update Achievement" : "Add Achievement"}
                    </button>
                     {editId && (
                        <button type="button" className="cancel-button" onClick={handleCancelEdit}>
                           Cancel Edit
                        </button>
                    )}
                </div>
            </form>
          </div>


          {/* List Section (Structure remains the same) */}
          <div className="admin-list-section">
            <h3 className="list-heading">Existing Achievements ({achievements.length})</h3>
            {isLoading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}
            {!isLoading && !error && achievements.length === 0 && <p>No achievements found.</p>}

            <ul className="item-list achievements-item-list"> {/* Added specific class */}
              {!isLoading && achievements.map((item) => {
                return (
                  // Apply card styling to each list item directly
                  <li className="item-card card-style" key={item._id}>

                    {/* 1. Image (Conditionally Rendered First) */}
                    {item.image && (
                      <div className="item-image-wrapper">
                        <img src={item.image} alt={item.title || 'Achievement'} className="item-image" loading="lazy" />
                      </div>
                    )}

                    {/* Wrapper for Text Content */}
                    <div className="item-content">
                        {/* 2. Title */}
                        <h4 className="item-title">
                        {item.title || "*Untitled*"}
                        </h4>
                        {/* 3. Description */}
                        <p className="item-description">{item.description || "*No description*"}</p>
                    </div>

                    {/* Optional: Date (Styled subtly) */}
                    {item.date && <div className="item-date">{new Date(item.date).toLocaleDateString("en-GB")}</div>}

                    {/* 4. Buttons */}
                    <div className="button-group">
                      <button className="edit-button" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Achievements;