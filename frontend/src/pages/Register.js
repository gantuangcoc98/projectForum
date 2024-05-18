import logo from "../images/logo-transparent-cropped.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { createUser, registerUser } from "../components/Function";

export const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [usernameExist, setUsernameExist] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordMismatch, setPasswordMistMatch] = useState(false);
  const [firstNameEmpty, setFirstNameEmpty] = useState(false);
  const [lastNameEmpty, setLastNameEmpty] = useState(false);

  const navigate = useNavigate();

  const register = async () => {
    if (firstname === "") {
      setFirstNameEmpty(true);
      console.log("First name empty!");
    } else if (lastname === "") {
      setLastNameEmpty(true);
      console.log("Last name empty!");
    }
    else if (password !== confirmPassword) {
      setPasswordMistMatch(true);
      console.log("Password did not match!");
    } else if (username === "") {
      setUsernameEmpty(true);
      console.log("Username is empty.");
    } else if (password === "") {
      setPasswordEmpty(true);
      console.log("Password is empty.");
    } else {
      const userData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        username: username,
        password: password,
      }

      const response = await registerUser(userData);

      switch (response) {
        case 0:
          setUsernameExist(true);
          console.log("Username already exist!");
          break;
        case 1:
          console.log("Successfully registered new user!");
          login();
          break;
        default:
          break;
      }
    }
  };

  const login = () => {
    console.log("Logging in...");
    navigate("/login");
  };

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
          <span className="text-[35px] p-0 m-0">Where</span>
          <span className="flex w-full justify-start pl-[80px] text-[50px] font-bold">
            GREAT
          </span>
          <span className="flex w-full justify-end text-[50px] font-bold pr-[100px]">
            MINDS
          </span>
          <span className="flex w-full justify-end text-[35px]">meet.</span>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] h-full w-[50%]">
        <h1 className="w-full h-fit text-[30px] mt-[73px] pl-[20px]">
          Join now.
        </h1>

        <div className="flex justify-center w-full h-fit pt-[30px] pb-[30px] rounded-tl-[12px] rounded-bl-[12px] bg-lighter-white">
          <div className="flex flex-col gap-[10px] w-[80%] h-fit welcome_input">
            <div className="flex w-full h-fit gap-[20px]">
              <label className="w-full" htmlFor="firstname">
                <div className="flex gap-[10px]">
                First Name
                {firstNameEmpty && <span className="text-[14px] text-red-500">Please input first name</span>}
                </div>
                <input
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    setFirstNameEmpty(false)}}
                />
              </label>
              <label className="w-full" htmlFor="lastname">
                <div className="flex gap-[10px]">
                Last Name
                {lastNameEmpty && <span className="text-[14px] text-red-500">Please input last name</span>}
                </div>
                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    setLastNameEmpty(false)}}
                />
              </label>
            </div>
            <label htmlFor="email">
              Email (Optional)
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="username">
              <div className="flex gap-[10px] items-center">
              Username 
              {usernameExist && <span className="text-[14px] text-red-500">Username already exist!</span>}
              {usernameEmpty && <span className="text-[14px] text-red-500">Please input username</span>}
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameExist(false);
                  setUsernameEmpty(false);
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
                  setPassword(e.target.value);
                  setPasswordEmpty(false);
                }}
              />
            </label>
            <label htmlFor="confirmPassword">
              <div className="flex gap-[10px]">
              Confirm Password
              {passwordMismatch && <span className="text-[14px] text-red-500">Password did not match</span>}
              </div>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordMistMatch(false);
                }}
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
