import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/home", icon: "🏠" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  return (
    <div className="flex flex-col gap-2 p-4">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex gap-4 p-3 rounded-full text-lg font-bold ${
            location.pathname === item.path ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100"
          }`}
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
