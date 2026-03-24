
import { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Trending from "./components/Trending";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (text) => {

    if (!text.trim()) return;

    const newPost = {
      id: Date.now(),
      username: "Sujithra",
      content: text,
      likes: 0,
      time: new Date().toLocaleTimeString(),
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const deletePost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== id)
    );
  };

  const likePost = (id) => {

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );

  };

  return (

    <Router>

      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Home Page */}
        <Route
          path="/home"
          element={
            <div className="layout">

              <Sidebar />

              <Feed
                posts={posts}
                addPost={addPost}
                deletePost={deletePost}
                likePost={likePost}
              />

              <Trending />

            </div>
          }
        />

      </Routes>

    </Router>

  );
}

export default App;