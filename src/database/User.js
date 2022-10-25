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
  const cryptEntry = async(email) =>{
    const user = await User.findOne({ email: email });
    if(!user)
    return "Error 404"
  }
  
module.exports = {
    loginUser,
};