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
io.use((socket, next) => {

    const token = socket.handshake.auth.token;

    //Si el refresh token no es válido, desconectaremos la conexión
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error) => {

        if(error) {
            socket.disconnect();
            next(Error('Expired token'))
        }

        else { return next();}
    });

            
}).on(CONNECTION, socketEvents);


module.exports = io;