import React from "react";
import SideBar from "../components/SideBar";
import { Navigate } from "react-router-dom";
import logo from "../images/logo-transparent-cropped.png";
import avatar from "../images/logo.png";

const ProfileHeader = ({ username, avatarUrl }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0 py-2 flex items-center justify-between">
        <div>
          <img className="h-15 w-20 object-contain" src={logo} alt="Logo" />
        </div>
        <div className="flex items-center">
          <div>
            <img
              className="h-12 w-12 rounded-full object-cover mr-4"
              src={avatar}
              alt={`${username}'s Avatar`}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{username}</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Profile = () => {
  return (
    <>
      <ProfileHeader />
    </>
  );
};
