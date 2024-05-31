import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { createPost, fetchUser } from "../components/Function";

export const NewPost = () => {

    const [loggedUser, setLoggedUser] = useState({});

    const [loginStatus, setLoginStatus] = useState(false);

    const [title, setTitle] = useState('');
    const [titleCharCount, setTitleCharCount] = useState(0);
    const [titleLengthWarning, setTitleLengthWarning] = useState(false);

    const [description, setDescription] = useState('');
    const descriptionRef = useRef(null);

    const [emptyTitleToggle, setEmptyTitleToggle] = useState(false);
    const [emptyDescriptionToggle, setEmptyDescriptionToggle] = useState(false);

    const navigate = useNavigate();

    const handleTitleOnChange = (e) => {
        const _title = e.target.value;
        setTitle(_title);
        setTitleCharCount(_title.length);

        if (titleCharCount > 60) {
            setTitleLengthWarning(true);
        } else {
            setTitleLengthWarning(false);
        }

        setEmptyTitleToggle(false);
    }

    const handleFetchUser = async (username) => {
        const user = await fetchUser(username);

        if (user != null) {
            setLoggedUser(user);
            setLoginStatus(true);
        } else {
            console.log("Failed to fetch user.");
        }
    }

    const handlePostOnClick = async () => {

        if (title === "") setEmptyTitleToggle(true);
        else if (description === "") setEmptyDescriptionToggle(true);
        else {
            const postData = {
            "title": title,
            "description": description,
            "postAuthor": {
                "userId": loggedUser.userId
                }   
            }

            const response = await createPost(postData);
            
            switch (response) {
                case 0:
                    console.log("User not found.");
                    navigate('/login');
                    break;
                case 1:
                    console.log("Successfully created new post.");
                    navigate('/home');
                    break;
                case -1:
                    console.log("User account is on deletion process");
                    navigate('/login');
                    break;
                default:
                    break;
            }
        }
    }

    useEffect(
        () => {
            const textarea = descriptionRef.current;
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

    useEffect(
        () => {
            if (!loginStatus) {
                try {
                    const username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));

                    if (username != null) {
                        handleFetchUser(username);
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }, [loginStatus]
    )

    return (
        <>
            <Header pageState={'post'}/>

            <div className="flex justify-center w-full h-fit">
                <div className="flex flex-col gap-[20px] h-fit w-[40%] py-[30px]">
                    <div className="flex flex-col">
                        <span className="text-[23px] font-semibold">Create a new post</span>
                        <span className="text-[14px]">A post can be anything you want to talk or ask about. 
                            It is the fundamental building block of forum interactions, facilitating conversations among other users.
                            
                        </span>

                        <div className="mt-[5px] h-[2px] w-full bg-dark-white rounded-[12px]"/>
                    </div>

                    <div className="flex flex-col w-full h-fit gap-[20px]">
                        <label htmlFor="title" className="flex flex-col gap-[5px]">
                            <div className="flex gap-[10px] items-center">
                                <span className="text-[18px] font-semibold">Title</span>
                                {titleLengthWarning && <span className="text-[14px] text-red-500">We recommend a short title as possible.</span>}
                                {emptyTitleToggle && <span className="text-[14px] text-red-500">We need title to be honest.</span>}
                            </div>

                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => { handleTitleOnChange(e) }}
                                className="text-[18px] rounded-[6px] p-[5px] w-full h-auto bg-dark-white focus:outline-none focus:border border-main-maroon"
                            />

                            <span className="text-[14px]">Choose a compelling title that grabs attention. A good title is crucial for attracting readers.</span>
                        </label>

                        <label htmlFor="description" className="flex flex-col w-full h-fit gap-[5px]">
                            <div className="flex gap-[10px] items-center">
                                <span className="text-[18px] font-semibold">Description</span>
                                {emptyDescriptionToggle && <span className="text-[14px] text-red-500">Please provide a description.</span>}
                            </div>

                            <textarea ref={descriptionRef}
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => { 
                                    setDescription(e.target.value);
                                    setEmptyDescriptionToggle(false);
                                }}
                                className="flex text-[16px] rounded-[6px] p-[5px] bg-dark-white focus:outline-none focus:border border-main-maroon overflow-hidden resize-none"
                            />

                            <span className="text-[14px]">
                                This is the main body of your post. Be detailed and clear to ensure your message is understood. 
                                You might share an experience, ask for advice, or provide valuable information.
                            </span>
                        </label>
                    </div>

                    
                    <div className="mt-[5px] h-[2px] w-full bg-dark-white rounded-[12px]"/>

                    <div className="flex justify-end items-center">
                        <button className="text-[16px] font-semibold rounded-[12px] px-[20px] py-[5px] bg-light-gold hover:bg-dark-gold"
                            onClick={() => {handlePostOnClick()}}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}