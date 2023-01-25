const jwt = require('jsonwebtoken');
const {STATUS} = require('../constants'); 
const verificate = require('../utils');
require('dotenv').config();


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    
    if(authHeader) {
        const token = authHeader && authHeader.split(' ')[1]

        if(!token) {
            return res.sendStatus(401)
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {

            if(error) {
                return res.sendStatus(403);
            }
     
            req.email = email
            next();
        })
    }
    

    
 }
 
exports.authenticateToken = authenticateToken
