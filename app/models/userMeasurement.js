var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userMeasurementSchema = new Schema({
    weight: {type: String, trim: true, default: ''},
    bodyFat: {type: String, trim: true, default: ''},
    arm: {type: String, trim: true, default: ''},
    calf: {type: String, trim: true, default: ''},
    chest: {type: String, trim: true, default: ''},
    forearm: {type: String, trim: true, default: ''},
    hip: {type: String, trim: true, default: ''},
    waist: {type: String, trim: true, default: ''},
    shoulder: {type: String, trim: true, default: ''},
    thigh: {type: String, trim: true, default: ''},
    neck: {type: String, trim: true, default: ''}
});

module.exports = mongoose.model('UserMeasurement', userMeasurementSchema);