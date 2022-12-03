const User = require('../userService');
const cron = require('node-cron');


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

  //Check the data of the user
  socket.on('acolite_details', async (data) => {

    try {
      const updatedUser = await User.patchUser(data.email, data.data);
      socket.broadcast.emit('acolite_details', updatedUser);

    } catch(error) {
      console.log(error);
      socket.broadcast.emit('acolite_detailsError', error);
    }
  });


  //Cron
  socket.on('changes', async () => {

    try {
      cron.schedule('1,2,4,5 * * * *', async () => {
        const user = await User.allActiveUsers();
        console.log('running every minute 1, 2, 4 and 5');
        socket.broadcast.emit('changes', user);

      });

    } catch(error) {
      console.log(error);
      socket.broadcast.emit('changesError', error);
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