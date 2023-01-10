const User = require('../models/userModel');
require('dotenv').config();
const {ERROR404, AWAKE, EXHAUSTED, FAINTED, SLEEP} = require('../constants')

const loginUser = async (email, newUser) => {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        let userToInsert = new User(newUser);
        const createdUser = await userToInsert.save();
        return createdUser;
      }
      if (!user.active) {
        const updatedUser = await User.findOneAndUpdate(
          { idToken: idToken },
          { active: true },
        );
        return updatedUser;
      }
      if(user.email === process.env.ROL_MORTIMER && user.email === process.env.ROL_JOSHUA) {
        const updateUser = await User.findOneAndUpdate(
          { email: email },
          { role: true },
        );
        return updateUser;
      }
      return user;
    } catch (error) {
        throw error;
    }
}

const cryptEntry = async(email) =>{
  const user = await User.findOne({ email: email });
  if(!user)
  return ERROR404
  else{
    let changes = !user.intoTheCrypt;
      const updatedUser = await User.findOneAndUpdate({email:email},
        {$set: {intoTheCrypt: changes}},
        {new:true}
      );
    return updatedUser;
  }
}

//Get all the acolites that are active
const getActiveAcolites = async()=>{
  const activeAcolites = User.find({ $and: [
    {role: false}, {active: true} 
  ]})
  return activeAcolites;
}

const getActiveAdminsSocket = async()=>{
  const activeAdmins = User.find({ $and: [
    {role: true}, {active: true} 
  ]})
  let socketId=[]
  activeAdmins.map(item => {
    socketId.push(item.socketId);
  })
  return socketId;
}

const getUserByEmail = async(email) => {
  const user = await User.findOne({ email: email });
  if (!user) return ERROR404
  else {
    return user;
  }

}

const patchUser= async(email,changes)=>{
  const user = await User.findOne({ email: email });
  if(!user)
  return ERROR404
  else {
    const patcheduser = await User.findOneAndUpdate({email:email},
      {$set: changes},
      {new:true}
    );
    return patcheduser;
  
  }
}

const updateAcoliteFatigueConcentration = async()=>{
  try {
    const usersSleep = await User.updateMany(
      {role:false , state: SLEEP, fatigue: {$lt: 100}},
      { $inc: { fatigue: 10, concentration: 10}},);

    const usersAwake = await User.updateMany( 
      {role: false, state: AWAKE, fatigue: {$gt: 20}},
      { $inc: { fatigue: -10, concentration: -10}});

    const userExhausted = await User.updateMany(
      {role: false, state: EXHAUSTED, $eq: {fatigue: 20}},
      { $inc: { fatigue: -10, concentration: -10}});
  } catch (error) {
      throw error;
  }
}



const updateAcoliteState = async()=>{
  try {
    const usersExhausted = await User.updateMany(
      {role:false, fatigue:20},
      {state: EXHAUSTED},);
    const usersFainted = await User.updateMany(
      {role:false, fatigue:10},
      {state: FAINTED},);
    return usersExhausted;
  } catch (error) {
      throw error;
  }

}

module.exports = {

    loginUser,
    cryptEntry,
    getActiveAcolites,
    getActiveAdminsSocket,
    getUserByEmail,
    patchUser,
    updateAcoliteFatigueConcentration,
    updateAcoliteState,

};