const { application } = require("express");
const userService = require("../services/userService");
const admin = require('firebase-admin')
const {initializeApp, applicationDefault} =require ('firebase-admin/app');

const firebase = admin.initializeApp({
  
  credential: applicationDefault(),
   projectId:  'auth-cc-naj'
});

const createNewUser = async (req, res) => {
    const { idToken, name, email } = req.body;
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
     };
     try {
       const createdUser = await userService.createNewUser(idToken, newUser);
       res.send({ status: "OK", data: createdUser });
     } catch (error) {
       res.status(error?.status || 500).send({
         status: "FAILED",
         message: "Failed making the req: ",
         data: { error: error?.message || error },
       });
     }
    }
    res.send({
      status: "FAILED",
      message: "Token incorrect",
    });
    
}
  

module.exports = {
    createNewUser
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