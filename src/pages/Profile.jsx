import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Trending from "../components/Trending";
import PostInput from "../components/PostInput";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  // Filter only my posts
  const myPosts = posts.filter((post) => post.fullname === user?.fullname);

  return (
    // Home page-la irukkura adhe same symmetry (1/4 - 1/2 - 1/4)
    <div className="max-w-[1250px] mx-auto flex min-h-screen">
      
      {/* 1. Left Sidebar (w-1/4) */}
      <aside className="hidden md:block w-1/4 border-r sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </aside>

      {/* 2. My Profile Content (w-1/2) */}
      <main className="w-full md:w-1/2 border-r min-h-screen bg-white shadow-sm">
        <div className="p-4 border-b flex items-center gap-6 sticky top-0 bg-white/95 z-10 font-black">
           <button onClick={() => window.history.back()} className="hover:bg-gray-100 p-2 rounded-full transition-all text-xl">←</button>
           <h1 className="text-xl">My Profile</h1>
        </div>

        {/* Big User Header Section */}
        <div className="p-8 border-b bg-gray-50 flex flex-col items-center justify-center text-center">
           <div className="w-28 h-28 bg-blue-600 rounded-full flex items-center justify-center text-5xl text-white font-black shadow-xl ring-4 ring-white mb-4">
             {user?.fullname?.charAt(0).toUpperCase() || "U"}
           </div>
           <div>
              <h2 className="text-3xl font-black text-gray-900 leading-tight">{user?.fullname || "User Name"}</h2>
              <p className="text-gray-400 font-bold text-base">{user?.email || "user@email.com"}</p>
           </div>
           <div className="flex gap-8 mt-6">
              <div className="flex flex-col">
                 <span className="font-extrabold text-xl">48</span>
                 <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Followers</span>
              </div>
              <div className="flex flex-col">
                 <span className="font-extrabold text-xl">12</span>
                 <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Following</span>
              </div>
           </div>
        </div>

        {/* Upload Post within Profile */}
        <div className="border-b bg-white">
          <div className="px-4 pt-4 flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
             <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">New Tweet</span>
          </div>
          <PostInput />
        </div>

        {/* MY RECENT POSTS SECTION */}
        <div className="bg-white">
           <div className="p-4 border-b bg-gray-50/50">
              <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest tracking-tighter">Your Activity</h3>
           </div>
           
           {myPosts.length > 0 ? (
             myPosts.map((post) => (
               <PostCard key={post._id} post={post} />
             ))
           ) : (
             <div className="p-20 text-center text-gray-300 italic font-bold">
               Empty Nest... Start tweeting something!
             </div>
           )}
        </div>
      </main>

      {/* 3. Right Trending (Same w-1/4 as Left) */}
      <aside className="hidden lg:block w-1/4 p-4 sticky top-0 h-screen">
        <Trending />
      </aside>

    </div>
  );
};

export default Profile;
