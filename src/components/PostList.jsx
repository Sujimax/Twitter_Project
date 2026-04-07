import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/slices/postSlice";
import PostCard from "./PostCard";

const PostList = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (response.ok) {
          const data = await response.json();
          dispatch(setPosts(data));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [dispatch]);

  if (!posts || posts.length === 0) {
    return <div className="p-10 text-center text-gray-500 italic">No posts yet!</div>;
  }

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
