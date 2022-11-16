const mongoose = require('mongoose');
const {Schema} = mongoose;

const dollSchema = new Schema({
    missionStatus: String,
    pieces: [],
});

module.exports = mongoose.model('Doll', dollSchema);
