import React from "react";
import Sidebar from "../components/Sidebar";
import PostInput from "../components/PostInput";
import PostList from "../components/PostList";
import Trending from "../components/Trending";

const Home = () => {
  return (
        <div className="max-w-[1250px] mx-auto flex min-h-screen">
      
      {/* Left Sidebar */}

      <aside className="hidden md:block w-1/4 border-r sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Main Center Posts*/}
      <main className="w-full md:w-1/2 border-r min-h-screen bg-white">
        <header className="sticky top-0  border-b p-4 z-10">
          <h1 className="text-xl font-extrabold text-gray-900">Main Feed</h1>
        </header>

        {/* Post Input */}
        <PostInput />

        {/* List of Tweets */}
        <PostList />
      </main>

      {/* 3. Right Trending */}
      <aside className="hidden lg:block w-1/4 p-4 sticky top-0 h-screen">
        <Trending />
      </aside>

    </div>
  );
};

export default Home;
