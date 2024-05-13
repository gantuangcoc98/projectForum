import "../App.css"
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo-transparent-cropped.png';
import { useState, useEffect, useRef } from 'react';
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import profile from '../images/logo.png';
import { data } from '../sample-data/postdata';
import axios from 'axios';

export default function SideBar() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [profileOptionsToggle, setProfileOptionsToggle] = useState(false);
    const [username, setUsername] = useState('username');

    const [loggedUser, setLoggedUser] = useState({});
    
    const profileOptions = useRef(null);

    const navigate = useNavigate();

    const createPost = () => {
        console.log('Creating post...');
    }

    const profileMenu = () => {
        setProfileOptionsToggle(!profileOptionsToggle);
    }

    const logout = () => {
        console.log('Logging out...');
        window.localStorage.setItem('LOGGED_USER', JSON.stringify(null));
        navigate("/login");
    }

    const viewProfile = () => {
        console.log('Viewing profile...');
    }

    const fetchUser = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8080/getUser?username=${username}`);

            if (response.data != null) {
                setLoggedUser(response.data);
                setLoginStatus(true);
            } else {
                console.log("Failed to fetch get request getUser?username");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const viewPost = (postId) => {
        console.log('Viewing post:', postId);
        navigate(`/post/${postId}`);
    }

    useEffect(
        () => {
            if (!loginStatus) {
                const username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));
    
                if (username != null) {
                    fetchUser(username);
                } else {
                    navigate("/");
                }
            }
        }, [loginStatus]
    )

    return (
        <>
            {loginStatus && 
                <div className="flex flex-col items-center w-[25%] h-full bg-lighter-white fixed z-[1000]">
                    <div className="w-full h-fit pt-[5px] pb-[5px]">
                        <img src={logo} alt="logo" className="h-[50px] w-auto ml-[40px] hover:cursor-pointer" />
                    </div>

                    <div className="flex flex-col items-center h-full w-full p-[30px] gap-[10px]">
                        <div className='flex w-full h-fit justify-between text-[16px] items-end'>
                            <h3 className="font-semibold">Your Posts</h3>
                            <span className="flex items-center gap-[3px] p-[5px] text-[14px] font-semibold bg-light-gold rounded-[10px] hover:cursor-pointer hover:bg-dark-gold"
                                onClick={()=>createPost()}>
                                <MdIcons.MdOutlineCreate />
                                New
                            </span>
                        </div>

                        <ul className='flex flex-col w-full h-full gap-[5px] mt-[5px] overflow-y-scroll'>
                            {data.map(
                                (item, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="flex w-full h-fit relative">
                                                <span className="text-[14px] w-full hover:underline hover:cursor-pointer z-10"
                                                    onClick={() => viewPost(item.postId)}>{item.title}</span>
                                                <span className="text-[12px] absolute right-0 z-0">{item.date}</span>
                                            </div>
                                        </li>
                                    )
                                }
                            )}
                        </ul>

                        <div className="w-full h-fit relative z-10">
                            <div className="flex items-center gap-[10px] w-full h-fit p-[10px] rounded-[12px] hover:bg-light-white hover:cursor-pointer"
                                onClick={()=>profileMenu()}>
                                <img src={profile} alt="profile" width='50px' height='auto'/>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{loggedUser.firstName} {loggedUser.lastName}</span>
                                    <span className="font-light">@{loggedUser.username}</span>
                                </div>
                                <span className="w-fit h-fit text-[23px] absolute right-[10px]"><BsIcons.BsThreeDots/></span>
                            </div>

                            {profileOptionsToggle &&
                                <div ref={profileOptions} className="flex flex-col w-[90%] h-fit absolute top-[-150%] z-20">
                                    <div className="flex flex-col  w-full h-full  pt-[10px] pb-[10px] bg-dark-gold rounded-[12px] relative">
                                        <div className="flex flex-col items-center z-20">
                                            <span className="w-full h-fit p-[10px] text-[16px] font-semibold hover:bg-light-gold hover:cursor-pointer"
                                                onClick={()=>viewProfile()}>
                                                View Profile
                                            </span>
                                            <span className="w-full h-fit p-[10px] text-[16px] font-semibold hover:bg-light-gold hover:cursor-pointer"
                                                onClick={()=>logout()}>
                                                {'Logout @' + username}
                                            </span>
                                        </div>
                                        <span className="flex justify-center w-full text-[50px] text-dark-gold absolute bottom-[-25%] z-10"><MdIcons.MdArrowDropDown/></span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            
        </>
    )
};