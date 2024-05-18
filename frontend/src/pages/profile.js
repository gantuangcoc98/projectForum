import React, { useEffect, useState } from "react";
import Profileheader from "../components/Profileheader";
import ProfileContent from "../components/ProfileContent";
import SideNavbar from "../components/SideNavbar";
import avatar from "../images/logo.png";
import { answerData } from "../sample-data/answerData";
// import { data as postdata } from "../sample-data/postdata";
// import { AnswerInput } from "../components/AnswerInput";
import { Answers } from "../components/Answers";
import { fetchUser, getAnswer } from "../components/Function";
import { Header } from "../components/Header";

export const Profile = () => {

  const username = "TestUser";

  const [answerData, setAnswerData] = useState([]);

  const [loggedUser, setLoggedUser] = useState({});

  const [loginStatus, setLoginStatus] = useState(false);

  const [answerList, setAnswerList] = useState([]);

  const inProfile = true;

  const handleFetchUser = async (username) => {
    const user = await fetchUser(username);

    if (user !== "") {
      setLoggedUser(user);
      setLoginStatus(true);
      handleFetchAnswerData(user.answers);
    } else {
      console.log("User not found.");
    }
  }

  const handleFetchAnswerData = async (idList) => {
    if (idList.length > 0) {

      const newAnswerList = await Promise.all(
        idList.map(async (answerId) => {
              const answer = await getAnswer(answerId);

              if (answer !== "" && answer.state !== -1) {
                  return {
                      "answerId": answer.answerId,
                      "content": answer.content,
                      "author": answer.author,
                      "username": answer.username,
                      "date": answer.answerDate,
                      "state": answer.state
                  };
              } else {
                  return null;
              }
          })
      );

      // Filter out null values
      setAnswerList(newAnswerList.filter(answer => answer !== null));

    }
  }

  useEffect(
    () => {
      if (loginStatus === false) {
        const username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));
  
        if (username !== null) {
          handleFetchUser(username);
        }
      }
    }, [loginStatus]
  )

  return (
    <div className="flex">
      <SideNavbar />
      <div className="flex flex-col w-full ml-64">
        {/* Adjusted margin to accommodate fixed sidebar */}

        <Profileheader avatarUrl={avatar} username={username}/>

        <Header inProfile={inProfile}/>

        <ProfileContent userData={loggedUser}/>
        <div className="main-content mt-10 px-4">
          {/* <div className="posts-section mb-10">
            <h3 className="text-xl font-semibold mb-2">Posts</h3>
            {postdata.map((post) => (
              <div
                key={post.postId}
                className="post p-4 border-b border-gray-200"
              >
                <h2 className="font-semibold text-xl">{post.title}</h2>
                <p className="text-gray-500 text-sm">
                  {post.nickname} - {post.date}
                </p>
                <p>{post.description}</p>
                <img src={post.img} alt={post.title} className="mt-2" />
              </div>
            ))}
          </div> */}

          <div className="answers-section mb-10">
            <h3 className="text-xl font-semibold mb-2">Answers</h3>
            {/* <AnswerInput user={user.username} /> */}

            <ul>
            {answerList.map(
              (item, index) => {
                return (
                  <li key={index} className="">
                    Post ID: {item.postId}
                    Content: {item.content}
                    Author: {item.author}
                  </li>
                )
              }
            )
            }
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
