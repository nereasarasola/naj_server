const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = socketIO(server, {
    pingTimeout: 30000,
    cors: {
      origin: '*',
    }
  });
  exports.socketIO = io;

const userRouter = require("./routes/userRoute");
const pieceRouter = require("./routes/pieceRoute");
const dollRouter = require("./routes/dollRoute");
const admin = require('firebase-admin');
const serviceAccount = require("../auth-cc-naj-firebase-adminsdk-i0xus-b3d85aa2d9.json");
const mongoose = require ('mongoose');
const mongodbRoute = `mongodb+srv://aarquero:123@e4p1.dcxvo3h.mongodb.net/NAJ_DB`;
const crone = require("./cron");


app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/pieces", pieceRouter);
app.use("/api/dolls", dollRouter);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


async function start() {
    try
    {
        await mongoose.connect(mongodbRoute);
        server.listen(PORT, () => {
            console.log(`Server activo en ${PORT}`);
        });
        console.log('Conexión con Mongo correcta.');
        crone.job();
    }
    catch(error) 
    {
        console.log(`Error al conectar a la base de datos: ${error}`)
    }
}

start();

app.get('/', (req, res) => {
    res.send('Welcome to Absentia Staging Socket Service from CI')
})

require('./services/sockets/socketMain');

