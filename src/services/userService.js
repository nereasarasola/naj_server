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

const cryptEntry = async (email) => {
    try {
        const cryptUser = User.cryptEntry(email);
        return cryptUser;
    } catch (error) {
        throw error;
    }
}

const getActiveAcolites = async() => {
    try {
        const activeAcolites = User.getActiveAcolites();
        return activeAcolites;
    } catch(error) {
        throw error;
    }
}

const getUserByEmail = async(email) => {
    try {
        const user = User.getUserByEmail(email);
        return user;
    } catch(error) {
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



module.exports = {
    createNewUser,
    cryptEntry,
    getActiveAcolites,
    getUserByEmail,
    patchUser, 
    updateAcoliteFatigueConcentration, 
    updateAcoliteState
};