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

export {
    getCurrentDate, registerUser, loginUser
}