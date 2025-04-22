import { useState, useEffect } from "react";
import axios from "../api/axios";
import Navbar_admin from "../admin-components/Navbar_admin";
import ImageUploader_admin from "../admin-components/ImageUploader";
import "./admin-style.css"; // Ensure this CSS file is imported and contains relevant styles

function Articles_admin() {
  // --- State and Functions (Keep EXACTLY as in your original code) ---
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", date: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Optional: Add loading state
  const [error, setError] = useState(null);       // Optional: Add error state

  const fetchArticles = async () => {
    setIsLoading(true); // Optional
    setError(null);    // Optional
    try {
        const res = await axios.get("/articles");
        setArticles(res.data);
    } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles."); // Optional
    } finally {
        setIsLoading(false); // Optional
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.title || !form.content) {
      alert("Please fill in Title and Content.");
      return;
    }
    try {
        if (editId) {
        await axios.put(`/articles/${editId}`, form);
        } else {
        await axios.post("/articles", form);
        }
        setForm({ title: "", content: "", date: "", image: "" }); // Reset form
        setEditId(null);
        fetchArticles(); // Refresh list
    } catch (err) {
         console.error("Error saving article:", err);
         alert(`Failed to save article: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEdit = (item) => {
     // Ensure date is formatted correctly for the date input (YYYY-MM-DD)
     const formattedDate = item.date ? new Date(item.date).toISOString().split('T')[0] : "";
     // Make sure the state update matches the form state structure
     setForm({
         title: item.title || "",
         content: item.content || "", // Use content here
         date: formattedDate,
         image: item.image || ""
     });
     setEditId(item._id);
     window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional scroll
  };

  const handleDelete = async (id) => {
     if (window.confirm("Are you sure you want to delete this article?")) {
        try {
            await axios.delete(`/articles/${id}`);
            fetchArticles(); // Refresh list
        } catch (err) {
             console.error("Error deleting article:", err);
             alert(`Failed to delete article: ${err.response?.data?.message || err.message}`);
        }
     }
  };

   const handleCancelEdit = () => { // Optional Cancel Edit function
     setForm({ title: "", content: "", date: "", image: "" }); // Reset form
     setEditId(null);
   };


  // --- RETURN STATEMENT ---
  return (
    <>
      <div className="urmi"> {/* Keep your outer div */}
        <Navbar_admin />
        {/* Use consistent container */}
        <div className="admin-container">
          <div className="admin-page articles-admin"> {/* Specific class */}
            <h2 className="admin-heading">Articles</h2>

            {/* --- Form Section (Keep As Is, structured) --- */}
            <div className="admin-form-section card-style">
                <form className="admin-form" onSubmit={handleSubmit}>
                     {/* Title Input */}
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input id="title" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Article Title" required/>
                    </div>
                    {/* Content Textarea */}
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" className="form-textarea" rows="5" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Article content" required />
                    </div>
                     {/* Date Input */}
                    <div className="form-group">
                        <label htmlFor="date">Date (Optional)</label>
                        <input id="date" className="form-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    </div>
                     {/* Image Uploader */}
                    <div className="form-group">
                        <label>Image</label>
                        <ImageUploader_admin onUpload={(url) => setForm({ ...form, image: url })} />
                        {form.image && <img src={form.image} alt="Preview" className="image-preview" />}
                    </div>
                    {/* Buttons */}
                    <div className="form-button-group">
                        <button className="submit-button" type="submit">
                            {editId ? "Update Article" : "Add Article"}
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
              <h3 className="list-heading">Existing Articles ({articles.length})</h3>
              {isLoading && <p className="loading-text">Loading...</p>}
              {error && <p className="error-text">{error}</p>}
              {!isLoading && !error && articles.length === 0 && <p>No articles found.</p>}

              <ul className="item-list articles-item-list"> {/* Specific class */}
                {!isLoading && articles.map((item) => (
                  // *** START OF REARRANGED LIST ITEM ***
                  <li className="item-card card-style" key={item._id}>

                    {/* 1. Image (First) */}
                    {item.image && (
                       <div className="item-image-wrapper">
                          <img src={item.image} alt={item.title || 'Article'} className="item-image" loading="lazy"/>
                       </div>
                    )}

                    {/* Content Wrapper */}
                    <div className="item-content">
                       {/* 2. Title */}
                       <h4 className="item-title">
                         {item.title || "*Untitled*"}
                       </h4>

                       {/* 3. Content/Description */}
                       <p className="item-description">
                         {item.content || "*No content*"} {/* Use item.content here */}
                       </p>

                       {/* 4. Date */}
                       {item.date && (
                         <div className="item-date">
                           {new Date(item.date).toLocaleDateString("en-GB")} {/* Or your preferred format */}
                         </div>
                       )}
                    </div>

                    {/* Buttons remain last */}
                    <div className="button-group">
                      <button className="edit-button" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                  // *** END OF REARRANGED LIST ITEM ***
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Articles_admin;