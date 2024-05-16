import React from "react";
import Profileheader from "../components/Profileheader";
import ProfileContent from "../components/ProfileContent";
import SideNavbar from "../components/SideNavbar";
import avatar from "../images/logo.png";
import { answerData } from "../sample-data/answerData";
// import { data as postdata } from "../sample-data/postdata";
// import { AnswerInput } from "../components/AnswerInput";
import { Answers } from "../components/Answers";

export const Profile = () => {
  const user = { username: "John Doe" };
  return (
    <div className="flex">
      <SideNavbar />
      <div className="flex flex-col w-full ml-64">
        {/* Adjusted margin to accommodate fixed sidebar */}
        <Profileheader avatarUrl={avatar} />
        <ProfileContent />
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
              <Answers data={answerData} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
