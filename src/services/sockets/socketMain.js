const server = require('../../index');
const io = server.socketIO;
require('dotenv').config();

const socketEvents = require('./socketEvents').socketEvents;

//Middleware//
io.on("connection", (socket) => {

   console.log({Socket: socket});

    socket.use((event, next) => {

        //Si el refresh token no es válido, desconectaremos la conexión
        jwt.verify(event, process.env.REFRESH_TOKEN_SECRET, (error, email) => {

            if(error) {
                socket.disconnect();
            }
        })




        if (isUnauthorized(event)) {
        return next(new Error("unauthorized event"));
        }
        // do not forget to call next
        next();
    });

    socket.on("error", (err) => {
        if (err && err.message === "unauthorized event") {
        socket.disconnect();
        }
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