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
const getAllAcolites = async() =>{
    try {
        const allActiveUsers = User.getAllAcolites();
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
const updateAcoliteFatigueConcentration = async()=>{
    try {
        const updateAcoliteFatigueConcentration = User.updateAcoliteFatigueConcentration();
        return updateAcoliteFatigueConcentration;
    } catch (error) {
        throw error;
    }
}

const updateAcoliteState = async()=>{
    try {
        const updateAcoliteState = User.updateAcoliteState();
        return updateAcoliteState;
    } catch (error) {
        throw error;
    }
}



module.exports = {createNewUser,cryptEntry,getAllAcolites,patchUser, updateAcoliteFatigueConcentration, updateAcoliteState}