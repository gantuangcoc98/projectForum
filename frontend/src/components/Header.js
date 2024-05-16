import { useNavigate } from "react-router-dom";
import logo from "../images/logo-transparent-cropped.png";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

export const Header = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogin = () => {
      navigate("/login");
  };

  const handleRegister = () => {
  navigate("/register");
  };

  useEffect(
    () => {
      const username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));

      if (username !== null) {
        setUsername(username);
        setLoginStatus(true);
      } else {
        window.localStorage.setItem("LOGGED_USER", JSON.stringify(null));
        setLoginStatus(false);
      }
    }, []
  )

  return (
    <header className="flex bg-lighter-white py-4 justify-center w-full">
      <div className="container flex justify-between items-center w-full">
        <div className="flex gap-[20px] w-fit h-full items-center">
          {loginStatus &&
            <span className="flex items-center text-[20px] p-[10px] rounded-[50%] hover:bg-light-white hover:cursor-pointer h-fit w-fit"
              onClick={()=>navigate(-1)}>
              <FaIcons.FaArrowLeft />
            </span>
          }

          <img src={logo} alt="logo" className="h-12 w-auto hover:cursor-pointer" onClick={() => (loginStatus) ? navigate('/home') : navigate('/')}/>
        </div>
        {!loginStatus && 
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
        }
      </div>
    </header>
  )
}