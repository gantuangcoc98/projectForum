import logo from "../images/logo-transparent-cropped.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // retrieve ang user gikan sa local storage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      // checking kung match ang data nga naas local storage
      if (
        username === storedUserData.username &&
        password === storedUserData.password
      ) {
        // If login successful, navigate to desired route
        navigate("/home");
      } else {
        // if invalid
        alert("Invalid username or password");
      }
    } else {
      // if walay data
      alert("User not found. Please register first.");
    }
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <div className="flex h-fit w-full">
      <div className="flex flex-col items-center gap-[50px] h-fit w-[50%]">
        <span className="flex w-full items-center h-fit pl-[73px] pt-[73px]">
          <img
            src={logo}
            alt="logo"
            className="h-[100px] w-auto hover:cursor-grab"
          />
        </span>

        <div className="flex flex-col w-[75%] h-fit">
          <span className="text-[35px] p-0 m-0  font-bold">UNLOCK</span>
          <span className="flex w-full justify-start pl-[80px] text-[50px] font-bold">
            YOUR
          </span>
          <span className="flex w-full justify-end text-[50px] font-bold pr-[100px]">
            WORLD
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] h-full w-[50%]">
        <h1 className="w-full h-fit text-[30px] mt-[73px] pl-[20px]">
          Login to your account.
        </h1>

        <div className="flex justify-center w-full h-fit pt-[30px] pb-[30px] rounded-tl-[12px] bg-lighter-white">
          <div className="flex flex-col gap-[10px] w-[80%] h-fit welcome_input">
            <label htmlFor="username">
              Username
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <span className="flex w-full h-fit justify-end">
              <button
                className="w-fit h-fit text-[16px] text-lighter-white font-bold pt-[10px] pb-[10px] pl-[30px] pr-[30px] bg-light-maroon hover:bg-main-maroon rounded-[12px]"
                onClick={handleLogin}
              >
                Login
              </button>
            </span>

            <div className="flex gap-[10px] w-full h-fit items-center justify-center">
              <div className="h-[5px] w-full bg-main-maroon rounded-[12px]" />
              <span className="text-[20px]">or</span>
              <div className="h-[5px] w-full bg-main-maroon rounded-[12px]" />
            </div>

            <div className="flex flex-col gap-[10px] h-fit w-full">
              <h3 className="text-[20px]">Don't have an account yet?</h3>
              <button
                className="bg-light-gold w-full h-fit text-[16px] rounded-[12px] p-[10px] font-bold hover:bg-dark-gold"
                onClick={register}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
