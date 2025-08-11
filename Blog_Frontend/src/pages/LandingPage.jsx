import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../components/ui/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultPosts = [
  {
    title: "The Rise of React",
    description: "A quick overview of how React became so popular.",
    date: "2025-07-28",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
  },
  {
    title: "Deploying Your First Web App on Vercel",
    description: "Step-by-step walkthrough for React/Next.js apps using Vercel.",
    date: "2025-08-01",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
  },
  {
    title: "What is CI/CD? Explained with Jenkins",
    description: "Get started with Jenkins for Java/Maven CI/CD.",
    date: "2025-07-12",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
  },
];

export default function LandingPage() {
  const [backendPosts, setBackendPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const postsPerPage = 6;
  const navigate = useNavigate();

  // Fetch posts for current page from backend
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8000/posts?page=${page}&limit=${postsPerPage}`
        );
        // Mark source for styling
        setBackendPosts(res.data.map((post) => ({ ...post, source: "user" })));
      } catch (err) {
        console.error("Error fetching posts", err);
        setBackendPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  // Combine backend posts + default posts if we're on last page (no backend posts returned)
  const isLastBackendPage = backendPosts.length < postsPerPage;
  const allPosts = isLastBackendPage
    ? [...backendPosts, ...defaultPosts.map((p) => ({ ...p, source: "default" }))]
    : backendPosts;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <h1
          className="text-2xl font-bold text-blue-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          TechBlogs
        </h1>
        <nav className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/add-blog")}
            className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
          >
            Create Blog
          </button>
        </nav>
      </header>

      <h1 className="text-3xl font-bold text-center text-blue-800 mt-10 mb-10">
        EXPLORE, LEARN and SHARE YOUR KNOWLEDGE
      </h1>

      {loading ? (
        <p className="text-center text-gray-700">Loading posts...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-16">
            {allPosts.map((blog, index) => (
              <Card
                key={blog.id ?? index}
                className={`rounded-2xl shadow-md hover:shadow-lg transition ${
                  blog.source === "user" ? "border-blue-400 border" : ""
                }`}
              >
                <CardContent className="p-4">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-xl mb-3"
                    />
                  )}
                  <CardTitle className="text-xl font-semibold mb-2">
                    {blog.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mb-2">
                    {blog.description.length > 20
                      ? `${blog.description.slice(0, 20)}...`
                      : blog.description}
                  </p>
                  {blog.description.length > 20 && (
                    <button
                      className="text-blue-800 hover:underline text-sm font-medium mb-2"
                      onClick={() => navigate(`/blog/${blog.id ?? index}`)}
                    >
                      View more
                    </button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination buttons */}
          <div className="flex justify-center space-x-4 mt-10 mb-10">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span className="flex items-center text-gray-700 font-semibold">
              Page {page}
            </span>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={isLastBackendPage && defaultPosts.length === 0}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      <footer className="text-center text-gray-500 mt-10 py-6 border-t text-sm">
        © 2025 TechBlogs. Built with 💙 by Darshana
      </footer>
    </div>
  );
}
