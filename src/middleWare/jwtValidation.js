const jwt = require('jsonwebtoken');
const {STATUS} = require('../constants'); 
const verificate = require('../utils');
require('dotenv').config();


async function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        console.log("UNAUTHORIZED")
        return res.sendStatus(401)
    }
 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
        if(error) {
            console.log("FORBIDDEN")
            console.log(error)
            return res.status(403).send({
                status: 'FORBIDDEN',
                data: {
                  error:
                    'Expired token',
                }
            })
        }
 
        req.email = email
        next()
    })
 }
 exports.authenticateToken = authenticateToken
