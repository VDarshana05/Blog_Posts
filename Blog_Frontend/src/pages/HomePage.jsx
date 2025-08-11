import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-6">
      <motion.div
        className="max-w-2xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
         <button
            onClick={() => navigate("/signin")}
            className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
          >
            Get Started
          </button>
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Welcome to TechBlogs
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Discover insightful articles, share your thoughts, and stay updated
          with the latest in tech.
        </motion.p>

        <motion.button
          onClick={() => navigate("/landing")}
          className="bg-blue-800 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-full transition duration-300 shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore More
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomePage;
