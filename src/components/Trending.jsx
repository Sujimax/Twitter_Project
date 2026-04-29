import React from "react";

const Trending = () => {
  const trends = [
    { title: "#ReactJS", posts: "124K posts" },
    { title: "#TailwindCSS", posts: "85K posts" },
    { title: "#WebDev", posts: "62K posts" },
    { title: "#ReduxToolKit", posts: "41K posts" },
  ];

  return (
    <div className="p-4 flex flex-col gap-4">

      {/* OLD STYLE SEARCH BAR (ONLY UI) */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search Twitter"
          className="w-full bg-gray-100 border-none rounded-full py-2.5 p-10  shadow-sm"
        />
      </div>

      {/* Trending Box */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-3">What's happening</h2>

        {trends.map((trend) => (
          <div key={trend.title} className="py-2">
            <p className="text-xs text-gray-500">Trending in India</p>
            <p className="font-bold text-sm">{trend.title}</p>
            <p className="text-xs text-gray-500">{trend.posts}</p>
          </div>
        ))}

        <button className="text-blue-500 text-sm mt-3">
          Show more
        </button>
      </div>

      {/* Who to follow */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-3">Who to follow</h2>

        <div className="flex justify-between items-center py-2">
          <div>
            <p className="font-semibold">Elon Musk</p>
            <p className="text-xs text-gray-500">@elonmusk</p>
          </div>
          <button className="bg-black text-white text-xs px-3 py-1 rounded-full">
            Follow
          </button>
        </div>

        <div className="flex justify-between items-center py-2">
          <div>
            <p className="font-semibold">Bill Gates</p>
            <p className="text-xs text-gray-500">@billgates</p>
          </div>
          <button className="bg-black text-white text-xs px-3 py-1 rounded-full">
            Follow
          </button>
        </div>

        <button className="text-blue-500 text-sm mt-3">
          Show more
        </button>
      </div>

    </div>
  );
};

export default Trending;