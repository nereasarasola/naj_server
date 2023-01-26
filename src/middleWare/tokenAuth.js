const admin = require('firebase-admin')
const {applicationDefault} = require ('firebase-admin/app');
const {PROJECT_ID, STATUS, INCORRENCT_TOKEN, INCORRECT_DATA} = require('../constants')

const firebase = admin.initializeApp ({
  credential: applicationDefault(),
  projectId:  PROJECT_ID
});

// async function verifyUser (req, res, next) {
//   const {email,name,avatar}= req.body;
//   try {
//     const newUser = await firebase.auth().createUser({
//       email: email,
//       displayName:name,
//       photoURL: avatar
//     })      
//     if (newUser) return next();
//   } catch (error) {
//     console.log(error.errorInfo)
//     return res.status(400).send({
//       status: STATUS,
//       data: { error: INCORRECT_DATA}
//   })}
// }
  

async function verifyIdToken (req,res,next) {
  const {idToken} = req.body;
  try {
    const decodedToken = await firebase.auth().verifyIdToken(idToken);
    if (decodedToken) return next();
    
  } catch (error) {
    return res.status(400).send({
      status: STATUS,
      data: {
        error:
          INCORRENCT_TOKEN,
      }
  })}
}




module.exports = {verifyIdToken}