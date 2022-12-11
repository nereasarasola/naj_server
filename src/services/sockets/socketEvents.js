const User = require('../userService');

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
  // });
  
}
  
exports.socketEvents = events;