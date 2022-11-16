const mongoose = require("mongoose");
const {Schema} = mongoose;

const pieceSchema = new Schema({
  pieceName: String,
  claimer: String,
  image: String,
  isFound: Boolean,
  position: {
    latitude: String,
    longitude: String,
    latitudeDelta: String,
    LongitudeDelta: String,
  },
});

module.exports = mongoose.model("Piece", pieceSchema);
