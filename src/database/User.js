const User = require('../models/userModel');
require('dotenv').config();

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
};
  const cryptEntry = async(email,changes) =>{
    const user = await User.findOne({ email: email });
    console.log(email);
    console.log(user);
    if(!user)
    return "Error 404"
    else{
      changes.intoTheCryp=!user.intoTheCryp;
        const updatedUser = await User.findOneAndUpdate({email:email},
          {$set: changes},
          {new:true}
        );
        return updatedUser;
    }
  }
  const allActiveUsers= async()=>{
    const all = User.find({role: false});
    return all;
  }

  const patchUser= async(email,changes)=>{
    const user = await User.findOne({ email: email });
    if(!user)
    return "Error 404"
    else {
      console.log(changes);
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
        {role:false , state: 'sleep'},
        {
          $inc: {
            fatigue: 10,
            concentration: 10
          },
        },
      );
      const usersAwake = await User.updateMany(
        {role:false , state: 'awake', state: 'exhausted' },
        {
          $inc: {
            fatigue: -10,
            concentration: -10
          },
        },
      );
    } catch (error) {
        throw error;
    }
}
const updateAcoliteState = async()=>{
  try {
    const usersExhausted = await User.updateMany(
      {role:false , state: 'awake', fatigue:20},
      {
        state: 'exhausted'
      },
    );
    const usersFainted = await User.updateMany(
      {role:false , state: 'exhausted', fatigue:10},
      {
        state: 'fainted'
      },
    );
  } catch (error) {
      throw error;
  }
}
module.exports = {
    loginUser,
    cryptEntry,
    allActiveUsers,
    patchUser,
    updateAcoliteFatigueConcentration,
    updateAcoliteState
};