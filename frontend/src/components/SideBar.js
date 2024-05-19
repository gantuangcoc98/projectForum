import "../App.css"
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo-transparent-cropped.png';
import { useState, useEffect, useRef } from 'react';
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io5";
import * as FaIcons from "react-icons/fa";
import profile from '../images/logo.png';

export default function SideBar({userData, postData}) {
    const [profileOptionsToggle, setProfileOptionsToggle] = useState(false);

    const loggedUser = userData;

    const postList = postData;

    const profileOptions = useRef(null);

    const navigate = useNavigate();

    const profileMenu = () => {
        setProfileOptionsToggle(!profileOptionsToggle);
    }

    const logout = () => {
        console.log('Logging out...');
        window.localStorage.setItem('LOGGED_USER', JSON.stringify(null));
        navigate("/login");
    }

    const viewProfile = () => {
        navigate(`/profile/${loggedUser.username}`);
    }

    const viewPost = (postId) => {
        console.log('Viewing post:', postId);
        navigate(`/post/${postId}`);
        window.location.reload();
    }

    const formatDate = (dateString) => {
        const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };

        const date = new Date(dateString);

        const formattedDate = date.toLocaleDateString('en-US', dateOptions);
        return `${formattedDate}`;
    }

    useEffect(
        () => {
            const handleOutsideClick = (event) => {
                if (profileOptions.current && !profileOptions.current.contains(event.target)) {
                    setProfileOptionsToggle(null);
                }
            }

            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            }
        }, []
    )

    return (
        <>
            <div className="flex flex-col items-center w-[25%] h-full bg-lighter-white fixed z-[1000]">
                <div className="w-full h-fit pt-4">
                    <img src={logo} alt="logo" className="h-[50px] w-auto ml-[40px] hover:cursor-pointer" 
                        onClick={() => {
                            navigate('/home');
                            window.location.reload();
                        }}/>
                </div>

                <div className="flex flex-col items-center h-full w-full p-[30px] gap-[10px]">
                    <div className='flex w-full h-fit justify-between text-[16px] items-end'>
                        <h3 className="font-semibold text-[18px]">Your Posts</h3>
                        <span className="flex items-center gap-[3px] p-[5px] text-[16px] font-semibold bg-light-gold rounded-[10px] hover:cursor-pointer hover:bg-dark-gold"
                            onClick={()=>navigate('/post/new')}>
                            <MdIcons.MdOutlineCreate />
                            New
                        </span>
                    </div>

                    <ul className='flex flex-col w-full h-full gap-[5px] mt-[5px] overflow-y-scroll'>
                        {postList.map(
                            (item, index) => {
                                return (
                                    <li key={index}>
                                        <div className="flex w-full h-fit relative">
                                            <span className="text-[16px] w-full hover:underline hover:cursor-pointer z-10"
                                                onClick={() => viewPost(item.postId)}>{item.title}</span>
                                            <span className="text-[14px] absolute right-0 z-0">{formatDate(item.date)}</span>
                                        </div>
                                    </li>
                                )
                            }
                        )}
                    </ul>

                    <div className="w-full h-fit relative z-10">
                        <div className="flex items-center gap-[10px] w-full h-fit p-[10px] rounded-[12px] hover:bg-light-white hover:cursor-pointer"
                            onClick={()=>profileMenu()}>
                            <img src={profile} alt="profile" width='50px' height='auto' className="rounded-[50%]"/>
                            <div className="flex flex-col">
                                <span className="font-semibold">{loggedUser.firstName} {loggedUser.lastName}</span>
                                <span className="font-light">@{loggedUser.username}</span>
                            </div>
                            <span className="w-fit h-fit text-[23px] absolute right-[10px]"><BsIcons.BsThreeDots/></span>
                        </div>

                        {profileOptionsToggle &&
                            <div ref={profileOptions} className="flex flex-col w-[90%] h-fit absolute top-[-150%] z-20">
                                <div className="flex flex-col  w-full h-full  py-[10px] bg-dark-gold rounded-[12px] relative">
                                    <div className="flex flex-col items-center z-20">
                                        <span className="flex items-center gap-[10px] px-[20px] w-full h-fit py-[10px] text-[16px] font-semibold hover:bg-light-gold hover:cursor-pointer"
                                            onClick={()=>viewProfile()}>
                                            <span className="text-[20px] font-semibold"><IoIcons.IoPersonOutline /></span>
                                            View Profile
                                        </span>
                                        <span className="flex items-center gap-[10px] w-full h-fit px-[20px] py-[10px] text-[16px] font-semibold hover:bg-light-gold hover:cursor-pointer"
                                            onClick={()=>logout()}>
                                            <span className="text-[20px] font-semibold"><FaIcons.FaDoorOpen /></span>
                                            {'Logout @' + loggedUser.username}
                                        </span>
                                    </div>
                                    <span className="flex justify-center w-full text-[50px] text-dark-gold absolute bottom-[-25%] z-10"><MdIcons.MdArrowDropDown/></span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
};