import { React, useEffect } from "react";
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

  const clearData = () => {
    window.localStorage.clear();
  }

  useEffect(
    () => {
      // clearData(); //Uncomment this to clear application data
    }, []
  )

  return (
    <div
      className="flex flex-col justify-between h-screen bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Header section */}
      <header className="bg-lighter-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <img src={logo} alt="logo" className="h-12 w-auto hover:cursor-pointer" onClick={() => navigate("/")}/>
          <div className="flex items-center gap-[10px]">
            <button
              className="px-[18px] py-[5px] text-main-maroon font-semibold rounded-[12px] hover:text-white border border-main-maroon hover:bg-main-maroon"
              onClick={() => handleLogin()} // Navigate to login page
            >
              Login
            </button>
            <button
              className="px-[18px] py-[5px] bg-light-maroon text-white font-semibold rounded-[12px] hover:bg-main-maroon"
              onClick={() => handleRegister()} // Navigate to register page
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center">
        <div className="bg-lighter-white bg-opacity-80 p-8 rounded-md">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold relative">TekForum</h2>
            <div className="border-b-2 border-black w-32 mt-2"></div>
            <p className="text-xl text-center">
              Where Pioneers Connect, Collaborate, and Create the Future
              Together
            </p>
          </div>
        </div>
      </div>

      {/* Footer section */}
      <footer className="bg-lighter-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-main-maroon">
            All rights Reserved Copyright © 2024 LakiSaMilo. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
