const jwt = require('jsonwebtoken');
const {STATUS} = require('../constants'); 
const verificate = require('../utils');
require('dotenv').config();


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(!token) {
        console.log("UNAUTHORIZED")
        return res.sendStatus(401)
    }

    res = verificate.verificateJWT(token)
    console.log(res)
 
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
    //     if(error) {
    //         // console.log("FORBIDDEN")
    //         // console.log(error)
    //         // return res.sendStatus(403)

    //         return res.status(403).send({
    //             status: STATUS,
    //             data: {
    //               error:
    //                 'Expired token',
    //             }
    //         })
    //     }
 
    //     // req.email = email
    //     // next()
    // })
 }
 
exports.authenticateToken = authenticateToken
