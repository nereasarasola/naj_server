const server = require('../../index');
const io = server.socketIO;
const jwt = require('jsonwebtoken');
const {generateAccessToken, generateRefreshToken} = require("../../jwt");
const {CONNECTION} = require('../../constants');
require('dotenv').config();

const socketEvents = require('./socketEvents').socketEvents;

//Middleware//
io.on(CONNECTION, (socket) => {

    socket.use(([event, ...args], next) => {

    console.log(socket.handshake.query);
    
    const token = socket.handshake.query.token;
    const userEmail = socket.handshake.query.email;

    console.log({token : token});
    console.log({email: userEmail})


    //Si el refresh token no es válido, desconectaremos la conexión
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, userEmail) => {

        if(error) {
            socket.disconnect();
        }

        else {
            let accesToken = generateAccessToken(userEmail);
            let refreshToken = generateRefreshToken(userEmail);
            let tokens = {accesToken, refreshToken}

            io.emit({tokens}, CONNECTION);
            io.on(CONNECTION, socketEvents);

        }
    });

    next();
    
    });

});



module.exports = io;