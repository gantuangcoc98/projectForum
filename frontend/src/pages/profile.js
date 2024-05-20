import React, { useEffect, useState } from "react";
import { fetchUser, getAnswer } from "../components/Function";
import { Header } from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileContent } from "../components/ProfileContent";

export const Profile = () => {

  const navigate = useNavigate();

  const { username } = useParams();

  const [loggedUser, setLoggedUser] = useState({});

  const [profileData, setProfileData] = useState({});

  const [loginStatus, setLoginStatus] = useState(false);
  const [answerList, setAnswerList] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleFetchUser = async (username) => {
    const user = await fetchUser(username);

    if (user !== "") {
      setLoggedUser(user);
      setLoginStatus(true);
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
      setLoading(false);
    }
  }

  useEffect(
    () => {
      const _username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));
      
      if (_username !== null) {
        handleFetchUser(_username);
        handleFetchProfile(username);
      } else {
        navigate('/login');
      }
    }, [username]
  )

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-col w-full">

      <Header pageState={'profile'}/>

      <ProfileContent profileData = {profileData} answerList={answerList} />
    </div>
  );
};

export default Profile;
