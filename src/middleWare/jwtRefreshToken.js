const jwt = require('jsonwebtoken');
const {UNAUTHORIZED, FORBIDDEN, FORBIDDEN_MESSAGE, UNAUTHORIZED_MESSAGE, STATUS} = require('../constants'); 
const {generateAccessToken, generateRefreshToken} = require("../jwt");
require('dotenv').config();

async function authenticateRefreshToken (req, res) {

    console.log('he entrado en el middleware de refresco');

    const {email} = req.body;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log({email: email})
    
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

           console.log({acces_token: accesToken})
           console.log({refresh_token: refreshToken})
           
           return res.send({ tokens: {accesToken, refreshToken} });

        }
        // next()
    })
}
 
exports.authenticateRefreshToken = authenticateRefreshToken
