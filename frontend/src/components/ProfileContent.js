import React from "react";
import avatar from "../images/logo.png";

const ProfileContent = () => {
  const username = "John Doe";
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="flex items-center space-x-4 -ml-50 w-full">
        {/* Adjusted margin */}
        <img
          className="h-24 w-24 rounded-full object-cover"
          src={avatar}
          alt={`${username}'s Avatar`}
        />
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-gray-800">u/{username}</h1>
          <button className="mt-4 bg-main-maroon text-white px-6 py-2 rounded-full focus:outline-none">
            Overview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
