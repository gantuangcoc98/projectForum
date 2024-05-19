import { useState, useEffect, useRef } from 'react';
import profile from '../images/logo.png';
import { createComment } from './Function';
import { useNavigate } from 'react-router-dom';

export const CommentInput = ({user, postId}) => {

    const [comment, setComment] = useState('');

    const [loggedUser, setLoggedUser] = useState({});

    const textareaRef = useRef(null);

    const navigate = useNavigate();

    useEffect(
        () => {
            setLoggedUser(user);
            
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

    const processComment = async () => {

        const commentData = {
            "content": comment,
            "username": loggedUser.username,
            "postId": postId
        }

        const _comment = await createComment(commentData);

        if (_comment !== "") {
            console.log("Successfully created comment.");
            window.location.reload();
        } else {
            console.log("Failed to create comment.");
            window.location.reload();
        }
        
    }

    return (
        <div className="flex h-fit w-full gap-[10px] border-t border-border-line p-[10px]"
            onClick={()=>textareaRef.current.focus()}>
            <span className="w-[51px] h-[51px] hover:cursor-pointer">
                <img src={profile} alt="profile" width='100%' className='rounded-[50%] hover:opacity-60'
                    onClick={() => { navigate('/profile') }}/>
            </span>
            <div className="flex flex-col w-full h-fit text-[18px] pr-[20px]">

                <div className='flex items-center w-fit h-fit gap-[5px]'>
                    <span className='text-[16px] text-main-maroon font-semibold hover:underline hover:cursor-pointer'
                        onClick={() => { navigate('/profile') }}>{user.firstName} {user.lastName}</span>
                    <span className='text-dark-gold text-[16px] hover:cursor-pointer'
                        onClick={() => { navigate('/profile') }}>@{user.username}</span>
                </div>

                <label htmlFor="comment" className="w-full h-fit mt-[5px]">
                    <textarea ref={textareaRef} className="w-full bg-transparent focus:outline-none overflow-hidden resize-none text-[16px]"
                        id="comment"
                        typeof="text"
                        value={comment}
                        placeholder="Type your comment here..."
                        onChange={(e) => { setComment(e.target.value); } }/>
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