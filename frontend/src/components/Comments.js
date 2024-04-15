import { viewProfile } from "./Function"
import profile from '../images/logo.png';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { useEffect, useRef, useState } from "react";

export const Comments = ({data}) => {

    const commentOptionRef = useRef(null);
    const [selectedCommentItem, setSelectedCommentItem] = useState(null);

    const showCommentOption = (index) => {
        setSelectedCommentItem(index === selectedCommentItem ? null : index);
    }

    useEffect(
        () => {
            const handleOutsideClick = (event) => {
                if (commentOptionRef.current && !commentOptionRef.current.contains(event.target)) {
                    setSelectedCommentItem(null);
                }
            }

            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            }
        }, []
    )

    return (
        data.map(
            (item, index) => {
                return (
                    <li key={index} className="flex gap-[10px] p-[10px] border-t border-border-line hover:bg-dark-white">
                        <span className="w-[51px] h-[51px] hover:cursor-pointer hover:opacity-80"
                            onClick={()=>viewProfile(item.author)}><img src={profile} alt="profile" width='100%'/></span>
                        <div className="w-full h-fit flex flex-col text-[16px]">
                            <div className="flex items-center justify-between relative">
                                <div className="flex gap-[5px]">
                                    <span className="text-main-maroon font-semibold hover:underline hover:cursor-pointer"
                                        onClick={()=>viewProfile(item.author)}>{item.author}</span>
                                    <span className="text-dark-gold hover:cursor-pointer"
                                        onClick={()=>viewProfile(item.author)}>{'@' + item.author}</span>
                                </div>
                                <div className="flex w-fit h-fit absolute right-0">
                                    <span className="text-[20px] p-[5px] hover:bg-light-white rounded-[50%] hover:cursor-pointer z-0"
                                        onClick={()=>showCommentOption(index)}>
                                        <BiIcons.BiDotsHorizontalRounded/>
                                    </span>

                                    {selectedCommentItem === index &&
                                        <div key={index} ref={commentOptionRef} className="flex flex-col h-fit w-[160px] absolute top-0 left-0 rounded-[12px] border border-border-line bg-lighter-white z-10">
                                            <div className="flex items-center gap-[5px] p-[10px] rounded-[12px]  hover:cursor-pointer hover:bg-red-300">
                                                <span className="text-[20px]"><MdIcons.MdDeleteForever/></span>
                                                <span className="font-semibold">Delete answer</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="h-fit w-[95%] pb-[5px]">
                                    <span>{item.content}</span>
                            </div>
                            <div className="flex gap-[5px] items-center text-gray-500">
                                <span className="text-[8px]"><FaIcons.FaCircleNotch/></span>
                                <span className="text-[14px]">{item.date}</span>
                                <span className="text-[8px]"><FaIcons.FaCircleNotch/></span>
                            </div>
                        </div>
                    </li>
                )
            }
        )
    )
}