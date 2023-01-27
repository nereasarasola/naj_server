const server = require('../../index');
const io = server.socketIO;
const jwt = require('jsonwebtoken');
const {CONNECTION} = require('../../constants');
require('dotenv').config();

const socketEvents = require('./socketEvents').socketEvents;


// const middleWare = () => {

//     socket.use(([event, ...args], next) => {

//         console.log(socket.handshake);
           
//         const token = socket.handshake.auth.token;
    
//         console.log({token : token});
    
    
//         //Si el refresh token no es válido, desconectaremos la conexión
//         jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error) => {
    
//             if(error) {
//                 socket.disconnect();
//             }
    
//             else {
//                 io.on(CONNECTION, socketEvents);
    
//             }
//         });
    
//         next();
        
//         });

// }

//Middleware//

io.use(function(socket, next){

    if (socket.handshake.query.JWTAccess){

      jwt.verify(socket.handshake.query.JWTAccess, process.env.ACCESS_TOKEN_SECRET, function(error, email) {
        if (error) return next(new Error('Authentication error'));
        socket.email = email;
        next();
      });
      
    }

    else {
      next(new Error('Authentication error'));
    }  

}).on(CONNECTION, socketEvents);
// io.use((socket, next) => {

//     const token = socket.handshake.auth.token;

//     //Si el refresh token no es válido, desconectaremos la conexión
//     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error) => {

//         if(error) {
//             socket.disconnect();
//             next(new Error('Expired token'))
//         }

//         else { return next();}
//     });

            
// }).on(CONNECTION, socketEvents);


module.exports = io;