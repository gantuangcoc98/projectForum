import React, { useEffect, useState } from "react";
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
  const [activeSection, setActiveSection] = useState("posts"); // State to manage active section

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
  };

  const handleFetchAnswerData = async (idList) => {
    if (idList.length > 0) {
      const newAnswerList = await Promise.all(
        idList.map(async (answerId) => {
          const answer = await getAnswer(answerId);

          if (answer !== "" && answer.state !== -1) {
            return {
              answerId: answer.answerId,
              content: answer.content,
              author: answer.author,
              username: answer.username,
              date: answer.answerDate,
              state: answer.state,
            };
          } else {
            return null;
          }
        })
      );

      // Filter out null values
      setAnswerList(newAnswerList.filter((answer) => answer !== null));
    }
  };

  useEffect(() => {
    if (loginStatus === false) {
      const username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));

      if (username !== null) {
        handleFetchUser(username);
      }
    }
  }, [loginStatus]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "posts":
        return <div>Posts content goes here</div>; // Replace with actual posts content
      case "answers":
        return (
          <ul>
            {answerList.map((item, index) => (
              <li key={index} className="">
                Post ID: {item.postId}
                Content: {item.content}
                Author: {item.author}
              </li>
            ))}
          </ul>
        );
      case "tags":
        return <div>Tags content goes here</div>; // Replace with actual tags content
      default:
        return null;
    }
  };
  return (
    <div className="flex">
      <div className="flex flex-col w-full ml-0">
        <Header inProfile={inProfile} />
        <ProfileContent userData={loggedUser} />
        <div className="main-content mt-10 px-4">
          <div className="answers-section mb-10">
            <SideNavbar setActiveSection={setActiveSection} />
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
