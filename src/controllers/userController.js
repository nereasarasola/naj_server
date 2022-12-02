const { application } = require("express");
const userService = require("../services/userService");
require('dotenv').config();

const createNewUser = async (req, res) => {
    const { idToken, name, email,avatar } = req.body;
     if (!name || !email) {
       return res.status(400).send({
         status: "FAILED",
         data: {
           error:
             "One of the following keys is missing or is empty in request body: 'name', 'mail'",
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
       socketID: null,
       fatigue: 100,
       concentration: 100,
       state: "awake"
     };

    const user = newUser.email.endsWith('@ikasle.aeg.eus');
    const joshua = newUser.email.includes(process.env.ROL_JOSHUA);
    const mortimer = newUser.email.includes(process.env.ROL_MORTIMER);
      if(!user && !joshua && !mortimer ) {
          return res.status(400).send({
            status: "FAILED",
            data: {
              error:
                "Incorrect email",
            },
          });
      }
    
    
     try {
       const createdUser = await userService.createNewUser(email, newUser);
       res.send({  data: createdUser });
     } catch (error) {
       res.status(error?.status || 500).send({
         status: "FAILED",
         message: "Failed making the req: ",
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
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body:'email'",
      },
    });
    
  }
  try {
    const userEntry = await userService.cryptEntry(email,body);
    res.send({  data: userEntry });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
}

const allActiveUsers= async (req, res) => {
  try {
    const allActiveUsers = await userService.allActiveUsers();
    res.send({  data: allActiveUsers });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
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
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
}
module.exports = {
    createNewUser,
    cryptEntry,
    allActiveUsers,
    patchUser
}
