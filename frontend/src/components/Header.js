import { useNavigate } from "react-router-dom";
import logo from "../images/logo-transparent-cropped.png";
import avatar from "../images/logo.png";
import { useEffect, useRef, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi2";

export const Header = ({pageState}) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  const [state, setState] = useState(pageState);

  const [profileOptionsToggle, setProfileOptionsToggle] = useState(false);

  const profileOptionsRef = useRef(null);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleBackButton = () => {
    switch (state) {
      case 'profile':
        navigate(-1);
        break;
      default:
        navigate(-1);
        break;
    }
  }

  const logout = () => {
    console.log('Logging out...');
    window.localStorage.setItem('LOGGED_USER', JSON.stringify(null));
    navigate("/login");
  }

  useEffect(
    () => {
      const username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));

      if (username !== null) {
        setUsername(username);
        setLoginStatus(true);

        const handleOutsideClick = (event) => {
          if (profileOptionsRef.current && !profileOptionsRef.current.contains(event.target)) {
            setProfileOptionsToggle(false);
          }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        }
      } else {
        window.localStorage.setItem("LOGGED_USER", JSON.stringify(null));
        setLoginStatus(false);
      }
    }, []
  )

  return (
    <header className="flex bg-lighter-white py-4 justify-center w-full border border-b-border-line">
      <div className="container flex justify-between items-center w-[70%] relative">
        <div className="flex gap-[20px] w-fit h-full items-center">
          {loginStatus &&
            <span className="flex items-center text-[20px] p-[10px] rounded-[50%] hover:bg-light-white hover:cursor-pointer h-fit w-fit"
              onClick={()=>handleBackButton()}>
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

        {pageState === 'profile' &&
          <>
            <div className="flex w-fit h-fit">
              <span className="flex w-fit h-fit hover:opacity-60 hover:cursor-pointer"
                onClick={ () => {setProfileOptionsToggle(!profileOptionsToggle)}}>
                <img src={avatar} alt={username + 's avatar'} width="50px" height="auto" className="rounded-full" />
              </span>

              {profileOptionsToggle &&
                <div className="flex flex-col w-fit h-fit absolute top-full right-0 rounded-[12px] bg-lighter-white border border-border-line" ref={profileOptionsRef}>
                  <span className="flex items-center gap-[10px] text-[16px] font-semibold hover:cursor-pointer rounded-[12px] hover:bg-light-white py-[10px] px-[15px]"
                    onClick={() => {
                      navigate('/home');
                      window.location.reload();
                    }}>
                    <span><HiIcons.HiHome /></span>
                    Home
                  </span>
                  <span className="flex items-center gap-[10px] text-[16px] font-semibold hover:cursor-pointer rounded-[12px] hover:bg-light-white py-[10px] px-[15px]"
                    onClick={() => {logout()}}>
                    <span><FaIcons.FaDoorOpen /></span>
                    Logout
                  </span>
                </div>
              }
            </div>
          </>
        }

      </div>
    </header>
  );
};
