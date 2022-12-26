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
<<<<<<< HEAD
  socketID: String,
  fatigue: Number,
  concentration: Number,
=======
  socketID: {type: String, default: "not_connected"},
  fatigue: { type: Number, min: 10, max: 100 },
  concentration: { type: Number, min: 10, max: 100 },
>>>>>>> 7da30ebcfc3adf7d9a7faac23b09489e753b4268
  state: String,
});

module.exports = mongoose.model('User', userSchema);
