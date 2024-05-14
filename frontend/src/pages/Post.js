import SideBar from "../components/SideBar";
import { useEffect, useRef, useState } from "react";
import profile from "../images/logo.png";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../sample-data/postdata";
import { answerData } from "../sample-data/answerData";
import { commentData } from "../sample-data/commentData";
import { CommentInput } from "../components/CommentInput";
import { AnswerInput } from "../components/AnswerInput";
import { Answers } from "../components/Answers";
import { Comments } from "../components/Comments";

export const Post = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [loggedUser, setLoggedUser] = useState({});

  const [postData, setPostData] = useState({});

  const [answerToggle, setAnswerToggle] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);

  const [upVote, setUpVote] = useState("text-black");
  const [downVote, setDownVote] = useState("text-black");
  const [comments, setComments] = useState("text-black");
  const [upVoteBackground, setUpVoteBackground] = useState("bg-transparent");
  const [downVoteBackground, setDownVoteBackground] =
    useState("bg-transparent");
  const [commentsBackground, setCommentsBackground] =
    useState("bg-transparent");

  const [showAnswers, setShowAnswers] = useState(true);

  const commentRef = useRef(null);

  useEffect(() => {
    const _user = {
      userId: 1,
      name: "Christian",
      username: "krstng02k",
    };

    setLoggedUser(_user);
    setPostData(data[parseInt(postId) - 1]);
  }, [postId]);

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
    switch (state) {
      case "answers":
        setShowAnswers(true);
        setCommentToggle(false);
        break;
      case "comments":
        setShowAnswers(false);
        setAnswerToggle(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SideBar />

      <div className="flex w-full h-full pl-[25%]">
        <div className="w-[70%] h-full">
          <div className="flex w-full gap-[30px] h-[61px] items-center justify-start pl-[20px] border border-border-line bg-light-white">
            <span
              className="text-[16px] p-[10px] rounded-[50%] hover:bg-dark-white hover:cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <FaIcons.FaArrowLeft />
            </span>
            <span className="text-[20px] font-semibold">Post</span>
          </div>

          <div className="flex flex-col w-full h-full border-r border-l border-b border-border-line">
            <div className="flex gap-[10px] w-full h-fit p-[10px]">
              <span className="w-fit h-fit hover:cursor-pointer hover:opacity-80">
                <img src={profile} alt="profile" width="250px" />
              </span>

              <div className="flex flex-col gap-[5px] h-full text-[18px]">
                <div className="flex gap-[5px]">
                  <span className="font-semibold text-main-maroon hover:underline hover:cursor-pointer">
                    {postData.nickname}
                  </span>
                  <span className="font-light text-dark-gold hover:cursor-pointer">
                    {"@" + postData.username}
                  </span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-end justify-between">
                    <span className="font-semibold text-[20px]">
                      {postData.title}
                    </span>
                  </div>
                  <span>{postData.description}</span>
                </div>

                <div className="flex gap-[5px] items-center text-gray-500">
                  <span className="text-[9px]">
                    <FaIcons.FaCircleNotch />
                  </span>
                  <span className="text-[15px]">{postData.date}</span>
                  <span className="text-[9px]">
                    <FaIcons.FaCircleNotch />
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full pl-[20px] pr-[20px] mb-[10px] h-fit">
              <div className="flex pt-[5px] pb-[5px] pl-[10px] pr-[10px] items-center justify-between border-t border-b border-border-line">
                <span
                  className={
                    "flex gap-[5px] items-center p-[5px] rounded-[12px] text-[20px] h-full w-fit hover:cursor-pointer " +
                    upVote
                  }
                  onMouseEnter={() => iconMouseEnter("up")}
                  onMouseLeave={() => iconMouseLeave("up")}
                >
                  <span className={upVoteBackground}>
                    <BiIcons.BiUpvote />
                  </span>
                  <span className="w-fit h-fit text-[16px]">25</span>
                </span>
                <span
                  className={
                    "flex gap-[5px] items-center p-[5px] rounded-[12px] text-[20px] h-full w-fit hover:cursor-pointer " +
                    downVote
                  }
                  onMouseEnter={() => iconMouseEnter("down")}
                  onMouseLeave={() => iconMouseLeave("down")}
                >
                  <span className={downVoteBackground}>
                    <BiIcons.BiDownvote />
                  </span>
                  <span className="w-fit h-fit text-[16px]">25</span>
                </span>
                <span
                  className={
                    "flex gap-[5px] items-center p-[5px] rounded-[12px] text-[20px] h-full w-fit hover:cursor-pointer " +
                    comments
                  }
                  onMouseEnter={() => iconMouseEnter("comments")}
                  onMouseLeave={() => iconMouseLeave("comments")}
                  onClick={() => openComment()}
                >
                  <span className={commentsBackground}>
                    <BiIcons.BiComment />
                  </span>
                  <span className="w-fit h-fit text-[16px]">69</span>
                </span>
                <span
                  className="flex items-center w-fit h-fit p-[5px] text-[20px] rounded-[12px] bg-light-gold hover:bg-dark-gold hover:cursor-pointer"
                  onClick={() => openAnswer()}
                >
                  <MdIcons.MdLightbulbOutline />
                  <span className="text-[16px]">Answer</span>
                </span>
              </div>
            </div>

            {answerToggle && <AnswerInput user={loggedUser} />}

            <div className="flex justify-evenly w-full h-[50px] text-[16px] border-t border-border-line">
              <div
                className="flex justify-center w-[50%] h-full hover:bg-dark-white hover:cursor-pointer"
                onClick={() => display("answers")}
              >
                <div className="flex flex-col justify-center w-fit h-full relative">
                  <span className={showAnswers ? "font-semibold" : ""}>
                    Answers
                  </span>
                  {showAnswers && (
                    <div className="h-[5px] w-full bg-main-maroon rounded-[12px] absolute bottom-0" />
                  )}
                </div>
              </div>
              <div
                className="flex justify-center w-[50%] h-full hover:bg-dark-white hover:cursor-pointer"
                onClick={() => display("comments")}
              >
                <div className="flex flex-col justify-center w-fit h-full relative">
                  <span className={!showAnswers ? "font-semibold" : ""}>
                    Comments
                  </span>
                  {!showAnswers && (
                    <div className="h-[5px] w-full bg-main-maroon rounded-[12px] absolute bottom-0" />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-fit" ref={commentRef}>
              {commentToggle && <CommentInput user={loggedUser} />}

              <ul className="flex flex-col w-full h-fit">
                {showAnswers ? (
                  <Answers data={answerData} />
                ) : (
                  <Comments data={commentData} />
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-[61px] w-[30%] h-full"></div>
      </div>
    </>
  );
};
