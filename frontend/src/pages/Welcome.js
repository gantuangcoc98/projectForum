import logo from "../images/logo-transparent-cropped.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export const Welcome = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const register = () => {
    //para mo store ang data sa local storage gar
    const userData = {
      username: username,
      password: password,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("Registration in process...");
    navigate("/register");
  };

  const login = () => {
    console.log("Logging in...");
    window.localStorage.setItem("LOGGED_USER", JSON.stringify(1));
    navigate("/home");

    window.location.reload();
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
          <span className="text-[25px] p-0 m-0">Where</span>
          <span className="flex w-full justify-start pl-[80px] text-[50px] font-bold">
            GREAT
          </span>
          <span className="flex w-full justify-end text-[50px] font-bold pr-[100px]">
            MINDS
          </span>
          <span className="flex w-full justify-end text-[25px]">meet.</span>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] h-full w-[50%]">
        <h1 className="w-full h-fit text-[30px] mt-[73px] pl-[20px]">
          Join now.
        </h1>

        <div className="flex justify-center w-full h-fit pt-[30px] pb-[30px] rounded-tl-[12px] bg-lighter-white">
          <div className="flex flex-col gap-[10px] w-[80%] h-fit welcome_input">
            <div className="flex w-full h-fit gap-[20px]">
              <label className="w-full" htmlFor="firstname">
                First Name
                <input
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="w-full" htmlFor="lastname">
                Last Name
                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
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
            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <span className="flex w-full h-fit justify-end">
              <button
                className="w-fit h-fit text-[16px] text-lighter-white font-bold pt-[10px] pb-[10px] pl-[30px] pr-[30px] bg-light-maroon hover:bg-main-maroon rounded-[12px]"
                onClick={() => register()}
              >
                Sign Up
              </button>
            </span>

            <div className="flex gap-[10px] w-full h-fit items-center justify-center">
              <div className="h-[5px] w-full bg-main-maroon rounded-[12px]" />
              <span className="text-[20px]">or</span>
              <div className="h-[5px] w-full bg-main-maroon rounded-[12px]" />
            </div>

            <div className="flex flex-col gap-[10px] h-fit w-full">
              <h3 className="text-[20px]">Already have an account?</h3>
              <button
                className="bg-light-gold w-full h-fit text-[16px] rounded-[12px] p-[10px] font-bold hover:bg-dark-gold"
                onClick={() => login()}
              >
                Sign-in instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
