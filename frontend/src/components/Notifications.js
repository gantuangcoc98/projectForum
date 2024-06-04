import { useEffect, useRef, useState } from "react";
import * as IoMdIcons from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { fetchUserById, fetchUserNotifications, formatDateTime } from "./Function";
import '../App.css';
import axios from "axios";

export const Notifications = ({userId}) => {

    const [loading, setLoading] = useState(true);

    const [notificationsToggle, setNotificationsToggle] = useState(false);

    const [unreadNotif, setUnreadNotif] = useState(false);

    const [unreadNotifCount, setUnreadNotifCount] = useState(0);

    const notificationsRef = useRef(null);

    const [_notificationData, setNotificationData] = useState([]);

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

    const checkNotifData = (list) => {

        let count = 0;

        list.forEach(notification => {
            if (notification.state === 0) {
                count += 1;
            }
        });

        if (count > 0) {
            setUnreadNotif(true);
            setUnreadNotifCount(count);
        } else {
            setUnreadNotif(false);
        }

        setLoading(false);
    }

    const handleNotifOnClick = async () => {
        setNotificationsToggle(!notificationsToggle);

        if (unreadNotif) {

            _notificationData.forEach(async notif => {
                if (notif.state === 0) {
                    const response = await axios.put(`http://localhost:8080/notification?notifId=${notif.notificationId}`);

                    console.log(response.data + " ==> " + notif.notificationId);
                }
            });

            setUnreadNotif(false);
        }
    }

    const fetchNotificationData = async (userId) => {

        const updatedNotifData = await fetchUserNotifications(userId);

        checkNotifData(updatedNotifData);

        setNotificationData(updatedNotifData);

    }

    useEffect(
        () => {
            if (loading) fetchNotificationData(userId);

            const handleOutsideClick = (event) => {
                if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                    setNotificationsToggle(false);
                }  
            }

            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            }
        }, [loading]
    )

    useEffect(
        () => {
            if (!notificationsToggle) fetchNotificationData(userId);
        }, [notificationsToggle]
    )

    return (
        <div className="flex w-fit h-fit relative">
            <span className="text-[30px] hover:cursor-pointer hover:bg-dark-white rounded-full p-[5px]"
                onClick={() => handleNotifOnClick()}>
                {notificationsToggle ? 
                    <IoMdIcons.IoMdNotifications />
                    :
                    <>
                        {unreadNotif && 
                            <span className="flex absolute w-[15px] h-[15px] top-[5px] right-[5px] rounded-full bg-red-500 text-[12px] items-center justify-center text-white font-semibold">
                                {unreadNotifCount}
                            </span>
                        }
                        <IoMdIcons.IoMdNotificationsOutline />
                    </>
                }
            </span>

            {notificationsToggle &&
                <div className="flex w-fit h-fit border border-border-line bg-lighter-white absolute top-full right-0" ref={notificationsRef}>
                    {loading ?
                        <div className="flex justify-center w-[300px] h-fit py-[10px]">
                            <span>Loading...</span>
                        </div>
                        :
                        <ul className="flex flex-col h-[250px] w-[300px] overflow-y-auto">
                            {_notificationData.map(
                                (item, index) => {
                                return (
                                    <li key={index} 
                                        className={item.state === 0 ? 
                                            "flex gap-[10px] items-center p-[10px] w-full h-fit hover:cursor-pointer hover:bg-dark-white border-b border-border-line"
                                            :
                                            "flex gap-[10px] items-center p-[10px] w-full h-fit hover:cursor-pointer hover:bg-dark-white border-b border-border-line bg-light-white"}
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
                    }
                </div>
            }
        </div>
    )
}