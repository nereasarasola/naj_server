const User = require("../userService");
const Doll = require("../dollService");
const Piece = require("../pieceService");
const server = require("../../index");
const io = server.socketIO;
const {
  NEW_CONNECTION,
  NEW_CONNECTION_ERROR,
  DISCONNECTION,
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
  UPDATE_TO_NOT_FOUND_DOLLS
} = require("../../constants");
events = async (socket) => {
  socket.on(UPDATE_TO_NOT_FOUND_DOLLS, async (data) => {
    try {
      const dolls = await Doll.updateToNotFoundDolls();
      const allDolls = await Piece.getAllPieces();
      io.emit(DOLL_DETAILS, allDolls);
    } catch (error) {
      console.log(error);
      io.emit(DOLL_DETAILS_ERROR, error);
    }
  });
  /* USER */
  //Update male users to poisoned
  socket.on(POISON_ALL, async (data) => {
    try {
      const poisonAll = await User.poisonAllAcoliteMales();
      const allAcolites = await User.getActiveAcolites();
      console.log("This is poisoned acolites");
      console.log(allAcolites);
      io.emit(POISON_ALL, allAcolites);
    } catch (error) {
      console.log(error);
      io.emit(POISON_ALL_ERROR, error);
    }
  });
  //Update the socketId of the user
  console.log({ New_socket: socket.id });

  socket.on(NEW_CONNECTION, async (data) => {
    const body = { socketID: socket.id };
    try {
      const updatedUser = await User.patchUser(data.email, body);
      io.to(updatedUser.socketID).emit(NEW_CONNECTION, updatedUser);
    } catch (error) {
      console.log(error);
      io.to(updatedUser.socketID).emit(NEW_CONNECTION_ERROR, error);
    }
  });

  //Check the state of the user
  socket.on(ACOLITE_STATE, async (data) => {
    try {
      console.log({ Acolite_state: data.data });
      const updatedUser = await User.patchUser(data.email, data.data);
      const getCurrentAcolite = await User.getUserByEmail(data.email);
      io.emit(ACOLITE_STATE, getCurrentAcolite);
    } catch (error) {
      console.log(error);
      io.emit(ACOLITE_STATE_ERROR, error);
    }
  });

  //Check the user that has been scanned
  socket.on(SCANNED_ACOLITE, async (data) => {
    try {
      const email = data.data.email;
      console.log(`${email}'s`);

      const updatedUser = await User.cryptEntry(email);
      io.emit(SCANNED_ACOLITE, updatedUser);
    } catch (error) {
      console.log(error);
      io.emit(SCANNED_ACOLITE_ERROR, error);
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
      io.emit(MISSION_STATUS_ERROR, error);
    }
  });

  socket.on(DOLL_DETAILS, async (data) => {
    try {
      console.log(data);
      const updatedDoll = await Piece.patchPiece(data.pieceName, data.data);
      const allDolls = await Piece.getAllPieces();
      io.emit(DOLL_DETAILS, allDolls);
    } catch (error) {
      console.log(error);
      io.emit(DOLL_DETAILS_ERROR, error);
    }
  });
};

exports.socketEvents = events;
