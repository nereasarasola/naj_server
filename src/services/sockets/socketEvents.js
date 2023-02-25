const User = require("../userService");
const Doll = require("../dollService");
const Piece = require("../pieceService");
const server = require("../../index");
const io = server.socketIO;

const {
  NEW_CONNECTION,
  NEW_CONNECTION_ERROR,
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
      io.emit(POISON_ALL, allAcolites);
    } catch (error) {
      console.log(error);
      io.emit(error, POISON_ALL_ERROR);
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
      const email = data.email;
      const updatedUser = await User.cryptEntry(email);
      io.emit(SCANNED_ACOLITE, updatedUser);
    } catch (error) {
      console.log(error);
      io.emit(error, SCANNED_ACOLITE_ERROR);
    }
  });

  /* DOLL */
  socket.on(MISSION_STATUS, async (data) => {
    try {
      const updatedDoll = await Doll.patchDoll(data);
      io.emit(MISSION_STATUS, updatedDoll);
    } catch (error) {
      console.log(error);
      io.emit(error, MISSION_STATUS_ERROR);
    }
  });

  socket.on(DOLL_DETAILS, async (data) => {
    try {
      await Piece.patchPiece(data.pieceName, data.data);
      const allDolls = await Piece.getAllPieces();
      io.emit(DOLL_DETAILS, allDolls);
    } catch (error) {
      console.log(error);
      io.emit(error, DOLL_DETAILS_ERROR);
    }
  });
};

exports.socketEvents = events;
