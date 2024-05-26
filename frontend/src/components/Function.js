import axios from 'axios';

const formatDateTime = (dateTimeString) => {
    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    const date = new Date(dateTimeString);

    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    return `${formattedDate} ${formattedTime}`;
};

export const sortPostsByDate = (posts, ascending = true) => {
    return posts.sort((a, b) => {
        const dateA = new Date(a.creationDate);
        const dateB = new Date(b.creationDate);
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

const getLocalUser = () => {

    const username = JSON.parse(window.localStorage.getItem("LOGGED_USER"));

    return username;

}

const registerUser = async (userData) => {
    try {
        const response = await axios.post("http://localhost:8080/registerUser", userData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const loginUser = async (userCredentials) => {
    try {
        const response = await axios.post(`http://localhost:8080/login`, userCredentials);

        return response.data;
    } catch (error) {
        console.error("Error:", error)
    }
}

const fetchUser = async (username) => {
    try {
        const response = await axios.get(`http://localhost:8080/getUser?username=${username}`);

        if (response.data != null) {
            return response.data;
        }

        console.log("Failed to fetch get request getUser?username");
        return null;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const fetchUserById = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8080/user?userId=${userId}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const getUserByIds = async (userIds) => {
    try {
        const response = await axios.get(`http://localhost:8080/getUserByIds?userIds=${userIds}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const updateUser = async (userData) => {
    try {
        const response = await axios.put("http://localhost:8080/updateUser", userData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const followUser = async (followData) => {
    try {
        const response = await axios.put("http://localhost:8080/followUser", followData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const unfollowUser = async (followData) => {
    try {
        const response = await axios.put("http://localhost:8080/unFollowUser", followData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}


// START OF Post Model CRUD
const createPost = async (postData) => {
    try {
        const response = await axios.post("http://localhost:8080/createPost", postData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const updatePost = async (postData) => {
    try {
        const response = await axios.put("http://localhost:8080/updatePost", postData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const getPost = async (postId) => {
    try {
        const response = await axios.get(`http://localhost:8080/getPost?postId=${postId}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const getPostByIds = async (postIds) => {
    try {
        const response = await axios.get(`http://localhost:8080/getPostByIds?postIds=${postIds.join(',')}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const getFollowedPost = async (userIds) => {
    try {
        const response = await axios.get(`http://localhost:8080/getFollowedPost?userIds=${userIds.join(',')}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const getAllPosts = async () => {
    try {
        const response = await axios.get("http://localhost:8080/getAllPosts");

        return response.data;
    } catch (error) {
        console.error("Error:", error)
    }
}

const deletePost = async (postId) => {
    try {
        const response = await axios.put(`http://localhost:8080/deletePost?postId=${postId}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const votePost = async (voteData) => {
    try {
        const response = await axios.put("http://localhost:8080/votePost", voteData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const incrementViews = async (postId) => {
    try {
        const response = await axios.put(`http://localhost:8080/incrementViews?postId=${postId}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
// END OF Post Model CRUD


// START OF Answer Model CRUD
const createAnswer = async (answerData) => {
    try {
        const response = await axios.post("http://localhost:8080/createAnswer", answerData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const updateAnswer = async (answerData) => {
    try {
        const response = await axios.put("http://localhost:8080/updateAnswer", answerData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const getAnswer = async (answerId) => {
    try {
        const response = await axios.get(`http://localhost:8080/getAnswer?answerId=${answerId}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const deleteAnswer = async (answerId) => {
    try {
        const response = await axios.put(`http://localhost:8080/deleteAnswer?answerId=${answerId}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
// END OF Answer Model CRUD


// START OF Comment Model CRUD
const createComment = async (commentData) => {
    try {
        const response = await axios.post("http://localhost:8080/createComment", commentData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const getComment = async (commentId) => {
    try {
        const response = await axios.get(`http://localhost:8080/getComment?commentId=${commentId}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

const deleteComment = async (commentId) => {
    try {
        const response = await axios.put(`http://localhost:8080/deleteComment?commentId=${commentId}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
// END OF Comment Model CRUD

// START OF Notification Model CRUD
export const createNotif = async (notifData) => {
    try {
        const response = await axios.post(`http://localhost:8080/notification`, notifData);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const getNotificationsOf = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8080/notification?userId=${userId}`);

        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}
// END OF Notification Model CRUD

export {
    formatDateTime, registerUser, loginUser, fetchUser, createPost, getPost, getAllPosts, deletePost, updatePost, createAnswer,
    getAnswer, deleteAnswer, updateAnswer, createComment, getComment, deleteComment, getLocalUser, votePost, incrementViews,
    getFollowedPost
}