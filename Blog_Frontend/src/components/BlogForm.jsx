import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
export default function BlogForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const options = {
      maxSizeMB: 0.5, // Compress to under 0.5MB
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
      setFormData((prev) => ({ ...prev, image: base64 }));
    } catch (error) {
      console.error("Image compression error:", error);
    }
  }
};



  const handleSubmit = async(e) => {
  e.preventDefault();

  const newPost = {
    title: formData.title,
    description: formData.description,
    date: new Date().toISOString().split("T")[0],
    image: formData.image, // already a preview URL
  };
   try {
    const response = await fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      navigate("/landing");
    } else {
      console.error("Failed to create post");
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
  
};


  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Blog Description"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}
