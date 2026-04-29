import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 🔹 Search Posts
export const searchPosts = createAsyncThunk("posts/search", async (query) => {
  const res = !query.trim()
    ? await axiosInstance.get("/posts")
    : await axiosInstance.get(`/posts/search?q=${query}`);

  return res.data;
});

// 🔹 Initial State (3 static posts, 2 with images)
const initialState = {
  posts: [
    {
      _id: "static_1",
      fullname: "Elon Musk",
      content: "Building the future 🚀",
      createdAt: new Date().toISOString(),
      likes: 20,
      isLiked: false,
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80"
    },
    {
      _id: "static_2",
      fullname: "Nature Lover",
      content: "Peaceful forest 🌲",
      createdAt: new Date().toISOString(),
      likes: 35,
      isLiked: false,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
    },
    {
      _id: "static_3",
      fullname: "Motivation Hub",
      content: "Success doesn't come from what you do occasionally, it comes from what you do consistently 💪🔥",
      createdAt: new Date().toISOString(),
      likes: 45,
      isLiked: false
    },
    {
      _id: "static_4",
      fullname: "Food Lover",
      content: "Delicious pizza time 🍕😋",
      createdAt: new Date().toISOString(),
      likes: 30,
      isLiked: false,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
    }
  ],
  loading: false,
  error: null,
};

// 🔹 Slice
const postSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    // 🔥 Keep static posts always
    setPosts: (state, action) => {
      const staticPosts = state.posts.filter((p) =>
        String(p._id).startsWith("static_")
      );
      state.posts = [...action.payload, ...staticPosts];
    },

    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (p) => (p._id || p.id) !== action.payload
      );
    },

    toggleLike: (state, action) => {
      const post = state.posts.find(
        (p) => (p._id || p.id) === action.payload
      );

      if (post) {
        post.isLiked = !post.isLiked;
        post.likes = post.isLiked
          ? post.likes + 1
          : post.likes - 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        const staticPosts = state.posts.filter((p) =>
          String(p._id).startsWith("static_")
        );
        state.posts = [...action.payload, ...staticPosts];
        state.loading = false;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// 🔹 Export
export const { addPost, deletePost, toggleLike, setPosts } = postSlice.actions;
export default postSlice.reducer;

