const jwt = require('jsonwebtoken');
const {UNAUTHORIZED, FORBIDDEN, FORBIDDEN_MESSAGE, UNAUTHORIZED_MESSAGE, STATUS} = require('../constants'); 
const {generateAccessToken, generateRefreshToken} = require("../jwt");
require('dotenv').config();

async function authenticateRefreshToken (req, res, next) {
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
 
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, email) => {
        req.email = email

        if(error) {
            return res.status(403).send({
                status: FORBIDDEN,
                data: {
                  error:
                    FORBIDDEN_MESSAGE,
                }
            })
        }

        else {
           let accesToken = generateAccessToken(email);
           let refreshToken = generateRefreshToken(email);
           
           res.send({ tokens: {accesToken, refreshToken} });

        }
 
        next()
    })
}
 
exports.authenticateRefreshToken = authenticateRefreshToken
