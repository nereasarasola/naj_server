const server = require('../../index');
const io = server.socketIO;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const socketEvents = require('./socketEvents').socketEvents;

//Middleware//
io.on("connection", (socket) => {

    console.log('connection')

    socket.use(([event, ...args], next) => {

        console.log('event')
        console.log({event: event});
        console.log({args: args})
        //Si el refresh token no es válido, desconectaremos la conexión
        jwt.verify(args, process.env.REFRESH_TOKEN_SECRET, (error, email) => {

            if(error) {
                socket.disconnect();
            }
        });
        next();
           
    });

    


    

   
});




//JWT validation//
  // io.on("connection", (socket) => {
  //   socket.use(([event, ...args], next) => {
  //     if (isUnauthorized(event)) {
  //       return next(new Error("unauthorized event"));
  //     }
  //     // do not forget to call next
  //     next();
  //   });
  
  //   socket.on("error", (err) => {
  //     if (err && err.message === "unauthorized event") {
  //       socket.disconnect();
  //     }
  //   });
  // });

module.exports = io;