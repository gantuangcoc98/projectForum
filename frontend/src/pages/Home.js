import * as Io5Icons from "react-icons/io5";
import * as Fa6Icons from "react-icons/fa6";
import '../App.css';
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import profile from '../images/logo.png';
import { useEffect, useRef, useState } from "react";
import { fetchUser, getAllPosts, getAnswer, getFollowedPost, getNotificationsOf, getPost, sortPostsByDate } from "../components/Function";
import { Recommendations } from "../components/Recommendations";

const AnswerItem = ({answerList}) => {
    const [answerCount, setAnswerCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchAnswerCount = (answerList) => {
        if (answerList.length > 0) {
            let counter = 0;

            answerList.forEach(async answerId => {
                const answer = await getAnswer(answerId);

                if (answer !== "" && answer.state !== -1) {
                    counter += 1;
                    setAnswerCount(counter);
                }
            });
        }
    }

    useEffect(
        () => {
            fetchAnswerCount(answerList);
            setLoading(false);
        }, [answerList]
    )

    return (
        <>
            {loading ?
                <>Loading answers...</>
                :
                <>{answerCount} answers</>
            }
        </>
    )
}

export const Home = () => {

    const [loggedUser, setLoggedUser] = useState({});

    const [loginStatus, setLoginStatus] = useState(false);

    const [filterOptionsToggle, setFilterOptionsToggle] = useState(false);

    const filterOptionRef = useRef(null);

    const [allPostdata, setAllPostData] = useState([]);

    const [sortedByCreationDate, setSortedByCreationDate] = useState([]);
    const [sortedByMostViews, setSortedByMostViews] = useState([]);

    const [followingPostData, setFollowingPostData] = useState([]);

    const [userPostData, setUserPostData] = useState([]);

    const [viewFilter, setViewFilter] = useState(true);
    const [voteFilter, setVoteFilter] = useState(false);
    const [dateCreatedFilter, setDateCreatedFilter] = useState(false);

    const [fypToggle, setFypToggle] = useState(true);

    const [notificationData, setNotificationData] = useState([]);

    const navigate = useNavigate();

    const display = (state) => {
        switch (state) {
            case 'fyp':
                setFypToggle(true);
                break;
            case 'following':
                setFypToggle(false);
                break;
            default:
                break;
        }
    }

    const viewPost = (postId) => {
        navigate(`/post/${postId}`);
    }

    const handleFetchUser = async (username) => {
        const user = await fetchUser(username);

        if (user !== null) {
            setLoggedUser(user);
            setLoginStatus(true);
            handleUserPostData(user.posts);
            handleFollowedPostData(user.following);
            fetchUserNotifications(user.userId);
        } else {
            console.log("Error fetching user login request.")
        }
    }

    const fetchUserNotifications = async (userId) => {
        const notificationList = await getNotificationsOf(userId);

        if (notificationList.length > 0) {
            const sortedNotif = notificationList.sort((a, b) => new Date(b.date) - new Date(a.date));
            const slicedSortedNotif = sortedNotif.slice(0, 5);
            setNotificationData(slicedSortedNotif);
        }
    }

    const handleFetchAllPosts = async () => {
        const allPosts = await getAllPosts();

        const filteredPosts = allPosts.filter(post => post.state !== -1);
        setAllPostData(filteredPosts);

        const sortedPosts = filteredPosts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        const latestFivePosts = sortedPosts.slice(0, 5);
        setSortedByCreationDate(latestFivePosts);

        const mostViewsData = filteredPosts.sort((a, b) => {
            return b.viewCount - a.viewCount
        });
        const slicedMostViewsData = mostViewsData.slice(0, 5);
        setSortedByMostViews(slicedMostViewsData);
    }

    const handleFollowedPostData = async (followedList) => {
        const followedPostData = await getFollowedPost(followedList);

        if (followedPostData.length > 0) {
            const filteredFollowedPostData = followedPostData.filter(post => post.state !== -1);
            setFollowingPostData(filteredFollowedPostData);
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

            setUserPostData(newUserPostData.filter((post) => post !== null));
        }
    }

    const filterBy = (state) => {
        switch (state) {
            case "views":
                console.log("Filtering based on views");
                if (fypToggle) {
                    allPostdata.sort((a, b) => {
                        if (a.viewCount === b.viewCount) {
                            return a;
                        } else {
                            if (viewFilter) {
                                setViewFilter(!viewFilter);
                                return a.viewCount - b.viewCount;
                            }
                            setViewFilter(!viewFilter);
                            return b.viewCount - a.viewCount;
                        }
                    })
                } else {
                    followingPostData.sort((a, b) => {
                        if (a.viewCount === b.viewCount) {
                            return a;
                        } else {
                            if (viewFilter) {
                                setViewFilter(!viewFilter);
                                return a.viewCount - b.viewCount;
                            }
                            setViewFilter(!viewFilter);
                            return b.viewCount - a.viewCount;
                        }
                    })
                }
                setVoteFilter(false);
                setDateCreatedFilter(false);
                break;
            case "votes":
                console.log("Filtering based on votes");
                if (fypToggle) {
                    allPostdata.sort((a, b) => {
                        console.log(b.upVoters.length);
                        if (a.upVoters.length === b.upVoters.length) {
                            return a;
                        } else {
                            if (voteFilter) {
                                setVoteFilter(!voteFilter);
                                return a.upVoters.length - b.upVoters.length;
                            }
                            setVoteFilter(!voteFilter);
                            return b.upVoters.length - a.upVoters.length;
                        }
                    })
                } else {
                    followingPostData.sort((a, b) => {
                        console.log(b.upVoters.length);
                        if (a.upVoters.length === b.upVoters.length) {
                            return a;
                        } else {
                            if (voteFilter) {
                                setVoteFilter(!voteFilter);
                                return a.upVoters.length - b.upVoters.length;
                            }
                            setVoteFilter(!voteFilter);
                            return b.upVoters.length - a.upVoters.length;
                        }
                    })
                }
                setViewFilter(false);
                setDateCreatedFilter(false);
                break;
            case "dateCreated":
                console.log("Filtering based on date created.");
                if (fypToggle) {
                    if (dateCreatedFilter) {
                        const allPostSortedByDate = sortPostsByDate(allPostdata, false);
                        setAllPostData(allPostSortedByDate);
                        setDateCreatedFilter(!dateCreatedFilter);
                    } else {
                        const allPostSortedByDate = sortPostsByDate(allPostdata, true);
                        setAllPostData(allPostSortedByDate);
                        setDateCreatedFilter(!dateCreatedFilter);
                    }
                } else {
                    if (dateCreatedFilter) {
                        const followedPostSortedByDate = sortPostsByDate(followingPostData, false);
                        setFollowingPostData(followedPostSortedByDate);
                        setDateCreatedFilter(!dateCreatedFilter);
                    } else {
                        const followedPostSortedByDate = sortPostsByDate(followingPostData, true);
                        setFollowingPostData(followedPostSortedByDate);
                        setDateCreatedFilter(!dateCreatedFilter);
                    }
                }
                setViewFilter(false);
                setVoteFilter(false);
                break;
            default:
                break;
        }

        setFilterOptionsToggle(false);
    }

    useEffect(
        () => {
            if (!loginStatus) {
                try {
                    const username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));

                    if (username !== null) {
                        handleFetchUser(username);
                        handleFetchAllPosts();
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    console.error("Error:", error)
                }
            }
        }, [loginStatus]
    )

    useEffect(
        () => {
            const handleOutsideClick = (event) => {
                if (filterOptionRef.current && !filterOptionRef.current.contains(event.target)) {
                    setFilterOptionsToggle(false);
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
            <SideBar userData={loggedUser} postData={userPostData}/>
            
            <div className="flex w-full h-full pl-[25%]">
                <div className="w-[70%] h-full relative">
                    <div className="flex w-full h-[61px] items-center justify-center border border-border-line sticky bg-light-white top-0">
                        <div className="flex justify-center items-center w-[50%] h-full hover:bg-dark-white hover:cursor-pointer"
                            onClick={()=>display('fyp')}>
                            <div className="flex flex-col w-fit h-full justify-center items-center relative">

                                <span className="font-semibold">For You</span>

                                {fypToggle &&
                                    <div className="h-[5px] w-full bg-main-maroon rounded-[12px] absolute bottom-0"/>
                                }
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-[50%] h-full hover:bg-dark-white hover:cursor-pointer"
                            onClick={()=>display('following')}>
                            <div className="flex flex-col w-fit h-full justify-center items-center relative">
                                
                                <span className="font-semibold">Following</span>

                                {!fypToggle &&
                                    <div className="h-[5px] w-full bg-main-maroon rounded-[12px] absolute bottom-0"/>
                                }
                            </div>
                        </div>

                        <div className="flex absolute w-fit h-fit right-0">
                            <span className="text-[20px] w-fit h-auto p-[10px] ml-[10px] mr-[10px] rounded-[12px] hover:cursor-pointer hover:bg-dark-white"
                                onClick={() => setFilterOptionsToggle(true)}>
                                <Io5Icons.IoFilterSharp/>
                            </span>

                            {filterOptionsToggle &&
                                <div className="flex flex-col gap-0 w-[220px] h-fit border border-dark-white bg-lighter-white rounded-[12px] absolute top-0" ref={filterOptionRef}>

                                    <span className="flex gap-[10px] w-full h-fit items-center p-[10px] font-semibold hover:cursor-pointer hover:bg-light-white rounded-[12px]"
                                        onClick={() => filterBy("views")}>
                                            {!viewFilter ?
                                                <Fa6Icons.FaArrowUpLong />
                                                :
                                                <Fa6Icons.FaArrowDownLong />
                                            }
                                        Views{!viewFilter ? <span>(Highest)</span> : <span>(Lowest)</span>}
                                    </span>

                                    <span className="flex gap-[10px] w-full h-fit items-center p-[10px] font-semibold hover:cursor-pointer hover:bg-light-white rounded-[12px]"
                                        onClick={() => filterBy("votes")}>
                                        {!voteFilter ?
                                            <Fa6Icons.FaArrowUpLong />
                                            :
                                            <Fa6Icons.FaArrowDownLong />
                                        }
                                        Votes{!voteFilter ? <span>(Highest)</span> : <span>(Lowest)</span>}
                                    </span>

                                    <span className="flex gap-[10px] w-full h-fit items-center p-[10px] font-semibold hover:cursor-pointer hover:bg-light-white rounded-[12px]"
                                        onClick={() => filterBy("dateCreated")}>
                                        {!dateCreatedFilter ?
                                            <Fa6Icons.FaArrowUpLong />
                                            :
                                            <Fa6Icons.FaArrowDownLong />
                                        }
                                        Date Created{!dateCreatedFilter ? <span>(Oldest)</span> : <span>(Newest)</span>}
                                    </span>

                                </div>
                            }
                        </div>

                    </div>

                    <ul className="w-full h-fit border-r-[1px] border-l-[1px] border-border-line">
                        {fypToggle ?
                            <>
                            {allPostdata.map(
                                (item, index) => {
                                    return (
                                        <li key={index} className="flex justify-between items-center w-full h-fit pl-[20px] pr-[20px] pt-[10px] pb-[10px] border-b border-border-line hover:bg-dark-white hover:cursor-pointer"
                                            onClick={()=>viewPost(item.postId)}>
                                            <div className="flex gap-[10px] w-fit h-full">
                                                <span className="w-[51px]"><img src={profile} alt="profile" width="100%" height="auto" className="rounded-[50%]"/></span>
                                                <div className="flex flex-col">
                                                    <div className="flex gap-[5px]">
                                                        <span className="text-main-maroon font-semibold">{item.postAuthor}</span>
                                                        <span className="text-dark-gold font-light">{'@' + item.postUsername}</span>
                                                    </div>
                                                    <span className="font-semibold text-[16px]">{item.title}</span>
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <div className="flex flex-col justify-between items-end">
                                                    <span className="text-[12px]">{item.viewCount} views</span>
                                                    {item.answered !== 0 ?
                                                        <span className="text-[12px] text-green-500 font-semibold"><AnswerItem answerList={item.answers}/></span>
                                                        :
                                                        <span className="text-[12px]"><AnswerItem answerList={item.answers}/></span>
                                                    }
                                                    <span className="text-[12px]">{item.upVoters.length - item.downVoters.length} votes</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            )}
                            </>
                            :
                            <>
                            {followingPostData.map(
                                (item, index) => {
                                    return (
                                        <li key={index} className="flex justify-between items-center w-full h-fit pl-[20px] pr-[20px] pt-[10px] pb-[10px] border-b border-border-line hover:bg-dark-white hover:cursor-pointer"
                                            onClick={()=>viewPost(item.postId)}>
                                            <div className="flex gap-[10px] w-fit h-full">
                                                <span className="w-[51px]"><img src={profile} alt="profile" width="100%" height="auto" className="rounded-[50%]"/></span>
                                                <div className="flex flex-col">
                                                    <div className="flex gap-[5px]">
                                                        <span className="text-main-maroon font-semibold">{item.postAuthor}</span>
                                                        <span className="text-dark-gold font-light">{'@' + item.postUsername}</span>
                                                    </div>
                                                    <span className="font-semibold text-[16px]">{item.title}</span>
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <div className="flex flex-col justify-between items-end">
                                                    <span className="text-[12px]">{item.viewCount} views</span>
                                                    {item.answered !== 0 ?
                                                        <span className="text-[12px] text-green-500 font-semibold"><AnswerItem answerList={item.answers}/></span>
                                                        :
                                                        <span className="text-[12px]"><AnswerItem answerList={item.answers}/></span>
                                                    }
                                                    <span className="text-[12px]">{item.upVoters.length - item.downVoters.length} votes</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            )}
                            </>
                        }
                    </ul>
                </div>

                <Recommendations latestData={sortedByCreationDate} mostViewData={sortedByMostViews} loggedUser={loggedUser} notificationData={notificationData}/>
            </div>
        </>
    )
}