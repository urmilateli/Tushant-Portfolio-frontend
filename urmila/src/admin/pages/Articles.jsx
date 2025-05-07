import { useState, useEffect } from "react";
import axios from "../api/axios"; // Assuming this is correctly configured
import Navbar_admin from "../admin-components/Navbar_admin";
import ImageUploader_admin from "../admin-components/ImageUploader";
import "./admin-style.css";

function Articles_admin() {
  const [articles, setArticles] = useState([]);
  // --- ADDED 'link' to form state ---
  const [form, setForm] = useState({ title: "", content: "", date: "", image: "", link: "" });
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

   // Base URL for displaying images (if needed, adjust as per your setup)
   const displayBaseUrl = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000';


  const fetchArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Ensure correct API endpoint relative to axios baseURL
      const res = await axios.get("/articles");
      setArticles(res.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      alert("Please fill in Title and Content.");
      return;
    }

    // The 'form' state now includes 'link', so it will be sent automatically
    try {
      if (editId) {
        await axios.put(`/articles/${editId}`, form);
      } else {
        await axios.post("/articles", form);
      }
      // --- ADDED 'link' to reset ---
      setForm({ title: "", content: "", date: "", image: "", link: "" }); // Reset form
      setEditId(null);
      fetchArticles(); // Refresh list
    } catch (err) {
      console.error("Error saving article:", err);
      alert(`Failed to save article: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEdit = (item) => {
    const formattedDate = item.date ? new Date(item.date).toISOString().split('T')[0] : "";
    setForm({
      title: item.title || "",
      content: item.content || "",
      date: formattedDate,
      image: item.image || "",
      // --- ADDED 'link' population ---
      link: item.link || ""
    });
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(`/articles/${id}`);
        fetchArticles(); // Refresh list
        // If the deleted item was being edited, cancel edit mode
        if (editId === id) {
            handleCancelEdit();
        }
      } catch (err) {
        console.error("Error deleting article:", err);
        alert(`Failed to delete article: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const handleCancelEdit = () => {
    // --- ADDED 'link' to reset ---
    setForm({ title: "", content: "", date: "", image: "", link: "" }); // Reset form
    setEditId(null);
  };

  // Construct full image URL for preview using displayBaseUrl (if applicable)
   const previewImageUrl = form.image ?
      (form.image.startsWith('http') || form.image.startsWith('blob:') ? form.image : `${displayBaseUrl}${form.image.startsWith('/') ? '' : '/'}${form.image}`)
      : null;


  return (
    <>
      <div className="urmi">
        <Navbar_admin />
        <div className="admin-container">
          <div className="admin-page articles-admin">
            <h2 className="admin-heading">Articles</h2>

            {/* --- Form Section --- */}
            <div className="admin-form-section card-style">
              <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input id="title" className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Article Title" required />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea id="content" className="form-textarea" rows="5" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Article content" required />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date (Optional)</label>
                  <input id="date" className="form-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>

                {/* --- ADDED Link Input Field --- */}
                <div className="form-group">
                  <label htmlFor="link">Link (Optional)</label>
                  <input
                    id="link"
                    className="form-input"
                    type="url" // Use type="url" for better validation/semantics
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    placeholder="https://example.com/full-article-link"
                  />
                </div>
                {/* --- End Link Input Field --- */}

                <div className="form-group">
                  <label>Image</label>
                  <ImageUploader_admin
                     onUpload={(url) => setForm({ ...form, image: url })}
                     existingImageUrl={form.image} // Pass existing image path/URL if needed by uploader
                  />
                  {previewImageUrl && <img src={previewImageUrl} alt="Preview" className="image-preview" />}
                </div>
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

              <ul className="item-list articles-item-list">
                {!isLoading && articles.map((item) => {
                   // Construct full image URL for display
                   const imageUrl = item.image ?
                     (item.image.startsWith('http') ? item.image : `${displayBaseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`)
                     : null;

                   return (
                     <li className="item-card card-style" key={item._id}>
                       {imageUrl && (
                         <div className="item-image-wrapper">
                           <img src={imageUrl} alt={item.title || 'Article'} className="item-image" loading="lazy" />
                         </div>
                       )}
                       <div className="item-content">
                         <h4 className="item-title">{item.title || "*Untitled*"}</h4>
                         <p className="item-description">{item.content || "*No content*"}</p>
                         {item.date && (
                           <div className="item-date">
                             {new Date(item.date).toLocaleDateString("en-GB")}
                           </div>
                         )}

                         {/* --- ADDED Link Display --- */}
                         {item.link && item.link.trim() !== "" && (
                           <div className="item-link-wrapper"> {/* You can reuse the CSS class from MyProjects */}
                             <strong>Link: </strong>
                             <a href={item.link} target="_blank" rel="noopener noreferrer" className="item-link">
                               {item.link}
                             </a>
                           </div>
                         )}
                         {/* --- End Link Display --- */}

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

export default Articles_admin;