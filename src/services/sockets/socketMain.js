const server = require('../../index');
const io = server.socketIO;
require('dotenv').config();

const socketEvents = require('./socketEvents').socketEvents;

//Middleware//
io.on("connection", (socket) => {

    console.log('connection')
    console.log({Socket: socket});

    socket.use(([event, ...args], next) => {

        console.log({event: event});
        //Si el refresh token no es válido, desconectaremos la conexión
        jwt.verify(event, process.env.ACCES_TOKEN_SECRET, (error, email) => {

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