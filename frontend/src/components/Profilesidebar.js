import React from "react";
import { useNavigate } from "react-router-dom";

const Profilesidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    toggleSidebar();
    navigate("/profile");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-64 h-full shadow-lg">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <button
            onClick={handleViewProfile}
            className="w-full bg-main-maroon text-white py-2 rounded-lg mb-4"
          >
            View Profile
          </button>
          {/* Add more buttons or links here as needed */}
        </div>
      </div>
    </div>
  );
};

export default Profilesidebar;
