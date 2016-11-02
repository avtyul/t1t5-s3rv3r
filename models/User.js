const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: String,
    password: String
},{
   versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
