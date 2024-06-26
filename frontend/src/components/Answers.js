import profile from '../images/logo.png';
import { useEffect, useState, useRef } from "react";
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import { createNotif, deleteAnswer, formatDateTime, getAnswer, updateAnswer, updatePost } from './Function';
import { useNavigate } from 'react-router-dom';

export const Answers = ({data, postOwner, loggedUser, postId}) => {
    const answerOptionRef = useRef(null);

    const answerList = data;

    const [selectedAnswerItem, setSelectedAnswerItem] = useState(null);
    const [editingAnswerIndex, setEditingAnswerIndex] = useState(null);

    const textareaRef = useRef(null);

    const navigate = useNavigate();

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

    const markAnswer = async (answerId) => {

        const currentlyMarkedAnswer = answerList.find(answer => answer.mark === 1);

        if (currentlyMarkedAnswer) {
            await unmarkAnswer(currentlyMarkedAnswer.answerId);
        }

        const answerData = {
            "answerId": answerId,
            "updateState": "mark"
        }

        const response = await updateAnswer(answerData);

        switch (response) {
            case 0:
                console.log("Could not find answer.");
                window.location.reload();
                break;
            case 1:
                console.log("Successfully marked as answer.");
                markPost(answerId);
                notifyAnswerAuthor(answerId);
                break;
            case -1:
                console.log("Answer already deleted.");
                window.location.reload();
                break;
            default:
                break;
        }
    }

    const unmarkAnswer = async (answerId) => {

        const answerData = {
            "answerId": answerId,
            "updateState": "unmark"
        }

        const response = await updateAnswer(answerData);

        switch (response) {
            case 0:
                console.log("Could not find previous marked answer.");
                break;
            case 1:
                console.log("Successfully unmarked previous marked answer.");
                break;
            case -1:
                console.log("Previous marked answer already deleted.");
                break;
            default:
                break;
        }
    }

    const markPost = async (answerId) => {
        const postUpdate = {
            "postId": postId,
            "answered": answerId, 
            "updateState": "mark"
        }

        const response = await updatePost(postUpdate);

        switch (response) {
            case 0:
                console.log("Post not found.");
                window.location.reload();
                break;
            case 1:
                console.log("Successfully marked post.");
                window.location.reload();
                break;
            case -1:
                console.log("Post already deleted.");
                window.location.reload();
                break;
            default:
                break;
        }
    }

    const unmarkPost = async () => {
        const postUpdate = {
            "postId": postId,
            "updateState": "unmark"
        }

        const response = await updatePost(postUpdate);

        switch (response) {
            case 0:
                console.log("Post not found.");
                window.location.reload();
                break;
            case 1:
                console.log("Successfully marked post.");
                window.location.reload();
                break;
            case -1:
                console.log("Post already deleted.");
                window.location.reload();
                break;
            default:
                break;
        }
    }

    const handleUnmarkPrompt = (answerId) => {
        unmarkAnswer(answerId);
        unmarkPost();
    }

    const handleSaveAnswer = async (answerId) => {
        const answerData = {
            "content": answer,
            "answerId": answerId,
            "updateState": "edit"
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

    const viewProfile = (username) => {
        navigate(`/profile/${username}`);
    }

    const notifyAnswerAuthor = async (answerId) => {
        const answer = await getAnswer(answerId);

        if (answer !== "" && answer.state !== -1 && answer.username !== loggedUser.username) {
            const notifData = {
                "notificationType": "markedAnswer",
                "postId": postId,
                "toUser": answer.username,
                "fromUser": loggedUser.userId
            }

            const notification = await createNotif(notifData);

            if (notification !== "" && notification.state !== -1) {
                console.log("Successfully notified user about the marked answer.");
            } else {
                console.log("Failed to notify user about the marked answer.");
            }
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
                    <li key={index} className="flex flex-col border-t border-border-line hover:bg-dark-white">

                        <div className='flex gap-[10px] p-[10px]'>
                            <span className="w-[51px] h-[51px] hover:cursor-pointer hover:opacity-60">
                                    <img src={profile} alt="profile" width="100%" className='rounded-[50%]'
                                        onClick={() => { viewProfile(item.username) }}/>
                            </span>
                            
                            <div className="flex flex-col h-fit w-full text-[16px]">
                                <div className="flex w-full h-fit items-center justify-between relative">
                                    <div className="flex gap-[5px]">
                                        <span className="text-main-maroon font-semibold hover:cursor-pointer hover:underline"
                                            onClick={() => { viewProfile(item.username) }}>
                                            {item.author}
                                        </span>
                                        <span className="text-dark-gold hover:cursor-pointer"
                                            onClick={() => { viewProfile(item.username) }}>
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
                                                        <>
                                                            {item.mark !== 1 ?
                                                                <div className="flex gap-[5px] items-center p-[10px] rounded-[12px] text-[16px] hover:cursor-pointer hover:bg-light-white"
                                                                onClick={() => { markAnswer(item.answerId) }}>
                                                                    <span className="pl-[3px]"><FaIcons.FaCheck /></span>
                                                                    <span className="font-semibold">Mark as answer</span>
                                                                </div>
                                                                :
                                                                <div className="flex gap-[5px] items-center p-[10px] rounded-[12px] text-[16px] hover:cursor-pointer hover:bg-light-white"
                                                                    onClick={() => { handleUnmarkPrompt(item.answerId) }}>
                                                                    <span className="pl-[3px]"><TbIcons.TbRubberStampOff/></span>
                                                                    <span className="font-semibold">Unmark answer</span>
                                                                </div>
                                                            }

                                                        </>
                                                    }

                                                    {loggedUser.username === item.username && 
                                                        <div className="flex gap-[5px] items-center p-[10px] rounded-[12px] hover:cursor-pointer hover:bg-light-white"
                                                            onClick={() => _editAnswer(index, item.content)}>
                                                            <span className="pl-[3px] text-[20px]"><MdIcons.MdOutlineCreate /></span>
                                                            <span className="font-semibold text-[16px]">Edit answer</span>
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
                                        <span className="text-[14px]">
                                            {formatDateTime(item.date)}
                                            {item.state === 1 &&
                                                <span> (Edited)</span>
                                            }
                                        </span>
                                        <span className="text-[8px]"><FaIcons.FaCircleNotch/></span>
                                    </div>
                            
                                    {editingAnswerIndex === index ?
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
                                        :
                                        <>
                                            {item.mark === 1 &&
                                                <span className='flex gap-[5px] items-center text-[14px] text-green-500 font-semibold'>
                                                    <span className='text-[16px]'><FaIcons.FaStamp /></span>
                                                    marked as best answer
                                                </span>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </li>
                )
            }
        )
    )
}