// src/sections/Blog.jsx
import React, { useEffect, useState } from 'react';
import './Blog.css'; // Ensure this CSS file includes the NEW styles added below

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Assuming displayBaseUrl might be needed for images from API ---
  const displayBaseUrl = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000';

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Using axios instance if you have one, otherwise stick to fetch
    // For consistency with other examples, assuming fetch for now
    fetch('http://localhost:5000/api/articles')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          // --- Log the data received in frontend ---
          console.log("Fetched articles data:", data);
          setPosts(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setPosts([]);
          setError("Invalid data format received.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts.');
        setIsLoading(false);
        setPosts([]);
      });
  }, []);

  // Loading, Error, No Posts states remain the same...
  if (isLoading) { return <section id="blog" className="blog-section loading"><div className="container"><p style={{textAlign: 'center'}}>Loading Articles...</p></div></section>; }
  if (error) { return <section id="blog" className="blog-section error"><div className="container"><h2 className="section-heading">Blogs</h2><p className="error-message" style={{textAlign: 'center'}}>{error}</p></div></section>; }
  if (!posts || posts.length === 0) { return <section id="blog" className="blog-section"><div className="container"><h2 className="section-heading" data-aos="fade-up">Blogs</h2><p style={{textAlign: 'center'}}>No blog posts available yet.</p></div></section>; }


  return (
    <section id="blog" className="blog-section">
      <div className="container">
        <h2 className="section-heading" data-aos="fade-up">
          Blogs
        </h2>
        <div className="blog-grid">
          {posts.map((post, index) => {
            // --- Log individual post to check for 'link' ---
             console.log(`Post ${index}:`, post);

            const title = post?.title ?? 'Untitled Post';
            const content = post?.content ?? 'No content available.';
            const rawImageUrl = post?.image; // Get the raw image path/URL
            const date = post?.date;
            const link = post?.link; // Get the link, DON'T default to '#' here yet
            const postKey = post?._id ?? `post-${index}`;

            // Construct full image URL for display
            const imageUrl = rawImageUrl ?
                 (rawImageUrl.startsWith('http') ? rawImageUrl : `${displayBaseUrl}${rawImageUrl.startsWith('/') ? '' : '/'}${rawImageUrl}`)
                 : null;

            // Check if the link is valid (not null, not undefined, not empty string)
            const hasValidLink = link && typeof link === 'string' && link.trim() !== "" && link.trim() !== '#';

            return (
              <article
                key={postKey}
                className="blog-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >

                {/* === Image Container === */}
                {imageUrl && (
                   <div className="blog-card-image">
                       {/* Image is hidden by CSS, hover div shows it */}
                       <img src={imageUrl} alt={title} loading="lazy" />
                   </div>
                )}

                {/* === Image Hover Overlay === */}
                {imageUrl && (
                   <div
                     className="blog-card-image-hover"
                     style={{ backgroundImage: `url(${imageUrl})` }}
                   ></div>
                )}
                 {!imageUrl && (
                    <div className="blog-card-image-hover blog-card-image-placeholder"></div>
                 )}

                {/* === Content Container === */}
                <div className="blog-card-content">
                  {/* Title is now always just text */}
                  <h3 className="blog-card-title">
                    {title}
                  </h3>

                  <p className="blog-card-excerpt">{content}</p>

                  {/* --- ADDED: Explicit Link Display Area --- */}
                  {hasValidLink && (
                    <div className="blog-card-link-wrapper">
                      <a href={link} target="_blank" rel="noopener noreferrer" className="blog-card-link-display">
                        Read More {/* You can change this text */}
                      </a>
                    </div>
                  )}
                  {/* --- End Link Display Area --- */}


                  {/* Date Display (comes after link now) */}
                  {date && (
                    <p className="blog-card-date">
                      {new Date(date).toLocaleDateString("en-GB", { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  )}
                </div>

              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;