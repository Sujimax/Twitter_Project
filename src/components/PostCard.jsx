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
      const response = await fetch(`http://localhost:5000/posts/delete/post/${post._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch(deletePost(post._id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post._id, isLiked: post.isLiked }),
      });

      if (response.ok) {
        dispatch(toggleLike(post._id));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="p-4 border-b border-gray-100 flex gap-4 hover:bg-gray-50/50 transition-all duration-200 group">
      <div className="w-11 h-11 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex justify-center items-center text-white font-bold text-lg flex-shrink-0 shadow-sm overflow-hidden border-2 border-white">
        {post.fullname?.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h4 className="font-bold text-[#0f1419] hover:underline cursor-pointer decoration-blue-500 leading-tight">
              {post.fullname}
            </h4>
            <span className="text-[13px] text-gray-500 tabular-nums">
              {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
          {isOwner && (
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 transition-all p-2 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Delete Post"
            >
              <span className="text-sm">🗑️</span>
            </button>
          )}
        </div>
        {post.content && (
          <p className="mt-2 text-[15px] text-[#0f1419] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        )}

        {post.image && (
          <div className={`${post.content ? 'mt-3' : 'mt-1'} overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-gray-100`}>
            <img
              src={post.image}
              alt="Post media"
              className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-500 cursor-zoom-in"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}

        <div className="mt-3 flex gap-8">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm transition-all py-1 px-2 rounded-full hover:bg-red-50 group/like ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            <span className={`text-base transition-transform group-active/like:scale-125 ${post.isLiked ? 'scale-110' : ''}`}>
              {post.isLiked ? "❤️" : "🤍"}
            </span>
            <span className={`font-medium ${post.isLiked ? 'text-red-500' : ''}`}>
              {post.likes || 0}
            </span>
          </button>

          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-all py-1 px-2 rounded-full hover:bg-blue-50">
            <span className="text-base">💬</span>
            <span className="font-medium">0</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
