import { React, useEffect } from "react";
import bgImage from "../images/bg.jpg";
import { Header } from "../components/Header";

export const Landingpage = () => {

  useEffect(
    () => {
      window.localStorage.setItem('LOGGED_USER', JSON.stringify(null));
    }, []
  )

  return (
    <div
      className="flex flex-col justify-between h-screen bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Header section */}
      <Header pageState={'landingPage'} />

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
