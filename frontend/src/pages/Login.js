import logo from "../images/logo-transparent-cropped.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { loginUser } from "../components/Function";

export const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userNotFound, setUserNotFound] = useState(false);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const handleLogin = async () => {
    if (username === "") {
      setUsernameEmpty(true);
    } else if (password === "") {
      setPasswordEmpty(true);
    } else {
      const userCredentials = {
        username: username,
        password: password
      }

      const response = await loginUser(userCredentials);

      switch (response) {
        case 0:
          setUserNotFound(true);
          break;
        case 1:
          console.log("Successfully login!");
          window.localStorage.setItem("LOGGED_USER", JSON.stringify(username));
          navigate('/home');
          break;
        case -1:
          setIncorrectCredentials(true);
          break;
        default:
          break;
      }
    }
  };

  const register = () => {
    navigate("/register");
  };

  useEffect(
    () => {
      window.localStorage.setItem("LOGGED_USER", JSON.stringify(null));
    }, []
  )

  return (
    <div className="flex h-fit w-full">
      <div className="flex flex-col items-center gap-[50px] h-fit w-[50%]">
        <span className="flex w-full items-center h-fit pl-[73px] pt-[73px]">
          <img
            src={logo}
            alt="logo"
            className="h-[100px] w-auto hover:cursor-pointer"
            onClick={() => navigate("/")}
          />
        </span>

        <div className="flex flex-col w-[75%] h-fit">
          <span className="text-[35px] p-0 m-0">Unlock</span>
          <span className="flex w-full justify-start pl-[110px] text-[50px] font-bold">
            YOUR
          </span>
          <span className="flex w-full justify-end text-[35px] pr-[100px]">
            World
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] h-full w-[50%]">
        <h1 className="w-full h-fit text-[30px] mt-[73px] pl-[20px]">
          Login to your account.
        </h1>

        <div className="flex justify-center w-full h-fit pt-[30px] pb-[30px] rounded-tl-[12px] rounded-bl-[12px] bg-lighter-white">
          <div className="flex flex-col gap-[10px] w-[80%] h-fit welcome_input">
            <label htmlFor="username">
              <div className="flex gap-[10px]">
                Username
                {usernameEmpty && <span className="text-[14px] text-red-500">Please input username</span>}
                {userNotFound && <span className="text-[14px] text-red-500">User not found</span>}
                {incorrectCredentials && <span className="text-[14px] text-red-500">Incorrect username or password</span>}
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setUsernameEmpty(false);
                  setUserNotFound(false);
                  setIncorrectCredentials(false);
                }}
              />
            </label>
            <label htmlFor="password">
              <div className="flex gap-[10px]">
                Password
                {passwordEmpty && <span className="text-[14px] text-red-500">Please input password</span>}
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordEmpty(false);
                }}
              />
            </label>
            <span className="flex w-full h-fit justify-end">
              <button
                className="w-fit h-fit text-[16px] text-lighter-white font-bold pt-[10px] pb-[10px] pl-[30px] pr-[30px] bg-light-maroon hover:bg-main-maroon rounded-[12px]"
                onClick={() => handleLogin()}
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
                onClick={() => register()}
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
