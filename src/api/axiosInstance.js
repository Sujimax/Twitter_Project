// axiosInstance.js
// This file creates a single axios object that all API calls will use.
// It automatically adds the token from localStorage to every request.

import axios from "axios";

// Base URL of our backend server (Matched with .env PORT)
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// Before every request, attach the JWT token (if it exists)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
