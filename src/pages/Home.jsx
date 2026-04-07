import React from "react";
import Sidebar from "../components/Sidebar";
import PostInput from "../components/PostInput";
import PostList from "../components/PostList";
import Trending from "../components/Trending";

const Home = () => {
  return (
    // Max-Width set panni, Center-la kondu vandhutta (mx-auto)
    <div className="max-w-[1250px] mx-auto flex min-h-screen">
      
      {/* 1. Left Sidebar (w-1/4) */}
      <aside className="hidden md:block w-1/4 border-r sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </aside>

      {/* 2. Main Center Posts (w-1/2 - Ippo idhu dhaan periya area) */}
      <main className="w-full md:w-1/2 border-r min-h-screen bg-white shadow-sm">
        <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b p-4 z-10">
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Main Feed</h1>
        </header>

        {/* Post Input */}
        <PostInput />

        {/* List of Tweets */}
        <PostList />
      </main>

      {/* 3. Right Trending (Same w-1/4 as Left) */}
      <aside className="hidden lg:block w-1/4 p-4 sticky top-0 h-screen">
        <Trending />
      </aside>

    </div>
  );
};

export default Home;
