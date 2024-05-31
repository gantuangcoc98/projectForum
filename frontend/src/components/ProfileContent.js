import { useNavigate } from "react-router-dom"
import logo from '../images/logo.png';
import { useEffect, useState } from "react";
import { createNotif, fetchUser, followUser, getPostByIds, getUserByIds, unfollowUser } from "./Function";
import { Settings } from "./Settings";


export const ProfileContent = ({profileData, answerList}) => {

  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState({});

  const [postData, setPostData] = useState([]);

  const [displaySection, setDisplaySection] = useState('profile');

  const [profileButtonDesign, setProfileButtonDesign] = useState('font-semibold rounded-[12px] bg-light-gold px-[20px] py-[3px] text-[14px] hover:bg-dark-gold hover:cursor-pointer');
  const [activityButtonDesign, setActivityButtonDesign] = useState('font-semibold rounded-[12px] px-[20px] py-[3px] text-[14px] hover:bg-dark-white hover:cursor-pointer');
  const [settingsButtonDesign, setSettingsButtonDesign] = useState('font-semibold rounded-[12px] px-[20px] py-[3px] text-[14px] hover:bg-dark-white hover:cursor-pointer');

  const [followedData, setFollowedData] = useState([]);

  const [profileFollowed, setProfileFollowed] = useState(false);

  const [activityButtonState, setActivityButtonState] = useState('summary');

  const [summaryButtonDesign, setSummaryButtonDesign] = useState("font-semibold w-full h-fit text-[20px] py-[5px] pl-[15px] rounded-[30px] bg-dark-white hover:cursor-pointer");
  const [postButtonDesign, setPostButtonDesign] = useState("font-semibold rounded-[30px] px-[20px] py-[5px] pl-[15px] text-[20px] hover:bg-dark-white hover:cursor-pointer");
  const [answerButtonDesign, setAnswerButtonDesign] = useState("font-semibold rounded-[30px] px-[20px] py-[5px] pl-[15px] text-[20px] hover:bg-dark-white hover:cursor-pointer");

  const formatDateTime = (dateTimeString) => {
    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };

    const date = new Date(dateTimeString);

    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    return `${formattedDate}`;
  };

  const profileNavButtonClick = (state) => {
    const defaultDesign = "font-semibold rounded-[12px] px-[20px] py-[3px] text-[14px] hover:bg-dark-white hover:cursor-pointer";
    switch (state) {
      case 'profile':
        setProfileButtonDesign('font-semibold rounded-[12px] bg-light-gold px-[20px] py-[3px] text-[14px] hover:bg-dark-gold hover:cursor-pointer');
        setActivityButtonDesign(defaultDesign);
        setSettingsButtonDesign(defaultDesign);
        setDisplaySection('profile');
        break;
      case 'activity':
        setActivityButtonDesign('font-semibold rounded-[12px] bg-light-gold px-[20px] py-[3px] text-[14px] hover:bg-dark-gold hover:cursor-pointer');
        setProfileButtonDesign(defaultDesign);
        setSettingsButtonDesign(defaultDesign);
        setDisplaySection('activity');
        break;
      case 'settings':
        setSettingsButtonDesign('font-semibold rounded-[12px] bg-light-gold px-[20px] py-[3px] text-[14px] hover:bg-dark-gold hover:cursor-pointer');
        setProfileButtonDesign(defaultDesign);
        setActivityButtonDesign(defaultDesign);
        setDisplaySection('settings');
        break;
      default:
        break;
    }
  }

  const activityNavButtonClicked = (state) => {
    const defaultDesign = "font-semibold w-full h-fit text-[20px] py-[5px] pl-[15px] rounded-[30px] hover:bg-dark-white hover:cursor-pointer";

    switch (state) {
      case 'summary':
        setSummaryButtonDesign("font-semibold w-full h-fit text-[20px] py-[5px] pl-[15px] rounded-[30px] bg-dark-white hover:cursor-pointer");
        setPostButtonDesign(defaultDesign);
        setAnswerButtonDesign(defaultDesign);
        setActivityButtonState('summary');
        break;
      case 'post':
        setPostButtonDesign("font-semibold w-full h-fit text-[20px] py-[5px] pl-[15px] rounded-[30px] bg-dark-white hover:cursor-pointer");
        setSummaryButtonDesign(defaultDesign);
        setAnswerButtonDesign(defaultDesign);
        setActivityButtonState('post');
        break;
      case 'answer':
        setAnswerButtonDesign("font-semibold w-full h-fit text-[20px] py-[5px] pl-[15px] rounded-[30px] bg-dark-white hover:cursor-pointer");
        setSummaryButtonDesign(defaultDesign);
        setPostButtonDesign(defaultDesign);
        setActivityButtonState('answer');
        break;
      default:
        break;
    }

  }

  const handleFollowingData = async (userIds) => {
    if (userIds.length > 0) {
      const followedList = await getUserByIds(userIds.join(','));

      setFollowedData(followedList.filter(user => user !== null));
    }
  }

  const handlePostData = async (postIds) => {
    if (postIds.length > 0) {
      const postList = await getPostByIds(postIds);

      setPostData(postList.filter(post => post !== null && post.state !== -1));
    }
  }

  const checkFollowedProfile = (followingList) => {
    if (followingList.includes(profileData.userId)) {
      setProfileFollowed(true);
    } else {
      setProfileFollowed(false);
    }
  }

  const viewProfile = (username) => {
    navigate(`/profile/${username}`);
  }

  const handleFetchUser = async (username) => {
    const user = await fetchUser(username);

    if (user !== "" && user.state !== -1) {
      setLoggedUser(user);
      checkFollowedProfile(user.following);
    }
  }

  const handleFollowButton = async (targetUsername) => {
    const followData = {
      "username": loggedUser.username,
      "targetUsername": targetUsername
    }

    const response = await followUser(followData);

    switch (response) {
      case 0:
        console.log("User or target user not found.");
        break;
      case 1:
        console.log("Successfully followed user.");
        notifyFollowedUser();
        break;
      case -1:
        console.log("User is already followed.");
        break;
      default:
        break;
    }
    
    window.location.reload();
  }

  const handleUnfollowButton = async (targetUsername) => {

    const unfollowData = {
      "username": loggedUser.username,
      "targetUsername": targetUsername
    }

    const response = await unfollowUser(unfollowData);

    switch (response) {
      case 0:
        console.log("User or target user not found.");
        break;
      case 1:
        console.log("Successfully unfollowed user.");
        break;
      case -1:
        console.log("User is already unfollowed.");
        break;
      default:
        break;
    }
    
    window.location.reload();
  }

  const notifyFollowedUser = async () => {
    const notifData = {
      "notificationType": "follow",
      "toUser": profileData.username,
      "fromUser": loggedUser.userId
    }

    const notification = await createNotif(notifData);

    if (notification !== "" && notification.state !== -1) {
      console.log("Successfully notified followed user.");
    } else {
      console.log("Failed to notify followed user.");
    }
  }

  useEffect(
    () => {
      const username = JSON.parse(window.localStorage.getItem('LOGGED_USER'));

      if (username !== null) {
        handleFetchUser(username);
        handleFollowingData(profileData.following);
        handlePostData(profileData.posts);
      } else {
        navigate('/login');
      }
    }, [profileData, answerList]
  )

  return (
    <div className="flex w-full h-full justify-center">
      <div className="flex flex-col h-full w-[70%]">
        <div className="flex justify-between w-full mt-[20px]">
          <div className="flex items-center">
            <img
              className="h-32 w-32 rounded-full object-cover"
              src={logo}
              alt={`${profileData.username}'s Avatar`}
            />
            <div className="flex flex-col items-start ml-[20px]">
              <h1 className="text-[30px] font-bold text-gray-800">{profileData.firstName} {profileData.lastName}</h1>
              <div className="flex items-center gap-[40px] text-[16px] border-b border-border-line pb-[10px]">
                <span>@{profileData.username}</span>

                <span>
                  <span className="font-bold">{profileData.followers.length} </span>
                  followers
                </span> 

                {loggedUser.username !== profileData.username &&
                  <>
                    {profileFollowed ? 
                      <button className="text-main-maroon font-semibold rounded-[30px] py-[2px] px-[15px] border border-main-maroon hover:cursor-pointer hover:bg-main-maroon hover:text-white"
                        onClick={() => handleUnfollowButton(profileData.username)}>
                        Following
                      </button>
                      :
                      <button className="text-white font-semibold rounded-[30px] py-[2px] px-[15px] bg-main-maroon hover:cursor-pointer hover:bg-light-maroon"
                        onClick={() => handleFollowButton(profileData.username)}>
                        Follow
                      </button>
                    }
                  </>
                }
              </div>
              <div className="flex items-center gap-[10px] mt-[10px]">
                <span className={profileButtonDesign}
                  onClick={ () => {profileNavButtonClick('profile')} }>Profile</span>
                <span className={activityButtonDesign}
                  onClick={ () => {profileNavButtonClick('activity')} }>Activity</span>
                {loggedUser.username === profileData.username &&
                  <span className={settingsButtonDesign}
                    onClick={ () => {profileNavButtonClick('settings')} }>Settings</span>
                }
              </div>
            </div>
          </div>

          {loggedUser.username === profileData.username &&
            <div className="flex h-full w-fit justify-start">
              <button className="text-[16px] font-semibold text-main-maroon py-[5px] px-[20px] border border-main-maroon rounded-[12px] hover:cursor-pointer hover:bg-main-maroon hover:text-white"
                onClick={ () => {profileNavButtonClick('settings')} }>
                Edit Profile
              </button>
            </div>
          }
        </div>

        <div className="flex w-full h-fit mt-[20px] mb-[20px]">
          {displaySection === 'profile' &&
            <div className="flex h-fit w-full justify-between">
              <div className="flex flex-col gap-[10px] h-fit w-[30%]">
                <span className="text-[20px] font-semibold">Stats</span>

                <div className="flex w-fit h-fit p-[20px] rounded-[12px] border border-border-line bg-lighter-white">
                  <ul className="list-none flex flex-col gap-[20px] w-fit h-fit">
                    <li className="flex w-fit h-fit gap-[100px]">
                      <span className="flex flex-col justify-start">
                        <span className="font-semibold">{profileData.posts.length}</span>
                        <span className="text-[14px]">posts</span>
                      </span>

                      <span className="flex flex-col justify-start">
                        <span className="font-semibold">{profileData.posts.length + profileData.answers.length + profileData.comments.length + profileData.upVotedPosts.length + 
                          profileData.downVotedPosts.length}</span>
                        <span className="text-[14px]">engagements</span>
                      </span>
                    </li>

                    <li className="flex w-fit h-fit gap-[50px]">
                      <span className="flex flex-col justify-start">
                        <span className="font-semibold">{profileData.answers.length}</span>
                        <span className="text-[14px]">answers</span>
                      </span>
                    </li>
                  </ul>
                </div>

              </div>
              
              <div className="flex flex-col gap-[40px] h-fit w-[60%]">
                <div className="flex flex-col gap-[10px] h-fit w-full">

                  <span className="text-[20px] font-semibold">About</span>
                  
                  <div className="flex w-full h-fit p-[20px] justify-center rounded-[12px] border border-border-line bg-lighter-white">
                    <span className="text-[14px] w-fit">
                      {loggedUser.username === profileData.username ? 
                        <>
                          You have not modified your about info. Want to add one?
                          <span className="text-main-maroon hover:cursor-pointer font-semibold hover:text-lighter-maroon"
                            onClick={() => {profileNavButtonClick('settings')}}> Edit profile.</span>
                        </>
                        :
                        <>
                          This user hasn't added any info yet. Check back later to learn more about them!
                        </>
                      }
                    </span>
                  </div>

                </div>

                <div className="flex flex-col gap-[10px] h-fit w-full">

                  <span className="text-[20px] font-semibold">Following</span>
                  
                  <div className="flex w-full h-fit p-[20px] justify-center rounded-[12px] border border-border-line bg-lighter-white">

                    {followedData.length > 0 ?
                      <ul className="grid grid-cols-2 gap-[20px] w-full h-fit justify-evenly">
                        {followedData.map(
                          (item, index) => {
                            return (
                              <li key={index} className="flex items-center justify-between w-full h-fit p-[10px] rounded-[12px] hover:bg-light-white hover:cursor-pointer"
                                onClick={() => viewProfile(item.username)}>
                                <div className="flex items-center gap-[10px]">
                                  <span className="w-fit h-fit">
                                    <img src={logo} alt={item.username + 's avatar'} width="60px" height="auto" className="rounded-full" />
                                  </span>

                                  <div className="flex flex-col text-[18px]">
                                    <span className="text-main-maroon font-semibold">{item.firstName} {item.lastName}</span>
                                    <span className="text-dark-gold">@{item.username}</span>
                                  </div>
                                </div>

                                <div className="flex flex-col text-[12px] items-end">
                                  <span>{item.posts.length + item.answers.length + item.upVotedPosts.length + item.downVotedPosts.length} engagements</span>
                                  <span>{item.posts.length} posts</span>
                                  <span>{item.answers.length} answers</span>
                                </div>
                              </li>
                            )
                          }
                        )}
                      </ul>
                      :
                      <span className="text-[14px] w-fit h-fit">
                        You havent followed anyone yet. Try following other users.
                      </span>
                    }

                  </div>

                </div>

              </div>
            </div>
          }

          {displaySection === "activity" &&
            <div className="flex h-fit w-full gap-[50px]">
              <div className="flex h-fit w-[20%]">
                <div className="flex w-full h-fit flex-col pr-[10px] border-r border-border-line">
                  <span className={summaryButtonDesign} onClick={() => {activityNavButtonClicked('summary')}}>Summary</span>
                  <span className={postButtonDesign} onClick={() => activityNavButtonClicked('post')}>Posts</span>
                  <span className={answerButtonDesign} onClick={() => activityNavButtonClicked('answer')}>Answers</span>
                </div>
              </div>

              <div className="flex flex-col gap-[10px] h-fit w-[60%]">
                {activityButtonState === "summary" &&
                  <>
                    <span className="text-[20px] font-semibold">Summary</span>

                    <div className="flex p-[20px] w-full h-fit justify-center rounded-[12px] border border-border-line bg-lighter-white">
                      <span className="text-[14px] w-fit h-fit">
                        {loggedUser.username === profileData.username ?
                          <>Explore and engage more to display your reputation.</>
                          :
                          <>Shh... the story is still unwritten. This user hasn't shared their journey yet.</>
                        }
                      </span>
                    </div>
                  </>
                }

                {activityButtonState === 'post' &&
                  <>
                    <span className="text-[20px] font-semibold">Posts</span>

                    <div className="flex w-full h-fit justify-center rounded-[12px] border border-border-line bg-lighter-white">
                      <ul className="flex flex-col w-full h-fit">
                        {postData.map(
                          (item, index) => {
                            return (
                              <li key={index} className="flex w-full h-fit justify-between items-center py-[10px] px-[20px] rounded-[12px] hover:cursor-pointer hover:bg-dark-white"
                                onClick={ () => {navigate(`/post/${item.postId}`)}}>
                                <span className="text-[16px]">{item.title}</span>

                                <div className="flex flex-col w-fit h-fit items-end text-[12px]">
                                  <span>{formatDateTime(item.creationDate)}</span>
                                  {item.answered !== 0 && 
                                    <span className="text-green-500 font-semibold">this post is answered</span>
                                  }
                                </div>
                              </li>
                            )
                          }
                        )}
                      </ul>
                    </div>
                  </>
                }

                {activityButtonState === 'answer' &&
                  <>
                    <span className="text-[20px] font-semibold">Answers</span>

                    <div className="flex w-full h-fit justify-center rounded-[12px] border border-border-line bg-lighter-white">
                      <ul className="flex flex-col w-full h-fit">
                        {answerList.map(
                          (item, index) => {
                            return (
                              <li key={index} className="flex w-full h-fit justify-between items-center py-[10px] px-[20px] rounded-[12px] hover:cursor-pointer hover:bg-dark-white"
                                onClick={ () => {navigate(`/post/${item.postId}`)}}>
                                <span className="text-[16px]">{item.content}</span>

                                <div className="flex flex-col w-fit h-fit items-end text-[12px]">
                                  <span>{formatDateTime(item.date)}</span>
                                  {item.mark === 1 && 
                                    <span className="text-green-500 font-semibold">marked as best answer</span>
                                  }
                                </div>
                              </li>
                            )
                          }
                        )}
                      </ul>
                    </div>
                  </>
                }
              </div>
            </div>
          }

          {loggedUser.username === profileData.username &&
            <>
              {displaySection === "settings" && <Settings profileData={loggedUser}/>}
            </>
          }
        </div>
      </div>
    </div>
  )
}