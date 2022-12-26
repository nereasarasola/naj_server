const userService = require("../services/userService");
require('dotenv').config();
const {STATUS, MESSAGE, MISSING_NAME_EMAIL, INCORRENCT_EMAIL, AWAKE, MISSING_EMAIL} = require('../constants')

const createNewUser = async (req, res) => {
    const { idToken, name, email,avatar } = req.body;
     if (!name || !email) {
       return res.status(400).send({
         status: STATUS,
         data: {
           error: MISSING_NAME_EMAIL,
         },
       });
     }
     const newUser = {
       idToken: idToken,
       name: name,
       email: email,
       active: true,
       role: false,
       intoTheCryp: false,
       goldCoins: 29,
       livePoints: 100,
       avatar: avatar,
<<<<<<< HEAD
       socketID: null,
       fatigue: 100,
       concentration: 100,
       state: "awake"
=======
       socketID: "not_connected",
       fatigue: 100,
       concentration: 100,
       state: AWAKE
>>>>>>> 7da30ebcfc3adf7d9a7faac23b09489e753b4268
     };

    
    const user = newUser.email.endsWith('@ikasle.aeg.eus');
    const joshua = newUser.email.includes(process.env.ROL_JOSHUA);
    const mortimer = newUser.email.includes(process.env.ROL_MORTIMER);
      if(!user && !joshua && !mortimer) {
          return res.status(400).send({
            status: STATUS,
            data: {
              error:
                INCORRENCT_EMAIL,
            },
          });
      }
    
    
     try {
       const createdUser = await userService.createNewUser(email, newUser);
       res.send({  data: createdUser });
     } catch (error) {
       res.status(error?.status || 500).send({
         status: STATUS,
         message: MESSAGE,
         data: { error: error?.message || error },
       });
     } 
}
const cryptEntry = async (req, res) => {
  const  {
    body,
    params:{email}
  } = req;
  if (!email) {
    return res.status(400).send({
      status: STATUS,
      data: {
        error: MISSING_EMAIL
      },
    });
    
  }
  try {
    const userEntry = await userService.cryptEntry(email,body);
    res.send({  data: userEntry });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: STATUS,
      message: MESSAGE,
      data: { error: error?.message || error },
    });
  }
}

const getActiveAcolites = async (req, res) => {
  try {
    const acolites = await userService.getActiveAcolites();
    res.send({  data: acolites });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: STATUS,
      message: MESSAGE,
      data: { error: error?.message || error },
    });
  }
}


const getUserByEmail = async (req, res) => {
  const {email} = req.params;
  try {
    const user = await userService.getUserByEmail(email);
    res.send({ data: user});
  } catch(error) {
    res.status(error?.status || 500).send({
      status: STATUS,
      message: MESSAGE,
      data: { error: error?.message || error },
    });
  }
}

const patchUser = async (req, res) => {
  const  {
    body,
    params:{email}
  } = req;
  try {
    const patchUser = await userService.patchUser(email,body);
    res.send({  data: patchUser });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: STATUS,
      message: MESSAGE,
      data: { error: error?.message || error },
    });
  }
}
module.exports = {
    createNewUser,
    cryptEntry,
    getActiveAcolites,
    getUserByEmail,
    patchUser
}
