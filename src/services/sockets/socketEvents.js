const User = require('../userService');
const cron = require('node-cron');

events = (socket) => {

  //Connect
  console.log({ Clientsocket: socket.id });
  socket.emit("new_user", socket.id);

  //Check the value of fatigue and concentration
  // let email = 'nerea.sarasola@ikasle.aeg.eus';
  // let data = {socketID: socket.id};

  // const currentUser = User.patchUser(email, data);
  
  //Cron every one hour to change the value of fatigue and concentration
  cron.schedule('0 */1 * * * *', async () => {
    try {
      const users = await User.allActiveUsers();
      users.map(async (user) => {
        
        switch(user.state) {

          case 'awake':

            if (user.fatigue === 20) {
              let data = {
                fatigue: user.fatigue - 5,
                state: 'exhausted'
              }
              updateState = await User.patchUser(user.email, data);
              console.log(`${user.name} va a entrar en el estado: ${data.state}`);
            }

            if (user.fatigue === 15) {
              let data = {
                fatigue: user.fatigue - 5,
                state: 'fainted'
              }
              updateState = await User.patchUser(user.email, data);
              console.log(`${user.name} va a entrar en el estado: ${data.state}`);
            }

          case 'sleep': 

            if(user.fatigue <=10) {
              socket.broadcast.emit('admin_message', user.email);
              console.log(`${user.name} manda el mensaje a los admins`);
            }
          
          default:
            if (user.state === 'sleep') {
              let data = {
                fatigue: user.fatigue + 5,
                
              }
              updateState = await User.patchUser(user.email, data);
              console.log(`${user.name} tiene : ${data.fatigue} de fatigue`);
            } 

            else if (user.state != 'fainted' || user.fatigue === 10) {
              let data = {
                fatigue: user.fatigue - 5,
              }
              updateState = await User.patchUser(user.email, data);
              console.log(`${user.name} tiene : ${data.fatigue} de fatigue`);

            }

        }
      })

      socket.broadcast.emit('state_acolite', 'Kaixo');


    } catch(error) {
      // console.log(error);
      // socket.broadcast.emit('state_acoliteError', error);
    }
  });

  

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