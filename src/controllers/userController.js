const { application } = require("express");
const userService = require("../services/userService");
const admin = require('firebase-admin')
const {initializeApp, applicationDefault} =require ('firebase-admin/app');

const firebase = admin.initializeApp({
  
  credential: applicationDefault(),
   projectId: 'auth-cc-naj'
});

const createNewUser = async (req, res) => {
    const { idToken, name, email,avatar } = req.body;
    const authToken = await verify(idToken);
    if(authToken){
      if(!idToken){
        return res.status(400).send({
         status: "FAILED",
         data: {
           error:
             "Parameter idToken can not be empty",
         },
       });
     }
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
       avatar: avatar
     };
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
    else{
      res.send({
        status: "FAILED",
        message: "Token incorrect",
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

const updateMoneyandLife = async (req, res) => {
  const  {
    body,
    params:{email}

  } = req;
  if (!email || !life || !money) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body:'email'",
      },
    });
    
  }
  try {
    const updateMoneyandLife = await userService.updateMoneyandLife(email,body);
    res.send({  data: updateMoneyandLife });
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
    updateMoneyandLife
}
async function verify (token) {
  try {
   let decodedToken = await firebase.auth().verifyIdToken(token)
   return true
  } catch (e) {
   console.log(e)
   return false
  }
 }