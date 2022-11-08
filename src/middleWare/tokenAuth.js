const admin = require('firebase-admin')
const {initializeApp, applicationDefault} =require ('firebase-admin/app');

const firebase = admin.initializeApp({
  
  credential: applicationDefault(),
   projectId:  'auth-cc-naj'
});

async function verify (req,res,next) {
    const {idToken} = req.body;
    try {
     let decodedToken = await firebase.auth().verifyIdToken(idToken)
     return next()
    } catch (e) {
     console.log(e)
     return res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "Incorrect Token",
        }
    })}
   }

   module.exports = {verify}