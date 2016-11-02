const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
    action: String,
    type: String,
    icon: String
},{
   versionKey: false
});

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

FeatureSchema.statics.changeFeature = function(data, id) {
    return new Promise((resolve, reject) => {
        let feature = this.findOneAndUpdate({_id: id}, data, (error, feature) => {
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
