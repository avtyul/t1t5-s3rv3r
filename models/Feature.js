const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
    action: { type: String, unique: true },
    type: String,
    icon: String
},{
    versionKey: false
});

FeatureSchema.statics.findFeatures = function() {
    return new Promise((resolve, reject) => {
        this.find((error, features) => {
            if (error) {
                reject(error);
            }
            resolve(features);
        });
    });
};

FeatureSchema.statics.removeFeatures = function() {
    return new Promise((resolve, reject) => {
        this.remove({}, (error, features) => {
            if (error) {
                reject(error);
            }
            resolve(features);
        });
    });
};

FeatureSchema.statics.findOneFeature = function(action) {
    return new Promise((resolve, reject) => {
        this.findOne({action: action}, (error, feature) => {
            if (error) {
                reject(error);
            }
            resolve(feature);
        });
    });
};

FeatureSchema.statics.addFeature = function(data) {
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

FeatureSchema.statics.changeFeature = function(data, action) {
    return new Promise((resolve, reject) => {
        this.findOneAndUpdate({action: action}, data, (error, feature) => {
            if (error && !feature) {
                reject(error);
            }
            resolve(feature);
        });
    });
};

FeatureSchema.statics.removeFeature = function () {
    return new Promise((resolve, reject) => {
        this.remove((error) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });
};

module.exports = mongoose.model('Feature', FeatureSchema);
