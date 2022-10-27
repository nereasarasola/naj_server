const User = require("../database/User");

const createNewUser = async (idToken, newUser) => {
    try {
        const createdUser = User.loginUser(idToken, newUser);
        return createdUser;
    } catch (error) {
        throw error;
    }
};

const cryptEntry = async (email,changes) => {
    try {
        const cryptUser = User.cryptEntry(email,changes);
        return cryptUser;
    } catch (error) {
        throw error;
    }
};


module.exports = {createNewUser,cryptEntry}