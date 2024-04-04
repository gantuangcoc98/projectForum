import { useEffect, useRef, useState } from "react";
import { getCurrentDate } from "./Function";
import profile from '../images/logo.png'; 

export const Answer = ({user}) => {
    const [loggedUser, setLoggedUser] = useState({});
    
    const [answer, setAnswer] = useState('');
    const [date, setDate] = useState('');

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

    const processAnswer = () => {
        const _answer = {
            answerId: 1,
            content: answer,
            author: loggedUser,
            date: date,
        }

        console.log(_answer);
    }

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