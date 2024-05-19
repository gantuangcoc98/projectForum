import { useNavigate } from "react-router-dom"

export const Recommendations = ({latestData, mostViewData, loggedUser}) => {

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


    return (
        <div className="flex flex-col gap-[60px] items-center w-[30%] h-full">
            <div className="flex flex-col w-[80%] h-fit gap-[10px] rounded-[12px] p-[10px] mt-[61px] bg-lighter-white">
                <span className="font-semibold text-[20px]">Latest Posts</span>
                <ul>
                    {latestData.map(
                        (item, index) => {
                            return (
                                <li key={index}>
                                    <div className="flex justify-between w-full h-fit">
                                        <span className="text-[16px] w-full hover:underline hover:cursor-pointer"
                                            onClick={()=>viewPost(item.postId)}>
                                            {item.title}
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
                                            {item.title}
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
    )
}