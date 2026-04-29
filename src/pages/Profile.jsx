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
    <div className="max-w-[1250px] mx-auto flex min-h-screen">
      {/* LEFT SIDEBAR */}
      <aside className="hidden md:block w-1/4 border-r">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="w-full md:w-1/2 border-r bg-white">

        <div className="flex items-center gap-4 p-4 border-b">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded hover:bg-gray-100"
          >
            ←
          </button>
          <h1 className="text-lg font-bold">My Profile</h1>
        </div>

        <div className="p-6 border-b bg-gray-100 text-center">
          {/* PROFILE IMAGE */}
          <div className="w-24 h-24 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-3">
            {user?.fullname?.charAt(0).toUpperCase() || "U"}
          </div>

          <h2 className="text-xl font-bold">{user?.fullname || "User Name"}</h2>

          <p className="text-gray-500 text-sm">
            {user?.email || "user@email.com"}
          </p>

          <div className="flex justify-center gap-6 mt-4">
            <div>
              <p className="font-bold">48</p>
              <p className="text-xs text-gray-500">Followers</p>
            </div>
            <div>
              <p className="font-bold">12</p>
              <p className="text-xs text-gray-500">Following</p>
            </div>
          </div>
        </div>

        {/* POST INPUT */}
        <div className="p-4 border-b">
          <p className="text-sm text-blue-500 mb-2">New Tweet</p>
          <PostInput />
        </div>

        {/* POSTS SECTION */}
        <div>
          <h3 className="p-4 border-b text-gray-500 font-bold">
            Your Activity
          </h3>

          {myPosts.length > 0 ? (
            myPosts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="p-8 text-center text-gray-400">
              Empty... Start posting!
            </div>
          )}
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="hidden lg:block w-1/4 p-4">
        <Trending />
      </aside>
    </div>
  );
};

export default Profile;
