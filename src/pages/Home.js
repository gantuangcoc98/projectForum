import * as Io5Icons from "react-icons/io5";
import '../App.css';
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import profile from '../images/logo.png';
import { data } from '../sample-data/postdata';
import { useState } from "react";

export const Home = () => {

    const display = (state) => {
        switch (state) {
            case 'fyp':
                console.log('Displaying for you page...')
                break;
            case 'following':
                console.log('Displaying following page...');
                break;
            default:
                break;
        }
    }

    const viewPost = (postId) => {
        console.log('Viewing post:', postId);
    }

    const viewUser = (username) => {
        console.log('Viewing', username + ' profile...');
    }

    return (
        <>
            <SideBar />
            
            <div className="flex w-full h-full pl-[25%]">
                <div className="w-[70%] h-full relative">
                    <div className="flex w-full h-[61px] items-center justify-center border border-border-line sticky bg-light-white top-0">
                        <div className="flex justify-center items-center w-[50%] h-full hover:bg-dark-white hover:cursor-pointer"
                            onClick={()=>display('fyp')}>
                            <div className="flex flex-col w-fit h-full justify-center items-center relative">
                                <span className="font-semibold">For You</span>
                                <div className="h-[5px] w-full bg-main-maroon rounded-[12px] absolute bottom-0"/>
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-[50%] h-full hover:bg-dark-white hover:cursor-pointer"
                            onClick={()=>display('following')}>
                            <div className="flex flex-col w-fit h-full justify-center items-center relative">
                                <span className="font-semibold">Following</span>
                                <div className="h-[5px] w-full bg-main-maroon rounded-[12px] absolute bottom-0"/>
                            </div>
                        </div>
                        <span className="text-[20px] w-fit h-auto p-[10px] ml-[10px] mr-[10px] rounded-[12px] hover:cursor-pointer hover:bg-dark-white"><Io5Icons.IoFilterSharp/></span>
                    </div>

                    <ul className="w-full h-fit border-r-[1px] border-l-[1px] border-border-line">
                        {data.map(
                            (item, index) => {
                                return (
                                    <li key={index} className="flex gap-[10px] w-full pl-[20px] pr-[20px] pt-[10px] pb-[10px] border-b border-border-line hover:bg-dark-white hover:cursor-pointer"
                                        onClick={()=>viewPost()}>
                                        <img src={profile} alt="profile" width="50px" height="auto" />
                                        <div className="flex flex-col">
                                            <div className="flex gap-[5px]">
                                                <span className="text-main-maroon font-semibold">{item.nickname}</span>
                                                <span className="text-dark-gold font-light">{'@' + item.username}</span>
                                            </div>
                                            <p>{item.post}</p>
                                        </div>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </div>

                <div className="flex flex-col gap-[20px] items-center w-[30%] h-full">
                    <div className="flex flex-col w-[80%] h-fit gap-[10px] rounded-[12px] p-[10px] mt-[61px] bg-lighter-white">
                        <span>Latest Updates</span>
                        <ul>
                            {data.map(
                                (item, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="flex justify-between w-full h-fit">
                                                <span className="text-[16px] w-full hover:underline hover:cursor-pointer"
                                                    onClick={()=>viewPost(item.postId)}>
                                                    {item.post}
                                                </span>
                                                <span className="text[14px] hover:cursor-pointer"
                                                    onClick={()=>viewUser(item.username)}>
                                                    {'@' + item.username}
                                                </span>
                                            </div>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-col w-[80%] h-fit gap-[10px] rounded-[12px] p-[10px]">
                        <span className="text-[20px] font-semibold">Trending</span>
                    </div>
                </div>
            </div>
        </>
    )
}