import { useEffect, useRef, useState } from "react";
import { createAnswer, createNotif, getPost } from "./Function";
import profile from '../images/logo.png'; 
import { useNavigate } from "react-router-dom";

export const AnswerInput = ({user, postId}) => {
    const [loggedUser, setLoggedUser] = useState({});
    
    const [answer, setAnswer] = useState('');

    const textareaRef = useRef(null);

    const navigate = useNavigate();

    const processAnswer = async () => {
        const answerData = {
            "content": answer,
            "postId": parseInt(postId),
            "username": loggedUser.username
        }
        
        const _answer = await createAnswer(answerData);

        if (_answer !== "") {
            console.log("Successfully submitted answer.");
            notifyUser();
        } else {
            console.log("Failed to submit answer.");
        }
    }


    const notifyUser = async () => {
        const post = await getPost(postId);

        if (post !== "" && post.state !== -1 && post.postUsername !== user.username) {
            const notifData = {
                "notificationType": "answer",
                "postId": postId,
                "toUser": post.postUsername,
                "fromUser": user.userId
            }

            const notification = await createNotif(notifData);

            if (notification !== "" && notification.state !== -1) {
                console.log("Successfully notified post author.");
            } else {
                console.log("Failed to notify post author.");
            }
        }

        window.location.reload();
    }

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

    return (
        <div className="flex w-full h-fit pl-[20px] pr-[20px] pb-[10px] gap-[10px]">
            <span className="w-[60px] h-auto">
                <img src={profile} alt="profile" width='100%' height='100%' className="rounded-[50%] hover:cursor-pointer hover:opacity-60"
                    onClick={() => { navigate('/profile') }}/>
            </span>

            <div className="flex flex-col w-full h-fit">

                <div className='flex items-center w-fit h-fit gap-[5px]'>
                    <span className='text-[16px] text-main-maroon font-semibold hover:cursor-pointer hover:underline'
                        onClick={() => { navigate('/profile') }}>{user.firstName} {user.lastName}</span>
                    <span className='text-dark-gold text-[16px] hover:cursor-pointer'
                        onClick={() => { navigate('/profile') }}>@{user.username}</span>
                </div>

                <label htmlFor="answer" className="w-full h-fit mt-[5px]">
                    <textarea ref={textareaRef}
                        id="answer"
                        className="text-[18px] bg-dark-white w-full h-auto p-[10px] border border-transparent rounded-[12px] focus:outline-none focus:border-main-maroon overflow-hidden resize-none"
                        typeof="text"
                        placeholder="Put your answer here."
                        value={answer}
                        onChange={(e)=>setAnswer(e.target.value)}/>
                </label>

                <div className="flex justify-end items-center w-full h-fit">
                    <span className="text-[14px] text-main-maroon font-semibold pt-[5px] pb-[5px] pl-[20px] pr-[20px] border border-main-maroon rounded-[12px] hover:bg-main-maroon hover:cursor-pointer hover:text-white"
                        onClick={()=>processAnswer()}>
                        Submit Answer
                    </span>
                </div>
            </div>
        </div>
    )
}