import { useState, useEffect, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import { getCurrentDate, viewProfile } from './Function';
import profile from '../images/logo.png';

export const Comment = ({user}) => {
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [loggedUser, setLoggedUser] = useState({});
    const textareaRef = useRef(null);
    
    useEffect(
        () => {
            setLoggedUser(user);

            const date = getCurrentDate();
            setDate(date);
            
            const textarea = textareaRef.current;
            textarea.focus();
            textarea.addEventListener('input', autoResize, false);

            function autoResize() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
            }

            return () => {
            textarea.removeEventListener('input', autoResize, false);
            };
        }, []
    )

    const processComment = () => {
        console.log('Processing comment...');

        const _comment = {
            commentId: 1,
            content: comment,
            date: date,
            author: loggedUser,
        }

        console.log(_comment);
    }

    return (
        <div className="flex h-fit w-full gap-[10px] border-t border-border-line p-[10px]"
            onClick={()=>textareaRef.current.focus()}>
            <span className="w-[51px] h-[51px]"><img src={profile} alt="profile" width='100%'/></span>
            <div className="flex flex-col w-full h-fit gap-[5px] text-[18px] pr-[10px] pt-[10px]">
                <label htmlFor="comment" className="w-full h-fit">
                    <textarea ref={textareaRef} className="w-full h-fit bg-transparent focus:outline-none overflow-hidden resize-none"
                        id="comment"
                        typeof="text"
                        value={comment}
                        placeholder="Type your comment here..."
                        onChange={(e)=>setComment(e.target.value)}/>
                </label>
                <div className="flex w-full h-fit justify-end items-center">
                    <button className="pt-[5px] pb-[5px] pl-[20px] pr-[20px] text-[14px] font-semibold rounded-[12px] bg-light-gold hover:bg-dark-gold"
                        onClick={()=>processComment()}>Comment
                    </button>
                </div>
            </div>
        </div>
    )
}