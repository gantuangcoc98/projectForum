import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaQuestionCircle } from "react-icons/fa"; // Importing icons from react-icons

const SideNavbar = () => {
  return (
    <div className="fixed top-0 w-64 h-full bg-main-maroon text-white flex flex-col items-center py-4">
      <Link
        to="/post"
        className="py-2 px-4 flex items-center w-full hover:bg-light-gold"
      >
        <FaHome className="mr-2" /> Home
      </Link>
      <Link
        to="/about"
        className="py-2 px-4 flex items-center w-full hover:bg-light-gold"
      >
        <FaInfoCircle className="mr-2" /> About Us
      </Link>
      <Link
        to="/support"
        className="py-2 px-4 flex items-center w-full hover:bg-light-gold"
      >
        <FaQuestionCircle className="mr-2" /> Support
      </Link>
    </div>
  );
};

export default SideNavbar;
