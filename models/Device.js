const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    deviceName: String,
    deviceId: String,
    registrationId: String
},{
   versionKey: false
});

DeviceSchema.statics.addDevice = function(data) {
    return new Promise((resolve, reject) => {
        let feature = new this(data);
        feature.save((error) => {
            if (error) {
                reject(error);
            }
            resolve(feature);
        });
    });
};

DeviceSchema.statics.removeDevice = function () {
    return new Promise((resolve, reject) => {
        this.remove((error) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });
};

module.exports = mongoose.model('Device', DeviceSchema);
