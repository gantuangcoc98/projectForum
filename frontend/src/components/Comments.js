import profile from '../images/logo.png';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { deleteComment, formatDateTime } from './Function';
import { useNavigate } from 'react-router-dom';

export const Comments = ({data, postOwner, loggedUser}) => {

    const commentOptionRef = useRef(null);

    const [selectedCommentItem, setSelectedCommentItem] = useState(null);

    const navigate = useNavigate();

    const showCommentOption = (index) => {
        setSelectedCommentItem(index === selectedCommentItem ? null : index);
    }

    const _deleteComment = async (commentId) => {
        const response = await deleteComment(commentId);

        switch (response) {
            case 0:
                console.log("Comment not found.");
                window.location.reload();
                break;
            case 1:
                console.log("Successfully deleted comment.");
                window.location.reload();
                break;
            case -1:
                console.log("Comment already deleted.");
                window.location.reload();
                break;
            default:
                break;
        }
    }

    const viewPost = (username) => {
        navigate(`/profile/${username}`);
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
                        <span className="w-[51px] h-[51px] hover:cursor-pointer hover:opacity-60">
                            <img src={profile} alt="profile" width='100%' className='rounded-[50%]'
                                onClick={() => { viewPost(item.username) }}/>
                        </span>
                        <div className="w-full h-fit flex flex-col text-[16px]">
                            <div className="flex items-center justify-between relative">
                                <div className="flex gap-[5px]">
                                    <span className="text-main-maroon font-semibold hover:underline hover:cursor-pointer"
                                        onClick={() => { viewPost(item.username) }}>
                                        {item.author}
                                    </span>
                                    <span className="text-dark-gold hover:cursor-pointer"
                                        onClick={() => { viewPost(item.username) }}>
                                        {'@' + item.username}
                                    </span>
                                </div>

                                {(postOwner || loggedUser.username === item.username) && 
                                    <div className="flex w-fit h-fit absolute right-0">
                                        <span className="text-[20px] p-[5px] hover:bg-light-white rounded-[50%] hover:cursor-pointer z-0"
                                            onClick={()=>showCommentOption(index)}>
                                            <BiIcons.BiDotsHorizontalRounded/>
                                        </span>

                                        {selectedCommentItem === index &&
                                            <div key={index} ref={commentOptionRef} className="flex flex-col h-fit w-[175px] absolute top-0 left-0 rounded-[12px] border border-border-line bg-lighter-white z-10">
                                                <div className="flex items-center gap-[5px] p-[10px] rounded-[12px]  hover:cursor-pointer hover:bg-light-white"
                                                    onClick={() => { _deleteComment(item.commentId) }}>
                                                    <span className="text-[20px]"><MdIcons.MdDeleteForever/></span>
                                                    <span className="font-semibold">Delete comment</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                }

                            </div>
                            <div className="h-fit w-[95%] pb-[5px]">
                                    <span>{item.content}</span>
                            </div>
                            <div className="flex gap-[5px] items-center text-gray-500">
                                <span className="text-[8px]"><FaIcons.FaCircleNotch/></span>
                                <span className="text-[14px]">{formatDateTime(item.date)}</span>
                                <span className="text-[8px]"><FaIcons.FaCircleNotch/></span>
                            </div>
                        </div>
                    </li>
                )
            }
        )
    )
}