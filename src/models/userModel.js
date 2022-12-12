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
  fatigue: { type: Number, min: 10, max: 100 },
  concentration: { type: Number, min: 10, max: 100 },
  state: String,
});

module.exports = mongoose.model('User', userSchema);
