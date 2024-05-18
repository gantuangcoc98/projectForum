import { useEffect, useRef, useState } from "react";
import { createAnswer } from "./Function";
import profile from '../images/logo.png'; 

export const AnswerInput = ({user, postId}) => {
    const [loggedUser, setLoggedUser] = useState({});
    
    const [answer, setAnswer] = useState('');

    const textareaRef = useRef(null);

    const processAnswer = async () => {
        const answerData = {
            "content": answer,
            "postId": parseInt(postId),
            "username": loggedUser.username
        }
        
        const _answer = await createAnswer(answerData);

        if (_answer !== "") {
            console.log("Successfully submitted answer.");
            window.location.reload();
        } else {
            console.log("Failed to submit answer.");
        }
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
            <span className="w-[51px] h-[51px]"><img src={profile} alt="profile" width='100%' height='100%'/></span>

            <div className="flex flex-col w-full h-fit">
                <label htmlFor="answer" className="w-full h-fit">
                    <textarea ref={textareaRef}
                        id="answer"
                        className="text-[18px] bg-dark-white w-full h-auto p-[10px] border border-transparent focus:outline-none focus:border-main-maroon overflow-hidden resize-none"
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