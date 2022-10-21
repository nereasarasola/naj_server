const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    idToken: String,
    name: String,
    email: String,
    active: Boolean,
    role: Boolean,
});

module.exports = mongoose.model('User', userSchema);
