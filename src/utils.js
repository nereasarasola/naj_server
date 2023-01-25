const jwt = require('jsonwebtoken');
require('dotenv').config();

 
const verificateJWT = (token) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
        if(error) {
            return error;
        } else return email;
    })
}  
module.exports = {verificateJWT}