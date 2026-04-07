import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const searchPosts = createAsyncThunk("posts/search", async (query) => {
  if (!query.trim()) {
    const response = await axiosInstance.get("/posts");
    return response.data;
  }
  const response = await axiosInstance.get(`/posts/search?q=${query}`);
  return response.data;
});

const initialState = {
  // RESTORED STATIC POSTS as requested by user
  posts: [
    {
      _id: "static_1",
      fullname: "Elon Musk",
      content: "Twitter is now X! Let's build the future together. 🚀",
      createdAt: new Date().toISOString(),
      likes: 120,
      isLiked: false,
      image: "/mars_mission.png"
    },
    {
      _id: "static_11",
      fullname: "Nature Shots",
      content: "Into the woods. 🌲",
      createdAt: new Date().toISOString(),
      likes: 89,
      isLiked: false,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800"
    },
    {
      _id: "static_5",
      fullname: "Virat Kohli",
      content: "Dedication and hard work always pay off. Stay focused. 💪",
      createdAt: new Date().toISOString(),
      likes: 156,
      isLiked: false,
      image: "https://images.unsplash.com/photo-1540747913346-19e3adca174f?auto=format&fit=crop&q=80&w=800"
    }
  ],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Merging fetched posts with the static ones
    setPosts: (state, action) => {
      // Keep static posts at the bottom, real ones at the top
      const staticPosts = state.posts.filter(p => String(p._id).startsWith("static_"));
      state.posts = [...action.payload, ...staticPosts];
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((p) => (p._id || p.id) !== action.payload);
    },
    toggleLike: (state, action) => {
      const post = state.posts.find((p) => (p._id || p.id) === action.payload);
      if (post) {
        post.likes = post.isLiked ? post.likes - 1 : post.likes + 1;
        post.isLiked = !post.isLiked;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        const staticPosts = state.posts.filter(p => String(p._id).startsWith("static_"));
        state.posts = [...action.payload, ...staticPosts];
        state.loading = false;
        state.error = null;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addPost, deletePost, toggleLike, setPosts } = postSlice.actions;
export default postSlice.reducer;
