import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { fetchUser, getPost, updatePost } from "../components/Function";
import { Header } from "../components/Header";

export const EditPost = () => {

    const navigate = useNavigate();

    const { postId } = useParams();

    const [postIdLong, setPostIdLong] = useState(0);
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');

    const [loginStatus, setLoginStatus] = useState(false);

    const [titleCharCount, setTitleCharCount] = useState(0);
    const [titleLengthWarning, setTitleLengthWarning] = useState(false);

    const [emptyTitleToggle, setEmptyTitleToggle] = useState(false);
    const [emptyDescriptionToggle, setEmptyDescriptionToggle] = useState(false);

    const descriptionRef = useRef(null);

    const handleFetchUser = async (username) => {
        const user = await fetchUser(username);

        if (user !== "") {
            setLoginStatus(true);
        }
    }

    const handleFetchPost = async (postId, username) => {
        const post = await getPost(postId);
        
        if (post !== "" && post.postUsername === username && post.state !== -1) {
            setPostIdLong(post.postId);
            setPostTitle(post.title);
            setPostDescription(post.description);
        } else {
            navigate('/home');
        }
    }

    const handleTitleOnChange = (e) => {
        const _title = e.target.value;
        setPostTitle(_title);
        setTitleCharCount(_title.length);

        if (titleCharCount > 60) {
            setTitleLengthWarning(true);
        } else {
            setTitleLengthWarning(false);
        }

        setEmptyTitleToggle(false);
    }

    const handleSaveOnClick = async () => {

        if (postTitle === "") setEmptyTitleToggle(true);
        else if (postDescription === "") setEmptyDescriptionToggle(true);
        else {
            const postData = {
                "postId": postIdLong,
                "title": postTitle,
                "description": postDescription
            }
    
            const response = await updatePost(postData);
    
            switch (response) {
                case 0:
                    console.log("Post not found.");
                    navigate('/home');
                    break;
                case 1:
                    console.log("Successfully updated post.");
                    navigate(`/post/${postId}`);
                    break;
                case -1:
                    console.log("Post is already deleted.");
                    navigate('/home');
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

                    handleFetchUser(username);
                    handleFetchPost(postId, username);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }, [loginStatus]
    )

    return (
        <>
            <Header />

            <div className="flex justify-center w-full h-fit">
                <div className="flex flex-col gap-[23px] h-fit w-[40%] py-[30px]">
                    <div className="flex flex-col">
                        <span className="text-[20px] font-semibold">Edit your post.</span>
                        <span className="text-[14px]">Any particular thing you want to add or something seems a bit off?</span>
                        
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
                                value={postTitle}
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
                                value={postDescription}
                                onChange={(e) => { 
                                    setPostDescription(e.target.value);
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
                            onClick={() => {handleSaveOnClick()}}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}