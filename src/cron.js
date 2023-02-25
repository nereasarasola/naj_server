
const services = require('./services/userService');
const cron = require('node-cron');
const server = require('./index');
const {ACOLITE_DETAILS} = require('./constants');
const io = server.socketIO;


const job = async () => {

    cron.schedule('0 */1 * * *' , async () => {
        await services.updateAcoliteFatigueConcentration();
        await services.updateAcoliteState();
        const allAcolites = await services.getActiveAcolites();
        io.emit(ACOLITE_DETAILS, allAcolites);
    }) 
}

module.exports = {job}


