const getCurrentDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

const findUser = (username) => {
    let user = null;
    
    const accounts = JSON.parse(window.localStorage.getItem("accounts"));
    accounts.forEach(account => {
        if (account.username === username) {
            user = account;
        }
    });

    return user;
}

const userExist = (username) => {
    let userFound = false;
    const accounts = window.localStorage.getItem("accounts") || [];

    accounts.forEach(account => {
        if (account.username === username) {
            userFound = true;
        }
    });

    return userFound;
}

const registerAccount = (account) => {
    const accounts = window.localStorage.getItem("accounts") || [];
    accounts.push(account);
    window.localStorage.setItem("accounts", JSON.stringify(accounts));
}

const authorizeLogin = (username) => {
    window.localStorage.setItem("logged_user", JSON.stringify(username));
}

export {
    getCurrentDate, registerAccount, userExist, findUser, authorizeLogin
}