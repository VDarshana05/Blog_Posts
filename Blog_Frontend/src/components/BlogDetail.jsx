import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogDetail() {
  const { index } = useParams();  // get post id from route params
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/posts/${index}`);
        // res.data is a single post object, not an array, so set directly
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load blog post");
      }
    };
    fetchPost();
  }, [index]);

  if (error) return <p className="text-center mt-10">{error}</p>;
  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">Published on {blog.date}</p>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto rounded-xl mb-4 shadow-md"
        />
      )}
      <p className="text-lg leading-7">{blog.description}</p>

      <button
        className="mt-6 bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}
