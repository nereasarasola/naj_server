const mongoose = require("mongoose");
const {Schema} = mongoose;

const pieceSchema = new Schema({
  pieceName: String,
  image: String,
  isFound: { type: Boolean, default: false },
  position: {
    latitude: { type: String, default: null },
    longitude: { type: String, default: null },
    latitudeDelta: { type: String, default: null },
    longitudeDelta: { type: String, default: null },
  },
});

module.exports = mongoose.model('Piece', pieceSchema);
