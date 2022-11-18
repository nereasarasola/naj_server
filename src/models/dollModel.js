const mongoose = require('mongoose');
const {Schema} = mongoose;

const dollSchema = new Schema({
    missionStatus: String,
    pieces: [{type: Schema.Types.String, ref:"Piece"}],
});

module.exports = mongoose.model('Doll', dollSchema);
