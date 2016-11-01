let FeatureSchema = new mongoose.Schema({
    action: String,
    type: String,
    icon: String
});

module.exports = mongoose.model('Feature', FeatureSchema);
