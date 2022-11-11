const User = require("../database/User");
require('dotenv').config();

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
const allActiveUsers = async() =>{
    try {
        const allActiveUsers = User.allActiveUsers();
        return allActiveUsers;
    } catch (error) {
        throw error;
    }
}
const patchUser = async(email,changes)=>{
    try {
        const patchUser = User.patchUser(email,changes);
        return patchUser;
    } catch (error) {
        throw error;
    }
}


module.exports = {createNewUser,cryptEntry,allActiveUsers,patchUser}