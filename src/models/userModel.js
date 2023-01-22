const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  idToken: String,
  name: String,
  email: String,
  active: {type: Boolean, default: true},
  role: {type: Boolean, default: false},
  intoTheCrypt: {type: Boolean, default: false},
  goldCoins: {type: Number, default: 29},
  livePoints: {type: Number, default: 100},
  avatar: String,
  socketID: {type: String, default: "not_connected"},
  fatigue: { type: Number, min: 10, max: 100 },
  concentration: { type: Number, min: 10, max: 100 },
  state: {type: String, default: 'awake'},
  poisoned: {type: Boolean, default: false},
  genre: {type: String, default: 'male'},
});

module.exports = mongoose.model('User', userSchema);
