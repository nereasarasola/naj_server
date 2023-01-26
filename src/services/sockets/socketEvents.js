const User = require("../userService");
const Doll = require("../dollService");
const Piece = require("../pieceService");
const server = require("../../index");
const io = server.socketIO;
const jwt = require('jsonwebtoken');
const {
  NEW_CONNECTION,
  NEW_CONNECTION_ERROR,
  NEW_USER,
  NEW_USER_ERROR,
  ACOLITE_STATE,
  ACOLITE_STATE_ERROR,
  MISSION_STATUS,
  MISSION_STATUS_ERROR,
  DOLL_DETAILS,
  DOLL_DETAILS_ERROR,
  SCANNED_ACOLITE,
  SCANNED_ACOLITE_ERROR,
  POISON_ALL,
  POISON_ALL_ERROR,
  UPDATE_TO_NOT_FOUND_DOLLS,
  UPDATE_TO_NOT_FOUND_DOLLS_ERROR,
  REFRESH_VALIDATION,
  DISCONNECT
} = require("../../constants");


events = async (socket) => {

  socket.on(UPDATE_TO_NOT_FOUND_DOLLS, async () => {
    try {
      await Piece.patchAllPiecesByName();
      const allDolls = await Piece.getAllPieces();
      io.emit(DOLL_DETAILS, allDolls);
    } catch (error) {
      console.log(error);
      io.emit(error, UPDATE_TO_NOT_FOUND_DOLLS_ERROR);
    }
  });

  /* USER */
  //Update male users to poisoned
  socket.on(POISON_ALL, async () => {
    try {
      await User.poisonAllAcoliteMales();
      const allAcolites = await User.getActiveAcolites();
      console.log("This is poisoned acolites");
      console.log(allAcolites);
      io.emit(POISON_ALL, allAcolites);
    } catch (error) {
      console.log(error);
      io.emit(error, POISON_ALL_ERROR);
    }
  });

  socket.on(NEW_USER, async (data) => {
    let email = data.email;
    let newUser = data.data;

    try {
      const user = await User.createNewUser(email, newUser);
      io.emit(error, user);

    } catch(error) {
      console.log(error);
      io.emit(error, NEW_USER_ERROR)

    }

  })






  //Update the socketId of the user
  console.log({ New_socket: socket.id });

  socket.on(NEW_CONNECTION, async (data) => {
    const body = { socketID: socket.id };
    try {
      const updatedUser = await User.patchUser(data.email, body);
      io.to(updatedUser.socketID).emit(NEW_CONNECTION, updatedUser);
    } catch (error) {
      console.log(error);
      io.to(updatedUser.socketID).emit(error, NEW_CONNECTION_ERROR);
    }
  });

  //Check the state of the user
  socket.on(ACOLITE_STATE, async (data) => {
    try {
      console.log({ Acolite_state: data.data });
      await User.patchUser(data.email, data.data);
      const getCurrentAcolite = await User.getUserByEmail(data.email);
      io.emit(ACOLITE_STATE, getCurrentAcolite);
    } catch (error) {
      console.log(error);
      io.emit(error, ACOLITE_STATE_ERROR);
    }
  });

  //Check the user that has been scanned
  socket.on(SCANNED_ACOLITE, async (data) => {
    try {
      console.log({Acolite_email: data.email})
      const email = data.email;
      console.log(`${email}'s`);

      const updatedUser = await User.cryptEntry(email);
      io.emit(SCANNED_ACOLITE, updatedUser);
    } catch (error) {
      console.log(error);
      io.emit(error, SCANNED_ACOLITE_ERROR);
    }
  });

  // socket.on('disconnect', async () => {
  //   console.log('Client disconnected: ', socket.id);
  //   //When the user is loged out, update the socketId to null
  //   let email = 'nerea.sarasola@ikasle.aeg.eus';
  //   let data = {socketID: null}
  //   const updateAcolite = await User.patchUser(email, data);
  //   socket.emit('disconnected', updateAcolite);

  // });

  /* DOLL */
  socket.on(MISSION_STATUS, async (data) => {
    try {
      console.log({ MissionStatus: data.data });
      const updatedDoll = await Doll.patchDoll(data);
      io.emit(MISSION_STATUS, updatedDoll);
    } catch (error) {
      console.log(error);
      io.emit(error, MISSION_STATUS_ERROR);
    }
  });

  socket.on(DOLL_DETAILS, async (data) => {
    try {
      console.log(data);
      await Piece.patchPiece(data.pieceName, data.data);
      const allDolls = await Piece.getAllPieces();
      io.emit(DOLL_DETAILS, allDolls);
    } catch (error) {
      console.log(error);
      io.emit(error, DOLL_DETAILS_ERROR);
    }
  });


  //JWT validation//
  socket.on(REFRESH_VALIDATION, async (data) => {
    console.log(data);
    socket.use();
  })


  socket.on("disconnect", async (reason) => {
    //io.emit(DISCONNECT, reason);
    console.log('socket disconnected : ' + socket.id)
  });





  // socket.on(REFRESH_VALIDATION, (data) => {
  //   console.log(data)
  //   // socket.use((next) => {
      

  //   //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
  //   //     if(error) return next(new Error('Authentication error'));

  //   //     req.email = email
  //   //     next()
  //   // })
  // });




};

exports.socketEvents = events;
