import React, { useEffect, useState } from "react";
import { fetchUser, getAnswer } from "../components/Function";
import { Header } from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileContent } from "../components/ProfileContent";
import * as MdIcons from "react-icons/md";

export const Profile = () => {

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { username } = useParams();

  const [loggedUser, setLoggedUser] = useState({});

  const [profileData, setProfileData] = useState({});

  const [answerList, setAnswerList] = useState([]);

  const [profileNotFound, setProfileNotFound] = useState(false);

  const handleFetchUser = async (username) => {
    const user = await fetchUser(username);

    if (user !== "") {
      setLoggedUser(user);
    } else {
      console.log("User not found.");
    }
  };

  const handleFetchAnswerData = async (idList) => {
    if (idList.length > 0) {
      const newAnswerList = await Promise.all(
        idList.map(async (answerId) => {
          const answer = await getAnswer(answerId);

              if (answer !== "" && answer.state !== -1) {
                  return {
                      "answerId": answer.answerId,
                      "postId": answer.postId,
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

      setAnswerList(newAnswerList.filter(answer => answer !== null));

    }
  };

  const handleFetchProfile = async (username) => {
    const user = await fetchUser(username);

    if (user !== "" && user.state !== -1) {
      setProfileData(user);
      handleFetchAnswerData(user.answers);
    } else {
      setProfileNotFound(true);
    }

    setLoading(false);
  }

  useEffect(
    () => {
      if (loading) {
        const _username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));
        
        if (_username !== null) {
          handleFetchUser(_username);
          handleFetchProfile(username);
        } else {
          navigate('/login');
        }
      }
    }, [loading]
  )

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <span className="font-semibold">Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <Header pageState={'profile'} userId={loggedUser.userId}/>
      
      {profileNotFound ? 
        <div className="flex justify-center mt-[20px]">
          <div className="flex w-[70%] h-fit gap-[10px] justify-center items-center">
            <span className="text-[100px]"><MdIcons.MdOutlinePersonOff /></span>

            <div className="flex flex-col items-start">
              <div className="flex w-fit h-fit gap-[10px] items-center">
                <span className="text-[40px] font-semibold">Profile not found</span>
              </div>

              <div className="flex flex-col w-fit h-fit gap-[5px]">
                <span>Try one of these following:</span>
                <ul className="flex flex-col list-disc ml-[20px]">
                  <li>
                    Go to 
                    <span className="text-main-maroon hover:cursor-pointer hover:text-lighter-maroon"
                      onClick={() => {navigate('/home')}}> home page.</span>
                  </li>
                  <li>
                    View your
                    <span className="text-main-maroon hover:cursor-pointer hover:text-lighter-maroon"
                      onClick={() => {
                        navigate(`/profile/${loggedUser.username}`);
                        window.location.reload();
                        }}> profile.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        :
        <ProfileContent profileData = {profileData} answerList={answerList} />
      }
    </div>
  );
};

export default Profile;
