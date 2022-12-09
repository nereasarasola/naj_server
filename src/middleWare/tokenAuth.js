const admin = require('firebase-admin')
const {applicationDefault} =require ('firebase-admin/app');
const {projectId} = require('../constants')

const firebase = admin.initializeApp ({
  credential: applicationDefault(),
  projectId:  projectId
});



// async function verifyUser (req, res, next) {
//   const user = {
//     email: req.body.email,
//     name: req.body.name,
//     avatar: req.body.avatar
//   }
//   console.log(user)

//   try {
//     const newUser = await firebase.auth().createUser({
//       email: user.email,
//       displayName: user.name,
//       photoURL: user.avatar,
//     })

//     console.log(firebase.auth().createUser)

//     return newUser;
    
    
    

//   } catch (error) {
//     console.log(error.errorInfo)
//     return res.status(400).send({
//       status: "FAILED",
//       data: {
//         error:
//           "Incorrect Data",
//       }
//   })}
// }
  

  
 



async function verifyIdToken (req,res,next) {
  const {idToken} = req.body;
  try {
    const decodedToken = await firebase.auth().verifyIdToken(idToken);
    //console.log(decodedToken.uid);
    if (decodedToken) return next();
    
  } catch (error) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "Incorrect Token",
      }
  })}
}



module.exports = { verifyIdToken}