import axios from 'axios';

const getCurrentDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
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

const getLocalUser = () => {
    const user = JSON.parse(window.localStorage.getItem("LOGGED_USER"));

    return user;
}

export {
    getCurrentDate, registerUser, loginUser, fetchUser, createPost, getPost, getAllPosts, deletePost, updatePost, createAnswer,
    getAnswer, getLocalUser, deleteAnswer, updateAnswer
}