const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  idToken: String,
  name: String,
  email: String,
  active: Boolean,
  role: Boolean,
  intoTheCrypt: Boolean,
  goldCoins: Number,
  livePoints: Number,
  avatar: String,
  socketID: String,
  fatigue: Number,
  concentration: Number,
  state: String,
});

module.exports = mongoose.model('User', userSchema);
