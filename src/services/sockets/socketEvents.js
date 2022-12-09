const User = require('../userService');
const cron = require('node-cron');

events = async (socket) => {

  //Connect
  console.log({ Clientsocket: socket.id });
  socket.emit("new_connection", socket.id);

  //Update the socketId of the user
  let email = 'nerea.sarasola@ikasle.aeg.eus';
  let data = {socketID: socket.id};
  await User.patchUser(email, data);

  //Get the data of the current user
  const currentUser = await User.getUserByEmail(email);

  //Check the state of the user
  socket.on('state_acolite', async (data) => {
    try {
      console.log(data.data);
      const updatedUser = await User.patchUser(data.email, data.data);
      socket.broadcast.emit('state_acolite', updatedUser);
    } catch(error) {
      console.log(error);
      socket.broadcast.emit('state_acoliteError', error);
    }
  });

  //Check the details of the user
  socket.on('acolite_details', async (data) => {
    try {
      const updatedUser = await User.patchUser(data.email, data.data);
      socket.broadcast.emit('acolite_details', updatedUser);

    } catch(error) {
      console.log(error);
      socket.broadcast.emit('acolite_detailsError', error);
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