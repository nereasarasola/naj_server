const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require("./routes/userRoute");
const admin = require('firebase-admin');
const serviceAccount = require("../auth-cc-naj-firebase-adminsdk-i0xus-b3d85aa2d9.json");
const mongoose = require ('mongoose');
const mongodbRoute = 'mongodb+srv://aarquero:123@e4p1.dcxvo3h.mongodb.net/users';

app.use(bodyParser.json());

app.use("/api/users", userRouter);

async function start() {
    try
    {
        await mongoose.connect(mongodbRoute);
        app.listen(PORT, () => {
            console.log(`API is listening in port ${PORT}`)
        });
        console.log('Conexión con Mongo correcta.');
    }
    catch(error) 
    {
        console.log(`Error al conectar a la base de datos: ${error}`)
    }
}

start();
