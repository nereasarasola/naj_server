const jwt = require('jsonwebtoken');
const {UNAUTHORIZED, FORBIDDEN, FORBIDDEN_MESSAGE, UNAUTHORIZED_MESSAGE} = require('../constants'); 
require('dotenv').config();


async function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).send({
            status: UNAUTHORIZED,
            data: {
              error:
                UNAUTHORIZED_MESSAGE,
            }
        })
    }
 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
        if(error) {
            console.log(error);
            return res.status(403).send({
                status: FORBIDDEN,
                data: {
                  error:
                    FORBIDDEN_MESSAGE,
                }
            })
        }
 
        req.email = email
        next()
    })
}

exports.authenticateToken = authenticateToken
