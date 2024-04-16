import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo-transparent-cropped.png";
import bgImage from "../images/bg.jpg";

export const Landingpage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="flex flex-col justify-between h-screen bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Header section */}
      <header className="bg-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <img src={logo} alt="logo" className="h-16 w-auto" />
          <div>
            <button
              className="px-4 py-2 bg-red-700 text-white font-semibold rounded-full mr-4 hover:bg-red-800"
              onClick={()=>handleLogin} // Navigate to login page
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-red                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             -700 text-white font-semibold rounded-full hover:bg-red-800"
              onClick={()=>handleRegister} // Navigate to register page
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-md">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold relative">TEKMUNITY</h2>
            <div className="border-b-2 border-black w-32 mt-2"></div>
            <p className="text-xl text-center">
              Where Pioneers Connect, Collaborate, and Create the Future
              Together
            </p>
          </div>
        </div>
      </div>

      {/* Footer section */}
      <footer className="bg-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-500">
            All rights Reserved Copyright © 2020 - 2024 TermsFeed®. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
