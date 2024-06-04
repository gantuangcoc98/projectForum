import { useNavigate } from "react-router-dom";
import { Notifications } from "./Notifications";

export const Recommendations = ({latestData, mostViewData, loggedUser, notificationData}) => {

    const navigate = useNavigate();

    const viewPost = (postId) => {
        navigate(`/post/${postId}`);
    }

    const viewProfile = (username) => {
        if (username === loggedUser.username) {
            navigate('/profile');
        } else {
            navigate(`/profile/${username}`);
        }
    }

    const displayShorterTitle = (string) => {
        let words = string.split(' ');

        if (words.length > 5) {
            const trimmedWords = words.slice(0, 5);
            const result = trimmedWords.join(' ');

            return result + '...';
        }

        return string;
    }

    return (
        <div className="flex flex-col w-[30%] h-full">
            <div className="flex w-full h-[61px] items-center justify-end pr-[25px]">
                <Notifications notificationData={notificationData}/>
            </div>

            <div className="flex flex-col gap-[60px] w-full items-center">
                <div className="flex flex-col w-[80%] h-fit gap-[10px] rounded-[12px] p-[10px] bg-lighter-white">
                    <span className="font-semibold text-[20px]">Latest Posts</span>
                    <ul>
                        {latestData.map(
                            (item, index) => {
                                return (
                                    <li key={index}>
                                        <div className="flex justify-between w-full h-fit">
                                            <span className="text-[16px] w-full hover:underline hover:cursor-pointer"
                                                onClick={()=>viewPost(item.postId)}>
                                                {displayShorterTitle(item.title)}
                                            </span>
                                            <span className="text[14px] hover:cursor-pointer hover:text-light-gold"
                                                onClick={() => viewProfile(item.postUsername)}>
                                                {'@' + item.postUsername}
                                            </span>
                                        </div>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </div>

                <div className="flex flex-col w-[80%] h-fit gap-[10px] rounded-[12px] p-[10px] bg-lighter-white">
                    <span className="font-semibold text-[20px]">Most Views</span>
                    <ul>
                        {mostViewData.map(
                            (item, index) => {
                                return (
                                    <li key={index}>
                                        <div className="flex justify-between w-full h-fit">
                                            <span className="text-[16px] w-full hover:underline hover:cursor-pointer"
                                                onClick={()=>viewPost(item.postId)}>
                                                {displayShorterTitle(item.title)}
                                            </span>
                                            <span className="text[14px] hover:cursor-pointer hover:text-light-gold"
                                                onClick={() => viewProfile(item.postUsername)}>
                                                {'@' + item.postUsername}
                                            </span>
                                        </div>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}