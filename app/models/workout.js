var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workoutSchema = new Schema({

});

module.exports = mongoose.model('Workout', workoutSchema);