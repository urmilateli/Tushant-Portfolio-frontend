// src/sections/Blog.jsx
import React, { useEffect, useState } from 'react';
import './Blog.css'; // Make sure this CSS file is linked and has updated styles

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);       // Added error state

  useEffect(() => {
    // --- Fetch logic ---
    setIsLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/articles')  // Your API URL
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
        })
      .then((data) => {
        if (Array.isArray(data)) {
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
          setPosts([]); // Clear posts on error
        });
  }, []);

  // --- Loading State ---
  if (isLoading) {
     return (
       <section id="blog" className="blog-section loading">
         <div className="container"><p style={{textAlign: 'center'}}>Loading Articles...</p></div>
       </section>
     );
   }

  // --- Error State ---
  if (error) {
     return (
       <section id="blog" className="blog-section error">
         <div className="container">
           <h2 className="section-heading">Articles & Insights</h2>
           <p className="error-message" style={{textAlign: 'center'}}>{error}</p>
         </div>
       </section>
     );
   }

  // --- No Posts State ---
   if (!posts || posts.length === 0) {
     return (
        <section id="blog" className="blog-section">
            <div className="container">
                <h2 className="section-heading" data-aos="fade-up">
                Articles & Insights
                </h2>
                <p style={{textAlign: 'center'}}>No blog posts available yet.</p>
            </div>
        </section>
     );
   }


  // --- Render Blog Section ---
  return (
    <section id="blog" className="blog-section">
      <div className="container">
        <h2 className="section-heading" data-aos="fade-up">
          Articles & Insights
        </h2>
        <div className="blog-grid">
          {posts.map((post, index) => {
            // Basic validation/defaults
            const title = post?.title ?? 'Untitled Post';
            const content = post?.content ?? 'No content available.';
            const imageUrl = post?.image;
            const date = post?.date;
            const link = post?.link;
            const postKey = post?._id ?? `post-${index}`; // Prefer _id for key

            // *** START OF REARRANGED JSX ORDER ***
            return (
              <article key={postKey} className="blog-card card-style" data-aos="fade-up" data-aos-delay={index * 100}>

                {/* 1. Image (Conditionally Rendered First) */}
                {imageUrl && (
                  <div className="blog-card-image">
                    {/* Optional: Wrap image in link if post.link exists */}
                    {link && link !== "#" ? (
                       <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`Read more about ${title}`}>
                         <img src={imageUrl} alt={title} loading="lazy"/>
                       </a>
                    ) : (
                       <img src={imageUrl} alt={title} loading="lazy"/>
                    )}
                  </div>
                )}

                {/* Content Wrapper */}
                <div className="blog-card-content">

                  {/* 2. Title */}
                  <h3 className="blog-card-title">
                    {link && link !== "#" ? (
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {title}
                      </a>
                    ) : (
                      title
                    )}
                  </h3>

                  {/* 3. Content/Excerpt */}
                  <p className="blog-card-excerpt">{content}</p>

                  {/* 4. Date */}
                  {date && (
                     <p className="blog-card-date">
                        {new Date(date).toLocaleDateString("en-GB", { year: 'numeric', month: 'short', day: 'numeric' })} {/* Example format */}
                    </p>
                  )}

                  {/* Optional: Read More Link (Can go after date) */}
                  {link && link !== "#" && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="blog-card-link">
                      Read More →
                    </a>
                  )}

                </div>
              </article>
            );
             // *** END OF REARRANGED JSX ORDER ***
          })}
        </div>
        {/* Optional: Add a "View All Blog Posts" button/link here if needed */}
      </div>
    </section>
  );
};

export default Blog;