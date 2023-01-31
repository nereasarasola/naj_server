const server = require('../../index');
const io = server.socketIO;
const jwt = require('jsonwebtoken');
const {CONNECTION} = require('../../constants');
require('dotenv').config();

const socketEvents = require('./socketEvents').socketEvents;

//Middleware of the access token of JWT//
io.use(function(socket, next){

    if (socket.handshake.query.JWTAccess){
      jwt.verify(socket.handshake.query.JWTAccess, process.env.ACCESS_TOKEN_SECRET, function(error) {
        if (error) return next(new Error('Authentication error'));
        next();
      });
    }

    else {
      next(new Error('Authentication error'));
    }  

}).on(CONNECTION, socketEvents);


module.exports = io;