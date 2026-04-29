import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, toggleLike } from "../store/slices/postSlice";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const isOwner = (user?._id || user?.id) === post.userId;

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/posts/delete/post/${post._id}`,
        { method: "DELETE" },
      );

      if (response.ok) {
        dispatch(deletePost(post._id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    // 🔥 FIX: static posts (no backend)
    if (String(post._id).startsWith("static_")) {
      dispatch(toggleLike(post._id));
      return;
    }

    // 🔥 backend posts
    try {
      const response = await fetch("http://localhost:5000/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: post._id,
          isLiked: post.isLiked,
        }),
      });

      if (response.ok) {
        dispatch(toggleLike(post._id));
      } else {
        console.log("Like API failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 border-b flex gap-3">
      {/* Profile Icon */}
      <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
        {post.fullname?.charAt(0).toUpperCase()}
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between">
          <div>
            <h4 className="font-bold">{post.fullname}</h4>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>

          {isOwner && (
            <button onClick={handleDelete} className="text-red-500">
              🗑️
            </button>
          )}
        </div>

        {/* Text */}
        {post.content && <p className="mt-2">{post.content}</p>}

        {/* Image */}
        {post.image && (
          <img src={post.image} alt="post" className="mt-2 rounded w-full" />
        )}

        {/* Actions */}
        <div className="mt-3 flex gap-5">
          {/* Like */}
          <button onClick={handleLike} className="flex gap-1 items-center">
            {post.isLiked ? "❤️" : "🤍"}
            <span>{post.likes || 0}</span>
          </button>

          {/* Comment */}
          <button className="flex gap-1 items-center">
            💬 <span>0</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
