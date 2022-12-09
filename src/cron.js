
const services = require('./services/userService');
const cron = require('node-cron');

const job = async () => {
    //Update fatigue && concentration in database
    //cron.schedule('0 */1 * * * *' , async () => {
        const updatedUsers = await services.updateAcoliteFatigueConcentration();
        const updateState = await services.updateAcoliteState();
        const allAcolites = await services.allActiveUsers();
        console.log(allAcolites);
    //}) 
}

module.exports = {job}


