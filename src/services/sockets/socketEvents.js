const User = require('../userService');
const Doll = require('../dollService');
const Piece = require('../pieceService');
const {NEW_CONNECTION, NEW_CONNECTION_ERROR, DISCONNECTION, ACOLITE_STATE, ACOLITE_STATE_ERROR, MISSION_STATUS, MISSION_STATUS_ERROR, DOLL_DETAILS, DOLL_DETAILS_ERROR} = require('../../constants');
events = async (socket) => {

  /* USER */

  //Update the socketId of the user
  console.log({New_socket: socket.id})

  socket.on(NEW_CONNECTION, async (data) => {
    const body = {socketID: socket.id};
    try {
      const updatedUser = await User.patchUser(data.email, body);
      socket.broadcast.emit(NEW_CONNECTION, updatedUser);
    } catch(error) {
      console.log(error);
      socket.broadcast.emit(NEW_CONNECTION_ERROR, error);
    }
  });
  

  //Check the state of the user
  socket.on(ACOLITE_STATE, async (data) => {
    try {
      console.log({Acolite_state: data.data});
      const updatedUser = await User.patchUser(data.email, data.data);
      socket.broadcast.emit(ACOLITE_STATE, updatedUser);
    } catch(error) {
      console.log(error);
      socket.broadcast.emit(ACOLITE_STATE_ERROR, error);
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
      console.log({MissionStatus: data.data});
      const updatedDoll = Doll.patchDoll(data.data);
    } catch(error) {
      console.log(error);
      socket.emit(MISSION_STATUS_ERROR, error);
    }
  })

  socket.on(DOLL_DETAILS, async (data) => {
    try {      
      console.log({Dolldetails: data.data});
      const updatedDoll = Piece.patchPiece(data.pieceName, data.data);
    } catch(error) {
      console.log(error);
      socket.emit(DOLL_DETAILS_ERROR, error);
    }
  })
  


}
  
exports.socketEvents = events;