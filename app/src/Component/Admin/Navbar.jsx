import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useAppStore } from "../../store";

const AdminNavbar = () => {
  const { userInfo } = useAppStore();
  return (
    <div className="backdrop-blur-lg border-b border-gray-200 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center mx-auto w-[90vw]">
        {/* Logo */}
        <Link to="/admin">
          <h2 className="text-2xl font-bold text-white">Rathod</h2>
        </Link>

        {/* User Section */}
        <div className="relative flex gap-2 items-center">
          <p className="rounded-full text-white px-4 py-2 hidden md:block">
            Welcome, <span className="text-blue-500">{userInfo?.FirstName} {userInfo?.LastName}</span> 
          </p>
          <Link
            to="/"
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition"
          >
            <FaHome className="text-white text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
