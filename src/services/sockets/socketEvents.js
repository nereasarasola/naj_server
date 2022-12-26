const User = require('../userService');
<<<<<<< HEAD

events = (socket) => {

  //Connect
  console.log({ Clientsocket: socket.id });
  /*socket.emit("new_user", socket.id);*/

  //Check the state of the user
  socket.on('state_acolite', async (data) => {
    try {
      const updatedUser = await User.patchUser(data.email, data.state);
      socket.broadcast.emit('state_acolite', updatedUser);
    } catch(error) {
      console.log(error);
      socket.broadcast.emit('state_acoliteError', error);
    }
  });


  
    
    // socket.on('slider', (data) => {
    //   console.log(data);
    //   socket.broadcast.emit('slider', data);
    // });
    // TEST BROADCAST
    // socket.on('test_broadcast', async (data) => {
    //   try {
    //     socket.broadcast.emit('test_broadcast', data);
    //   } catch (error) {
    //     console.log(error);
    //     socket.emit('test_broadcastError', error);
    //   }
    // });
  
    //Enter Crypt
    // socket.on('crypt-enter', data => {
    //   try {
    //     const response = //await al service
    //     socket.emit('crypt-enter', acolit)
    //   } catch (error) {n
        
    //   }
    // })
  
  // socket.on('disconnect', () => {
  //   console.log('Client disconnected: ', socket.id);      
=======
const {NEW_CONNECTION, NEW_CONNECTION_ERROR, DISCONNECTION, ACOLITE_STATE, ACOLITE_STATE_ERROR} = require('../../constants');
events = async (socket) => {

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

>>>>>>> 7da30ebcfc3adf7d9a7faac23b09489e753b4268
  // });
  
}
  
exports.socketEvents = events;