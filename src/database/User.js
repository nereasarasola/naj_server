const User = require('../models/userModel');


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
        const updatedUser = await User.findOneAndUpdate(email,
          {$set: changes},
          {new:true}
        );
        return updatedUser;
    }
  }
  const allActiveUsers= async()=>{
    const all = User.find({})
    return all;
  }
  
module.exports = {
    loginUser,
    cryptEntry,
    allActiveUsers
};