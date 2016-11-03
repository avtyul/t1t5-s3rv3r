const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: { type: String, unique: true },
    password: String
},{
    versionKey: false
});

UserSchema.statics.findUsers = function() {
    return new Promise((resolve, reject) => {
        this.find((error, users) => {
            if (error) {
                reject(error);
            }
            resolve(users);
        });
    });
};

UserSchema.statics.findOneUser = function(login, password) {
    return new Promise((resolve, reject) => {
        this.findOne({login: login, password: password}, (error, user) => {
            if (error) {
                reject(error);
            }
            resolve(user);
        });
    });
};

module.exports = mongoose.model('User', UserSchema);
