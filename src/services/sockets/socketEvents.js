const User = require('../userService');
const {NEW_CONNECTION, NEW_CONNECTION_ERROR, DISCONNECTION, ACOLITE_STATE, ACOLITE_STATE_ERROR} = require('../../constants');
events = async (socket) => {

  //Update the socketId of the user
  socket.on(NEW_CONNECTION, async (data) => {
    try {
      console.log(data.data);
      const updatedUser = await User.patchUser(data.email, data.data);
      socket.broadcast.emit(NEW_CONNECTION, updatedUser);
    } catch(error) {
      console.log(error);
      socket.broadcast.emit(NEW_CONNECTION_ERROR, error);
    }
  });
  

  //Check the state of the user
  socket.on(ACOLITE_STATE, async (data) => {
    try {
      console.log(data.data);
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
  
}
  
exports.socketEvents = events;