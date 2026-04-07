import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPosts } from "../store/slices/postSlice";

const Trending = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    dispatch(searchPosts(query));
  };

  const trends = [
    { title: "#ReactJS", posts: "124K posts" },
    { title: "#TailwindCSS", posts: "85K posts" },
    { title: "#WebDev", posts: "62K posts" },
    { title: "#ReduxToolKit", posts: "41K posts" },
  ];

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Search Bar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">🔍</span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Twitter"
          className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 focus:bg-white focus:ring-1 focus:ring-blue-400 outline-none shadow-sm"
        />
      </div>

      {/* Trending Box */}
      <div className="bg-gray-50 rounded-2xl p-4 overflow-hidden shadow-sm">
        <h2 className="text-xl font-extrabold text-gray-900 mb-4">What's happening</h2>
        <div className="space-y-5">
          {trends.map((trend) => (
            <div key={trend.title} className="hover:bg-gray-100 -mx-4 px-4 py-1.5 cursor-pointer transition-colors duration-150">
              <p className="text-xs text-gray-500">Trending in India</p>
              <p className="text-[15px] font-bold text-gray-900">{trend.title}</p>
              <p className="text-xs text-gray-500">{trend.posts}</p>
            </div>
          ))}
        </div>
        <button className="text-blue-500 text-sm font-medium mt-4 hover:underline">Show more</button>
      </div>

      {/* Who to follow box */}
      <div className="bg-gray-50 rounded-2xl p-4 overflow-hidden shadow-sm">
        <h2 className="text-xl font-extrabold text-gray-900 mb-4">Who to follow</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="text-sm font-bold">Elon Musk</p>
                <p className="text-xs text-gray-500">@elonmusk</p>
              </div>
            </div>
            <button className="bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-gray-800">Follow</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="text-sm font-bold">Bill Gates</p>
                <p className="text-xs text-gray-500">@billgates</p>
              </div>
            </div>
            <button className="bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-gray-800">Follow</button>
          </div>
        </div>
        <button className="text-blue-500 text-sm font-medium mt-4 hover:underline">Show more</button>
      </div>
    </div>
  );
};

export default Trending;