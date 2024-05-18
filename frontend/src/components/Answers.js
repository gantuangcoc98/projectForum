import profile from '../images/logo.png';
import { useEffect, useState, useRef } from "react";
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { deleteAnswer, updateAnswer } from './Function';

export const Answers = ({data, postOwner, loggedUser}) => {
    const answerOptionRef = useRef(null);

    const answerList = data;

    const [selectedAnswerItem, setSelectedAnswerItem] = useState(null);
    const [editingAnswerIndex, setEditingAnswerIndex] = useState(null);

    const textareaRef = useRef(null);

    const [answer, setAnswer] = useState('');

    const showAnswerOptions = (index) => {
        setSelectedAnswerItem(index === selectedAnswerItem ? null : index);
    }

    const _deleteAnswer = async (answerId) => {
        const response = await deleteAnswer(answerId);

        switch (response) {
            case 0:
                console.log('Answer not found.');
                window.location.reload();
                break;
            case 1:
                console.log("Successfully deleted answer.");
                window.location.reload();
                break;
            case -1:
                console.log("Answer already deleted.");
                window.location.reload();
                break;
            default:
                break;
        }
    }

    const _editAnswer = (index, content) => {
        setEditingAnswerIndex(index);

        setSelectedAnswerItem(null);

        setAnswer(content);

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.addEventListener('input', autoResize, false);

                function autoResize() {
                    this.style.height = 'auto';
                    this.style.height = this.scrollHeight + 'px';
                }

                return () => {
                    textareaRef.current.removeEventListener('input', autoResize, false);
                };
            }
        }, 0);
    }

    const handleSaveAnswer = async (answerId) => {
        const answerData = {
            "content": answer,
            "answerId": answerId
        }

        const response = await updateAnswer(answerData);

        switch (response) {
            case 0:
                console.log("Answer not found.");
                window.location.reload();
                break;
            case 1:
                console.log("Successfully updated the answer.");
                window.location.reload();
                break;
            case -1:
                console.log("Answer is already deleted.");
                window.location.reload();
                break;
            default:
                break;
        }
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
        answerList.map(
            (item, index) => {
                return (
                    <li key={index} className="flex gap-[10px] p-[10px] border-t border-border-line hover:bg-dark-white">
                        <span className="w-[51px] h-[51px] hover:cursor-pointer hover:opacity-60">
                                <img src={profile} alt="profile" width="100%" className='rounded-[50%]'/>
                        </span>
                        
                        <div className="flex flex-col h-fit w-full text-[16px]">
                            <div className="flex w-full h-fit items-center justify-between relative">
                                <div className="flex gap-[5px]">
                                    <span className="text-main-maroon font-semibold hover:cursor-pointer hover:underline">
                                        {item.author}
                                    </span>
                                    <span className="text-dark-gold hover:cursor-pointer">
                                        {'@' + item.username}
                                    </span>
                                </div>

                                {((postOwner || loggedUser.username === item.username) && (editingAnswerIndex !== index)) &&
                                    <div className="flex justify-center w-fit h-fit absolute right-0">
                                        <span className="text-[20px] w-fit h-fit p-[5px] rounded-[50%] hover:bg-light-white hover:cursor-pointer z-0"
                                            onClick={()=>showAnswerOptions(index)}><BiIcons.BiDotsHorizontalRounded/></span>
                                        
                                        {selectedAnswerItem === index &&
                                            <div key={index} ref={answerOptionRef} className="flex flex-col h-fit w-[160px] absolute top-0 left-0 rounded-[12px] border border-border-line bg-lighter-white z-10">
                                                
                                                {postOwner &&
                                                    <div className="flex gap-[5px] items-center p-[10px] rounded-[12px] text-[16px] hover:cursor-pointer hover:bg-light-white">
                                                        <span className="pl-[3px]"><FaIcons.FaCheck/></span>
                                                        <span className="font-semibold">Mark as answer</span>
                                                    </div>
                                                }

                                                {loggedUser.username === item.username && 
                                                    <div className="flex gap-[5px] items-center p-[10px] rounded-[12px] text-[16px] hover:cursor-pointer hover:bg-light-white"
                                                        onClick={() => _editAnswer(index, item.content)}>
                                                        <span className="pl-[3px]"><FaIcons.FaCheck/></span>
                                                        <span className="font-semibold">Edit Answer</span>
                                                    </div>
                                                }

                                                {(postOwner || loggedUser.username === item.username) &&
                                                    <div className="flex items-center gap-[5px] p-[10px] rounded-[12px]  hover:cursor-pointer hover:bg-light-white"
                                                        onClick={() => _deleteAnswer(item.answerId)}>
                                                        <span className="text-[20px]"><MdIcons.MdDeleteForever/></span>
                                                        <span className="font-semibold">Delete answer</span>
                                                    </div>
                                                }

                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                            <div className="h-fit w-[95%] pb-[5px]">
                                {editingAnswerIndex === index ?
                                    <div className='flex flex-col gap-[10px]' key={index}>
                                        <textarea ref={textareaRef}
                                            className="text-[16px] bg-dark-white w-full h-auto p-[10px] border border-transparent focus:outline-none focus:border-main-maroon overflow-hidden resize-none"
                                            typeof="text"
                                            placeholder="Edit your answer here."
                                            value={answer}
                                            onChange={(e)=>setAnswer(e.target.value)}/>
                                    </div>
                                :
                                    <span>{item.content}</span>
                                }
                            </div>
                            
                            <div className='flex justify-between h-fit w-[95%]'>
                                <div className="flex gap-[5px] items-center text-gray-500">
                                    <span className="text-[8px]"><FaIcons.FaCircleNotch/></span>
                                    <span className="text-[14px]">{item.date}</span>
                                    <span className="text-[8px]"><FaIcons.FaCircleNotch/></span>
                                </div>
                        
                                {editingAnswerIndex === index &&
                                    <div className='flex justify-end items-center gap-[20px] pt-[10px]'>
                                        <span className='text-[14px] font-semibold text-main-maroon hover:cursor-pointer hover:text-lighter-maroon'
                                        onClick={() => setEditingAnswerIndex(null)}>
                                            Cancel
                                        </span>

                                        <button className='text-[14px] text-main-maroon font-semibold border border-main-maroon hover:cursor-pointer hover:bg-main-maroon hover:text-white py-[5px] px-[20px] rounded-[12px]'
                                            onClick={() => {handleSaveAnswer(item.answerId)}}>
                                            Save
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </li>
                )
            }
        )
    )
}