// src/admin/pages/PracticesProject.jsx

import { useState, useEffect } from "react";
import axios from "../api/axios"; // *** Use the configured instance ***
import Navbar_admin from "../admin-components/Navbar_admin";
import ImageUploader_admin from "../admin-components/ImageUploader";
import "./admin-style.css";

// Renamed component for clarity in App.jsx import if desired
function PracticesProject_Admin() {
  const [practiceProjects, setPracticeProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
    tags: "",
  });
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

 

  // --- Define API Endpoint Base Path (relative to axios baseURL) ---
  // *** This MUST match the endpoint used by the public display component ***
  const API_ENDPOINT = "/practiceprojects";

  // --- Fetch all practice projects ---
  const fetchPracticeProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Fetching admin practice projects from: ${API_ENDPOINT}`);
      const res = await axios.get(API_ENDPOINT); // Use configured axios
      if (Array.isArray(res.data)) {
        setPracticeProjects(res.data);
      } else {
        console.error("API did not return an array:", res.data);
        setError("Received invalid data format from server.");
        setPracticeProjects([]);
      }
    } catch (err) {
      console.error("Error fetching practice projects:", err);
      setError(`Failed to load practice projects: ${err.response?.data?.message || err.message}`);
      setPracticeProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Fetch on component mount ---
  useEffect(() => {
    fetchPracticeProjects();
  }, []);

  // --- Handle form submission (Add or Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Please fill in the Title.");
      return;
    }
    const processedForm = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
    };
    const url = editId ? `${API_ENDPOINT}/${editId}` : API_ENDPOINT;
    const method = editId ? 'put' : 'post';
    console.log(`Submitting (${method}) to: ${url}`);
    try {
      await axios[method](url, processedForm); // Use configured axios
      setForm({ title: "", description: "", link: "", image: "", tags: "" });
      setEditId(null);
      fetchPracticeProjects();
      alert(`Practice project ${editId ? 'updated' : 'added'} successfully!`);
    } catch (err) {
      console.error(`Error ${editId ? 'updating' : 'adding'} practice project:`, err);
      alert(`Failed to save practice project: ${err.response?.data?.message || err.message}`);
    }
  };

  // --- Handle Edit ---
  const handleEdit = (item) => {
     if (!item || !item._id) return;
     setForm({
       title: item.title || "",
       description: item.description || "",
       link: item.link || "",
       image: item.image || "",
       tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
     });
     setEditId(item._id);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Handle Delete ---
   const handleDelete = async (id) => {
     if (!id) return;
     if (window.confirm("Are you sure you want to delete this practice project?")) {
       try {
         const url = `${API_ENDPOINT}/${id}`;
         console.log(`Deleting from: ${url}`);
         await axios.delete(url); // Use configured axios
         fetchPracticeProjects();
         alert("Practice project deleted successfully!");
         if (editId === id) handleCancelEdit();
       } catch (err) {
         console.error("Error deleting practice project:", err);
         alert(`Failed to delete practice project: ${err.response?.data?.message || err.message}`);
       }
     }
   };

  // --- Handle Cancel Edit ---
  const handleCancelEdit = () => {
    setForm({ title: "", description: "", link: "", image: "", tags: "" });
    setEditId(null);
  };

  // --- RETURN JSX ---
  return (
    <>
      {/* Assuming Navbar_admin should be here */}
      <Navbar_admin />
      <div className="admin-container">
        <div className="admin-page practicesproject-admin">
          <h2 className="admin-heading">Practice Projects</h2>

          {/* Form Section (Keep as is) */}
          <div className="admin-form-section card-style">
            <form className="admin-form" onSubmit={handleSubmit}>
               {/* Title */}
               <div className="form-group">
                 <label htmlFor="pp-title">Title <span className="required-asterisk">*</span></label>
                 <input id="pp-title" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Practice Project Title" required maxLength={150} />
               </div>
               {/* Description */}
               <div className="form-group">
                 <label htmlFor="pp-description">Description</label>
                 <textarea id="pp-description" className="form-textarea" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detailed description..." />
               </div>
               {/* Link */}
               <div className="form-group">
                 <label htmlFor="pp-link">Link (Optional)</label>
                 <input id="pp-link" className="form-input" type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
               </div>
               {/* Tags */}
               <div className="form-group">
                 <label htmlFor="pp-tags">Tags (Comma-separated)</label>
                 <input id="pp-tags" className="form-input" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="e.g., API, Frontend, React" />
               </div>
               {/* Image Uploader */}
               <div className="form-group">
                 <label>Image</label>
                 <ImageUploader_admin onUpload={(url) => setForm({ ...form, image: url })} />
                 {form.image && (
                     <div className="image-preview-container">
                         <img src={form.image} alt="Current preview" className="image-preview" />
                         <button type="button" className="remove-image-button" onClick={() => setForm({...form, image: ''})}>Remove</button>
                     </div>
                 )}
               </div>
               {/* Buttons */}
               <div className="form-button-group">
                 <button className="submit-button" type="submit" disabled={isLoading}>
                   {editId ? "Update Project" : "Add Project"}
                 </button>
                 {editId && ( <button type="button" className="cancel-button" onClick={handleCancelEdit}>Cancel Edit</button> )}
               </div>
            </form>
          </div>

          {/* List Section (Keep as is) */}
          <div className="admin-list-section">
            <h3 className="list-heading">Existing Practice Projects ({practiceProjects.length})</h3>
            {isLoading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">Error: {error}</p>}
            {!isLoading && !error && practiceProjects.length === 0 && <p className="no-items-text">No projects found.</p>}
            {!isLoading && !error && practiceProjects.length > 0 && (
              <ul className="item-list practicesproject-item-list">
                {practiceProjects.map((item) => {
                  const tagsString = Array.isArray(item.tags) ? item.tags.join(", ") : "";
                  return (
                    <li className="item-card card-style" key={item._id}>
                      {item.image && (<div className="item-image-wrapper"><img src={item.image} alt={item.title || ""} className="item-image" loading="lazy"/></div>)}
                      <div className="item-content">
                        <h4 className="item-title">{item.title || "Untitled"}</h4>
                        <p className="item-description">{item.description || "No description"}</p>
                        {item.link && (<div className="item-link-wrapper"><strong>Link: </strong><a href={item.link} target="_blank" rel="noopener noreferrer" className="item-link" title={item.link}>{item.link.length > 40 ? item.link.substring(0, 40) + '...' : item.link}</a></div>)}
                        {tagsString && (<div className="item-tags-wrapper"><strong>Tags: </strong><span className="item-tags">{tagsString}</span></div>)}
                      </div>
                      <div className="button-group">
                        <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PracticesProject_Admin; // Use the specific name if you renamed it