const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    deviceName: String,
    deviceId: { type: String, unique: true },
    registrationId: { type: String, unique: true }
},{
    versionKey: false
});

DeviceSchema.statics.findDevices = function() {
    return new Promise((resolve, reject) => {
        this.find((error, devices) => {
            if (error) {
                reject(error);
            }
            resolve(devices);
        });
    });
};

DeviceSchema.statics.findOneDevice = function(registrationId) {
    return new Promise((resolve, reject) => {
        this.findOne({registrationId: registrationId}, (error, device) => {
            if (error) {
                reject(error);
            }
            resolve(device);
        });
    });
};

DeviceSchema.statics.addDevice = function(data) {
    return new Promise((resolve, reject) => {
        let device = new this(data);
        device.save((error) => {
            if (error) {
                reject(error);
            }
            resolve(device);
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
