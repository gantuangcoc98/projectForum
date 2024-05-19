import { useNavigate } from "react-router-dom";
import logo from "../images/logo-transparent-cropped.png";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { FaBell, FaEdit, FaComments } from "react-icons/fa";
import avatar from "../images/logo.png";
import SideBar from "../components/Profilesidebar";

export const Header = ({ inProfile, inSettings }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  const [iAmInProfile, setIAmInProfile] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    const username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));

    if (username !== null) {
      setUsername(username);
      setLoginStatus(true);
    } else {
      window.localStorage.setItem("LOGGED_USER", JSON.stringify(null));
      setLoginStatus(false);
    }
  }, []);

  return (
    <header className="flex bg-lighter-white py-4 justify-center w-full">
      <div className="container flex justify-between items-center w-full">
        <div className="flex gap-[20px] w-fit h-full items-center">
          {loginStatus && (
            <span
              className="flex items-center text-[20px] p-[10px] rounded-[50%] hover:bg-light-white hover:cursor-pointer h-fit w-fit"
              onClick={() => navigate(-1)}
            >
              <FaIcons.FaArrowLeft />
            </span>
          )}

          <img
            src={logo}
            alt="logo"
            className="h-12 w-auto hover:cursor-pointer"
            onClick={() => (loginStatus ? navigate("/home") : navigate("/"))}
          />
        </div>
        {!loginStatus && (
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
        )}

        {inProfile && (
          <>
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
            {sidebarOpen && <SideBar toggleSidebar={toggleSidebar} />}
          </>
        )}
        {inSettings && (
          <>
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
            {sidebarOpen && <SideBar toggleSidebar={toggleSidebar} />}
          </>
        )}
      </div>
    </header>
  );
};
