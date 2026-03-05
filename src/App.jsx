import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (text) => {
    if (text.trim() === "") return;

    const newPost = {
      id: Date.now(),
      content: text,
      likes: 0
    };

    setPosts([newPost, ...posts]);
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const likePost = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        post.likes = post.likes + 1;
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <div className="layout">
      <Sidebar />

      <Feed
        posts={posts}
        addPost={addPost}
        deletePost={deletePost}
        likePost={likePost}
      />
    </div>
  );
}

export default App;