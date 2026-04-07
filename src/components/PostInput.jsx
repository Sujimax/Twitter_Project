import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/slices/postSlice";

const PostInput = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !user) return;
    
    setLoading(true);

    const postData = {
      content: content,
      userId: user._id || user.id,
      fullname: user.fullname
    };

    try {
      const response = await fetch("http://localhost:5000/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(addPost({
          _id: result.insertedId,
          ...postData,
          createdAt: new Date().toISOString(),
          likes: 0
        }));
        setContent("");
      } else {
        alert("Server error: Failed to create post");
      }
    } catch (error) {
      alert("Error connecting to server. Is the backend running on port 5000?");
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-b">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="w-full text-xl outline-none resize-none"
          rows="3"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim() || loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostInput;