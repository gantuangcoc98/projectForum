import SideBar from "../components/SideBar";
import { useEffect, useRef, useState } from "react";
import profile from "../images/logo.png";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { CommentInput } from "../components/CommentInput";
import { AnswerInput } from "../components/AnswerInput";
import { Answers } from "../components/Answers";
import { Comments } from "../components/Comments";
import { deletePost, fetchUser, formatDateTime, getAllPosts, getAnswer, getComment, getLocalUser, getPost, incrementViews, updatePost, votePost } from "../components/Function";
import { Recommendations } from "../components/Recommendations";

export const Post = () => {
    const navigate = useNavigate();

    const { postId } = useParams();

    const [userPostData, setUserPostData] = useState([]);

    const [postData, setPostData] = useState({});

    const [sortedByCreationDate, setSortedByCreationDate] = useState([]);
    const [sortedByMostViews, setSortedByMostViews] = useState([]);

    const [upVotes, setUpVotes] = useState(0);
    const [downVotes, setDownVotes] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const [userUpVoted, setUserUpVoted] = useState(false);
    const [userDownVoted, setUserDownVoted] = useState(false);

    const [postDeleted, setPostDeleted] = useState(false);

    const [postOptionToggle, setPostOptionToggle] = useState(false);

    const [postOwner, setPostOwner] = useState(false);

    const postOptionRef = useRef(null);

    const [answerList, setAnswerList] = useState([]);
    const [commentList, setCommentList] = useState([]);

    const [loggedUser, setLoggedUser] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);

    const [answerToggle, setAnswerToggle] = useState(false);
    const [commentToggle, setCommentToggle] = useState(false);

    const [viewsIncremented, setViewsIncremented] = useState(false);

    const [upVote, setUpVote] = useState("text-black");
    const [downVote, setDownVote] = useState("text-black");
    const [comments, setComments] = useState("text-black");
    const [upVoteBackground, setUpVoteBackground] = useState("bg-transparent");
    const [downVoteBackground, setDownVoteBackground] = useState("bg-transparent");
    const [commentsBackground, setCommentsBackground] = useState("bg-transparent");

    const [showAnswers, setShowAnswers] = useState(true);

    const commentRef = useRef(null);

    const openAnswer = () => {
        setAnswerToggle(true);
        setCommentToggle(false);
        display("answers");
    };

    const openComment = () => {
        setCommentToggle(true);
        setAnswerToggle(false);
        display("comments");
        commentRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const iconMouseEnter = (icon) => {
        switch (icon) {
        case "up":
            setUpVote("text-main-maroon font-semibold");
            setUpVoteBackground("rounded-[50%] p-[5px] bg-dark-white");
            break;
        case "down":
            setDownVote("text-main-maroon font-semibold");
            setDownVoteBackground("rounded-[50%] p-[5px] bg-dark-white");
            break;
        case "comments":
            setComments("text-main-maroon font-semibold");
            setCommentsBackground("rounded-[50%] p-[5px] bg-dark-white");
            break;
        default:
            break;
        }
    };

    const iconMouseLeave = (icon) => {
        switch (icon) {
        case "up":
            setUpVote("text-black");
            setUpVoteBackground("bg-transparent");
            break;
        case "down":
            setDownVote("text-black");
            setDownVoteBackground("bg-transparent");
            break;
        case "comments":
            setComments("text-black");
            setCommentsBackground("bg-transparent");
            break;
        default:
            break;
        }
    };

    const display = (state) => {
        switch(state) {
            case 'answers':
                setShowAnswers(true);
                setCommentToggle(false);
                break;
            case 'comments':
                setShowAnswers(false);
                setAnswerToggle(false);
                break;
            default:
                break;
        }
    }

    const showPostOption = () => {
        setPostOptionToggle(true);
    }

    const editPost = (postId) => {
        navigate(`/post/${postId}/edit`);
    }
    
    const _deletePost = async (postId) => {
        const response = await deletePost(postId);

        switch (response) {
            case 0:
                console.log("Post not found.");
                navigate('/home');
                break;
            case 1:
                console.log("Successfully deleted post.");
                navigate('/home');
                break;
            case -1:
                console.log("Post already deleted.");
                navigate('/home');
                break;
            default:
                break;
        }
    }
    
    const viewProfile = (username) => {
        navigate(`/profile/${username}`);
    }

    const handleFetchAllPosts = async () => {
        const allPosts = await getAllPosts();

        const filteredPosts = allPosts.filter(post => post.state !== -1);

        const sortedPosts = filteredPosts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        const latestFivePosts = sortedPosts.slice(0, 5);
        setSortedByCreationDate(latestFivePosts);

        const mostViewsData = filteredPosts.sort((a, b) => {
            return b.viewCount - a.viewCount
        });
        const slicedMostViewsData = mostViewsData.slice(0, 5);
        setSortedByMostViews(slicedMostViewsData);
    }

    const handleFetchUser = async (username) => {
        const user = await fetchUser(username);

        if (user !== null) {
            setLoggedUser(user);
            setLoginStatus(true);
            handleUserPostData(user.posts);
            handleUserVoteState(user);
        } else {
            console.log("Failed to fetch user.");
        }
    }

    const handleFetchPost = async (postId) => {
        const post = await getPost(postId);

        if (post !== "") {
            if (post.state === -1) {
                setPostDeleted(true);
            } else {
                setPostData(post);
                handleAnswerData(post.answered, post.answers);
                handleCommentData(post.comments);
                handlePostOwner(post.postUsername);
                setUpVotes(post.upVoters.length);
                setDownVotes(post.downVoters.length);

                window.localStorage.setItem("VIEWING_POST", JSON.stringify(postId));
            }
        } else {
            window.localStorage.setItem("VIEWING_POST", JSON.stringify(null));
            navigate('/home');
        }
    }

    const handleUserVoteState = (userData) => {
        if (userData.upVotedPosts.includes(JSON.parse(postId)) && !userUpVoted) {
            setUserUpVoted(true);
        } else if (userData.downVotedPosts.includes(JSON.parse(postId)) && !userDownVoted) {
            setUserDownVoted(true);
        }
    }

    const handleUserPostData = async (postIdList) => {
        if (postIdList.length > 0) {
            const newUserPostData = await Promise.all(
                postIdList.map(async (postId) => {
                    const post = await getPost(postId);

                    if (post !== "" && post.state !== -1) {
                        return {
                            "postId": post.postId,
                            "title": post.title,
                            "date": post.creationDate
                        }
                    } else {
                        return null;
                    }
                })
            );

            setUserPostData(newUserPostData.filter(post => post !== null));
        }
    }

    const handleAnswerData = async (answered, answerIdList) => {
        if (answerIdList.length > 0) {

            let answerExist = false;

            const newAnswerList = await Promise.all(
                answerIdList.map(async (answerId) => {
                    const answer = await getAnswer(answerId);
    
                    if (answer !== "" && answer.state !== -1) {

                        if (answer.mark === 1) answerExist = true;

                        return {
                            "answerId": answer.answerId,
                            "content": answer.content,
                            "author": answer.author,
                            "username": answer.username,
                            "date": answer.answerDate,
                            "state": answer.state,
                            "mark": answer.mark
                        };

                    } else {
                        return null;
                    }
                })
            );
    
            const filteredNewAnswerList = newAnswerList.filter(answer => answer !== null);
            const sortedByNewest = filteredNewAnswerList.sort(
                (a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);

                    return dateB - dateA;
                }
            )
            setAnswerList(sortedByNewest);

            if (!answerExist && answered !== 0) {
                const postUpdate = {
                    "postId": JSON.parse(postId),
                    "updateState": "unmark"
                }

                const response = await updatePost(postUpdate);

                switch (response) {
                    case 0:
                        console.log("Post not found.");
                        break;
                    case 1:
                        console.log("No marked answer found. Resetting post answered state.");
                        handleFetchPost(postId);
                        break;
                    case -1:
                        console.log("Post not found.");
                        break;
                    default:
                        break;
                }
            }
        }
    };

    const handleCommentData = async (commentIdList) => {
        if (commentIdList.length > 0) {
            const newCommentList = await Promise.all(
                commentIdList.map(async (commentId) => {
                    const comment = await getComment(commentId);
    
                    if (comment !== "" && comment.state !== -1) {
                        return {
                            "commentId": comment.commentId,
                            "content": comment.content,
                            "author": comment.author,
                            "username": comment.username,
                            "date": comment.date,
                            "state": comment.state
                        };
                    } else {
                        return null;
                    }
                })
            );
    
            // Filter out null values
            const filteredCommentList = newCommentList.filter(comment => comment !== null);
            const sortedByNewestComment = filteredCommentList.sort(
                (a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);

                    return dateB - dateA;
                }
            );
            setCommentList(sortedByNewestComment);
            setCommentCount(sortedByNewestComment.length);
        }
    }

    const handlePostOwner = (username) => {
        const _username = getLocalUser();
        
        if (username === _username) {
            setPostOwner(true);
        } else {
            setPostOwner(false);
        }
    }

    const handleVoteClick = async (voteState) => {
        const voteData = {
            "voter": loggedUser.username,
            "postId": JSON.parse(postId),
            "voteState": voteState
        }

        const response = await votePost(voteData);

        switch (response) {
            case 0:
                console.log("Voter or post not found. Voter or post might be deleted.");
                window.location.reload();
                break;
            case 1:
                console.log("Successfully " + voteState + "d post.");
                window.location.reload();
                break;
            default:
                break;
        }


    }

    const handleViewCount = async (postId) => {
        const response = await incrementViews(postId);

        if (response === 1) {
            console.log("Successfully incremented view count by 1.");
            setViewsIncremented(true);
        } else {
            console.log("Post not found.");
        }
    }

    useEffect(
        () => {
            if (!loginStatus) {
                try {
                    const username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));

                    if (username !== null) {
                        handleFetchUser(username);
                        handleFetchPost(postId);
                        handleFetchAllPosts();
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    console.error("Error:", error)
                }
            } else {
                handleViewCount(postId);
            }
        }, [loginStatus]
    )

    useEffect(
        () => {
            const handleOutsideClick = (event) => {
                if (postOptionRef.current && !postOptionRef.current.contains(event.target)) {
                    setPostOptionToggle(false);
                }
            }

            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            }

        }, []
    )

    return (
        <>
            <SideBar userData={loggedUser} postData={userPostData} />

            <div className="flex w-full h-full pl-[25%]">
                <div className="w-[70%] h-full">
                    <div className="flex w-full gap-[30px] h-[61px] items-center justify-start pl-[20px] border border-border-line bg-light-white">
                        <span
                            className="text-[16px] p-[10px] rounded-[50%] hover:bg-dark-white hover:cursor-pointer"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <FaIcons.FaArrowLeft />
                        </span>
                        <span className="text-[20px] font-semibold">Post</span>
                </div>

                    {!postDeleted ? 
                        <div className="flex flex-col w-full h-full border-r border-l border-b border-border-line">
                            <div className="flex gap-[10px] w-full h-fit p-[10px]">
                                <span className="w-[8%] h-fit hover:cursor-pointer hover:opacity-60">
                                    <img src={profile} alt="profile" className="rounded-[50%]"
                                        onClick={() => viewProfile(postData.postUsername)}/>
                                </span>

                                <div className="flex flex-col gap-[5px] h-full w-full text-[18px]">
                                    <div className="flex items-center justify-between relative w-full h-fit">
                                        <div className="flex gap-[5px]">
                                            <span className="font-semibold text-main-maroon hover:underline hover:cursor-pointer"
                                                onClick={() => viewProfile(postData.postUsername)}>
                                                {postData.postAuthor}
                                            </span>
                                            <span className="font-light text-dark-gold hover:cursor-pointer"
                                                onClick={() => viewProfile(postData.postUsername)}>
                                                @{postData.postUsername}
                                            </span>
                                        </div>

                                        {postData.postUsername === loggedUser.username &&
                                            <div className="w-fit h-fit absolute right-0">
                                                <span className="flex h-full text-[20px] p-[5px] rounded-[50%] hover:cursor-pointer hover:bg-dark-white z-0"
                                                        onClick={()=>showPostOption()}>
                                                        <BiIcons.BiDotsHorizontalRounded/>
                                                </span>

                                                {postOptionToggle && 
                                                    <div className="flex flex-col gap-0 w-[140px] h-fit border border-dark-white bg-lighter-white rounded-[12px] absolute top-0" ref={postOptionRef}>
                                                        <span className="flex items-center gap-[10px] p-[10px] font-semibold hover:cursor-pointer hover:bg-light-gold rounded-t-[12px]"
                                                            onClick={()=>{
                                                                editPost(postId);
                                                            }}>
                                                            <span className="text-[19px]"><MdIcons.MdOutlineCreate /></span>
                                                            <span className="text-[16px]">Edit Post</span>
                                                        </span>
                                                        <span className="flex items-center gap-[10px] p-[10px] font-semibold rounded-b-[12px] hover:cursor-pointer hover:bg-red-300"
                                                            onClick={() => {
                                                                _deletePost(postId);
                                                            }}>
                                                            <span className="text-[20px]"><MdIcons.MdDeleteForever/></span>
                                                            <span className="text-[16px]">Delete Post</span>
                                                        </span>
                                                    </div>
                                                }
                                                
                                            </div>
                                        }
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex items-end justify-between">
                                            <span className="font-semibold text-[20px]">{postData.title}</span>
                                        </div>
                                        <span>{postData.description}</span>
                                    </div>

                                    <div className="flex gap-[5px] items-center text-gray-500">
                                        <span className="text-[9px]"><FaIcons.FaCircleNotch/></span>
                                        <span className="text-[15px]">
                                            {formatDateTime(postData.creationDate)}
                                            {postData.state === 1 &&
                                                <span> (Edited)</span>
                                            }
                                        </span>
                                        <span className="text-[9px]"><FaIcons.FaCircleNotch/></span>
                                        <span className="text-[15px] ml-[5px] font-semibold">{postData.viewCount} views</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full pl-[20px] pr-[20px] mb-[10px] h-fit">
                                <div className="flex pt-[5px] pb-[5px] pl-[10px] pr-[10px] items-center justify-between border-t border-b border-border-line"> 
                                    <span className={"flex gap-[5px] items-center p-[5px] rounded-[12px] text-[20px] h-full w-fit hover:cursor-pointer " + upVote}
                                        onMouseEnter={()=>iconMouseEnter('up')}
                                        onMouseLeave={()=>iconMouseLeave('up')}
                                        onClick={() => handleVoteClick("upVote")}>
                                        <span className={upVoteBackground}>
                                            {userUpVoted ? 
                                                <BiIcons.BiSolidUpvote />
                                                :
                                                <BiIcons.BiUpvote/>
                                            }
                                        </span>
                                        <span className="w-fit h-fit text-[16px]">{upVotes}</span>
                                    </span>
                                    <span className={"flex gap-[5px] items-center p-[5px] rounded-[12px] text-[20px] h-full w-fit hover:cursor-pointer " + downVote}
                                        onMouseEnter={()=>iconMouseEnter('down')}
                                        onMouseLeave={()=>iconMouseLeave('down')}
                                        onClick={() => handleVoteClick("downVote")}>
                                        <span className={downVoteBackground}>
                                            {userDownVoted ? 
                                                <BiIcons.BiSolidDownvote />
                                                :
                                                <BiIcons.BiDownvote/>
                                            }
                                        </span>
                                        <span className="w-fit h-fit text-[16px]">{downVotes}</span>
                                    </span>
                                    <span className={"flex gap-[5px] items-center p-[5px] rounded-[12px] text-[20px] h-full w-fit hover:cursor-pointer " + comments}
                                        onMouseEnter={()=>iconMouseEnter('comments')}
                                        onMouseLeave={()=>iconMouseLeave('comments')}
                                        onClick={()=>openComment()}>
                                        <span className={commentsBackground}><BiIcons.BiComment/></span>
                                        <span className="w-fit h-fit text-[16px]">{commentCount}</span>
                                    </span>
                                    <span className="flex items-center w-fit h-fit p-[5px] text-[20px] rounded-[12px] bg-light-gold hover:bg-dark-gold hover:cursor-pointer"
                                        onClick={()=>openAnswer()}>
                                        <MdIcons.MdLightbulbOutline />
                                        <span className="text-[16px]">Answer</span>
                                    </span>
                                </div>
                            </div>

                            {answerToggle && <AnswerInput user={loggedUser} postId={postData.postId} />}

                            <div className="flex justify-evenly w-full h-[50px] text-[16px] border-t border-border-line">
                                <div className="flex justify-center w-[50%] h-full hover:bg-dark-white hover:cursor-pointer"
                                    onClick={()=>display('answers')}>
                                    <div className="flex flex-col justify-center w-fit h-full relative">
                                        <span className={showAnswers ? 'font-semibold' : ''}>Answers</span>
                                        {showAnswers &&
                                            <div className="h-[5px] w-full bg-main-maroon rounded-[12px] absolute bottom-0"/>
                                        }
                                    </div>
                                </div>
                                <div className="flex justify-center w-[50%] h-full hover:bg-dark-white hover:cursor-pointer"
                                    onClick={()=>display('comments')}>
                                    <div className="flex flex-col justify-center w-fit h-full relative">
                                        <span className={!showAnswers ? 'font-semibold' : ''}>Comments</span>
                                        {!showAnswers &&
                                            <div className="h-[5px] w-full bg-main-maroon rounded-[12px] absolute bottom-0"/>
                                        }
                                    </div>
                                </div>
                            </div>

                        
                            <div className="w-full h-fit" ref={commentRef}>
                                {commentToggle && <CommentInput user={loggedUser} postId={postId}/>}

                                <ul className="flex flex-col w-full h-fit">
                                    {showAnswers ? <Answers data={answerList} postOwner={postOwner} loggedUser={loggedUser} postId={JSON.parse(postId)}/>
                                        : <Comments data={commentList} postOwner={postOwner} loggedUser={loggedUser} />}
                                </ul> 
                            </div>
                        </div>
                    :
                        <div className="flex py-[20px] gap-[20px] w-full h-full justify-around border-r border-l border-b border-border-line">
                            <div className="flex flex-col w-[80%] h-full gap-[15px]">
                                <span className="text-[20px] font-semibold">Post Not Found</span>
                                <span>Sorry, but the post you are looking for has been deleted or is now traveling in the empty space of the void.</span>

                                <ul className="flex flex-col list-disc pl-[10px] gap-[5px]">
                                    <li className="w-fit h-fit">
                                        <span className="hover:cursor-pointer font-semibold text-main-maroon hover:text-lighter-maroon"
                                            onClick={()=>{navigate('/home')}}>
                                            Return to home page.
                                        </span>
                                    </li>
                                    <li className="w-fit h-fit">
                                        <span className="hover:cursor-pointer font-semibold text-main-maroon hover:text-lighter-maroon"
                                            onClick={()=>{navigate('/post/new')}}>
                                            Create new post.
                                        </span>
                                    </li>
                                </ul>

                                <span>
                                    If you believe this is an error, please 
                                    <span className="text-main-maroon font-semibold hover:text-lighter-maroon hover:cursor-pointer"
                                        onClick={()=>{console.log("Contacting support.")}}> contact support</span>
                                    .
                                </span>
                            </div>
                        </div>
                    }
                </div>
 
                <Recommendations latestData={sortedByCreationDate} mostViewData={sortedByMostViews} loggedUser={loggedUser}/>
            </div>
        </>
    )
}