import React, { useState } from "react";
import { FaBell, FaEdit, FaComments } from "react-icons/fa";
import logo from "../images/logo-transparent-cropped.png";
import avatar from "../images/logo.png";
import SideBar from "../components/Profilesidebar";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({ username }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto py-2 flex items-center justify-between">
        <div>
          <img
            src={logo}
            alt="logo"
            className="h-12 w-auto hover:cursor-pointer"
            onClick={
              () => {navigate('/home')}
            }
          />
        </div>
        <div className="flex items-center w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full  py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main-maroon"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="focus:outline-none">
            <FaBell className="h-6 w-6 text-gray-800" />
          </button>
          <button className="bg-main-maroon text-white px-4 py-2 rounded-lg focus:outline-none">
            Create Post
          </button>
          <button className="focus:outline-none">
            <FaComments className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={toggleSidebar}
            className="flex items-center focus:outline-none"
          >
            <img
              className="h-12 w-12 px-0 rounded-full object-cover mr-2"
              src={avatar}
              alt={`${username}'s Avatar`}
            />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{username}</h1>
        </div>
      </div>
      {sidebarOpen && <SideBar toggleSidebar={toggleSidebar} />}
    </header>
  );
};

export default ProfileHeader;
