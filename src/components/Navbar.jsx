import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="border-b bg-white p-3 sticky top-0 z-50">
      <div className="max-w-[1250px] mx-auto flex justify-between">
        <Link to="/home" className="text-2xl font-bold text-blue-500">X Clone</Link>
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1.5 rounded-full font-bold text-sm">Logout</button>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold text-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
