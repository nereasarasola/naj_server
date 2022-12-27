const mongoose = require('mongoose');
const {Schema} = mongoose;

const dollSchema = new Schema({
    missionStatus: String,
    pieces: [{type: Schema.Types.ObjectId, ref: 'Piece'}],
});

module.exports = mongoose.model('Doll', dollSchema);
