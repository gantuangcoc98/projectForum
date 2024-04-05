import { viewProfile } from "./Function"
import profile from '../images/logo.png';
import { useEffect, useState, useRef } from "react";
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export const Answers = ({data}) => {
    const answerOptionRef = useRef(null);
    const [selectedAnswerItem, setSelectedAnswerItem] = useState(null);

    const showAnswerOptions = (index) => {
        setSelectedAnswerItem(index === selectedAnswerItem ? null : index);
    }

    useEffect(
        () => {
            const handleOutsideClick = (event) => {
                if (answerOptionRef.current && !answerOptionRef.current.contains(event.target)) {
                    setSelectedAnswerItem(null);
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
                            onClick={()=>viewProfile(item.author)}><img src={profile} alt="profile" width="100%"/></span>
                        
                        <div className="flex flex-col h-fit w-full text-[16px]">
                            <div className="flex w-full h-fit items-center justify-between relative">
                                <div className="flex gap-[5px]">
                                    <span className="text-main-maroon font-semibold hover:cursor-pointer hover:underline"
                                        onClick={()=>viewProfile(item.author)}>{item.author}</span>
                                    <span className="text-dark-gold hover:cursor-pointer"
                                        onClick={()=>viewProfile(item.author)}>{'@' + item.author}</span>
                                </div>

                                <div className="flex justify-center w-fit h-fit absolute right-0">
                                    <span className="text-[20px] w-fit h-fit p-[5px] rounded-[50%] hover:bg-light-white hover:cursor-pointer z-0"
                                        onClick={()=>showAnswerOptions(index)}><BiIcons.BiDotsHorizontalRounded/></span>
                                    
                                    {selectedAnswerItem === index &&
                                        <div key={index} ref={answerOptionRef} className="flex flex-col h-fit w-[160px] absolute top-0 left-0 rounded-[12px] border border-border-line bg-lighter-white z-10">
                                            <div className="flex gap-[5px] items-center p-[10px] rounded-t-[12px] text-[16px] hover:cursor-pointer hover:bg-green-300">
                                                <span className="pl-[3px]"><FaIcons.FaCheck/></span>
                                                <span className="font-semibold">Mark as answer</span>
                                            </div>
                                            <div className="flex items-center gap-[5px] p-[10px] rounded-b-[12px]  hover:cursor-pointer hover:bg-red-300">
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