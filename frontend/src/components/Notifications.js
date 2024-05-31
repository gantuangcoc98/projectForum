import { useEffect, useRef, useState } from "react";
import * as IoMdIcons from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { fetchUserById, formatDateTime } from "./Function";

export const Notifications = ({notificationData}) => {

    const [notificationsToggle, setNotificationsToggle] = useState(false);

    const notificationsRef = useRef(null);

    const navigate = useNavigate();

    const viewPost = (postId) => {
        navigate(`/post/${postId}`);
    }
    
    const viewProfile = async (userId) => {
        const user = await fetchUserById(userId);

        if (user !== "" && user.state !== -1) {
            navigate(`/profile/${user.username}`);
        }
    }

    useEffect(
        () => {

            const handleOutsideClick = (event) => {
                if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                    setNotificationsToggle(false);
                }  
            }

            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            }
        }, []
    )

    return (
        <div className="flex w-fit h-fit relative">
            <span className="text-[25px] hover:cursor-pointer hover:bg-dark-white rounded-full p-[5px]"
                onClick={() => setNotificationsToggle(!notificationsToggle)}>
                {notificationsToggle ? 
                <IoMdIcons.IoMdNotifications />
                :
                <IoMdIcons.IoMdNotificationsOutline />
                }
            </span>

            {notificationsToggle &&
                <div className="flex w-fit h-fit rounded-[12px] border border-border-line bg-lighter-white absolute top-full right-0" ref={notificationsRef}>
                    <ul className="flex flex-col h-[200px] w-[250px] overflow-y-auto">
                    {notificationData.map(
                        (item, index) => {
                        return (
                            <li key={index} className="flex gap-[10px] items-center p-[10px] w-full h-fit hover:cursor-pointer hover:bg-light-white rounded-[12px]"
                            onClick={() => {
                                if (item.notificationType === "follow") {
                                    viewProfile(item.fromUser);
                                } else {
                                    viewPost(item.postId);
                                }
                                }}>
                            <div className="flex flex-col gap-[10px]">
                                <span className="text-[14px] font-semibold">{item.content}</span>
                                <span className="text-[12px]">{formatDateTime(item.date)}</span>
                            </div>
                            </li>
                        )
                        }
                    )}
                    </ul>
                </div>
            }
        </div>
    )
}