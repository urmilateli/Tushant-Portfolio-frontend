import React, { useState, useRef, useEffect } from 'react';
import axios from '../api/axios';
// Assuming admin-style.css is imported globally or in a parent component
// If not, import it here: import "../pages/admin-style.css";

const ImageUploader_admin = ({ onUpload, initialImageUrl = null }) => {
  const [file, setFile] = useState(null);
  // Use initialImageUrl if provided, otherwise null
  const [preview, setPreview] = useState(initialImageUrl);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef();

  // Effect to update preview if initialImageUrl changes (e.g., when editing)
  useEffect(() => {
    setPreview(initialImageUrl);
     // If an initial image is set, clear any selected file state
    if (initialImageUrl) {
        setFile(null);
        if (fileInputRef.current) {
             fileInputRef.current.value = '';
        }
    }
  }, [initialImageUrl]);


  const handleFileSelectClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click(); // Trigger hidden file input
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setMessage("Only image files are allowed.");
      setTimeout(() => setMessage(''), 3000);
      setFile(null);
      setPreview(initialImageUrl); // Revert preview to initial or null
      e.target.value = '';
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); // Show preview of the NEW file
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', file); // Key 'image'

    try {
      const res = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data && res.data.imageUrl) {
        onUpload(res.data.imageUrl); // Pass URL to parent
        setMessage("✅ Image uploaded successfully!");
        // Keep the preview showing the uploaded image URL from response if needed
        // Or clear it if parent component handles the display entirely
        // setPreview(res.data.imageUrl); // Optional: update preview to final URL

        setFile(null); // Clear selected file state
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset input
        }
        setTimeout(() => setMessage(''), 3000);
      } else {
         throw new Error("Image URL not found in response");
      }

    } catch (err) {
      console.error('Upload failed:', err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || "Upload failed. Please try again.";
      setMessage(`❌ ${errorMsg}`);
      // Let error message persist longer
       setTimeout(() => setMessage(''), 5000);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePreview = () => {
    setFile(null);
    setPreview(null); // Clear preview entirely
    onUpload(""); // Notify parent that image is removed
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
    setMessage('');
  };

  return (
    <div className="image-uploader-container">
      {/* Hidden actual file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        disabled={uploading}
      />

      {/* Custom button to trigger file selection */}
      {!preview && (
        <button
          type="button"
          onClick={handleFileSelectClick}
          className="button-secondary" // Use general button styling
          disabled={uploading}
        >
          Choose Image
        </button>
      )}

      {/* Preview Area */}
      {preview && (
        <div className="preview-area">
          <img src={preview} alt="Preview" className="preview-image" />
          <button
            type="button"
            onClick={handleRemovePreview}
            className="button-remove-preview"
            title="Remove Image"
            disabled={uploading}
          >
            ×
          </button>
        </div>
      )}

      {/* Upload Button - show only if a NEW file is selected */}
      {file && !uploading && (
         <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="upload-btn" // Specific class if needed
         >
           Upload Image
         </button>
      )}

      {/* Uploading Indicator */}
       {uploading && <div className="upload-indicator">Uploading...</div>}

      {/* Message Area */}
      {message && <p className={`upload-message ${message.startsWith('✅') ? 'success' : message.startsWith('❌') ? 'error' : ''}`}>{message}</p>}
    </div>
  );
};

export default ImageUploader_admin;