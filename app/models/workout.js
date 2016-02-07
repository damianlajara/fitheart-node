var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workoutSchema = new Schema({
    name: { type: String, trim: true, default: ''},
    mainMuscleWorked: { type: String, trim: true, default: ''},
    otherMusclesWorked: { type: String, trim: true, default: ''},
    force: { type: String, trim: true, default: ''},
    rating: { type: String, trim: true, default: ''},
    level: { type: String, trim: true, default: ''},
    afterActionPic: { type: String, trim: true, default: ''},
    mechanicsType: { type: String, trim: true, default: ''},
    equipment: { type: String, trim: true, default: ''},
    link: { type: String, trim: true, default: ''},
    beforeActionPic: { type: String, trim: true, default: ''},
    sport: { type: Boolean, default: false},
    type: { type: String, trim: true, default: 'Strength'},
    category: { type: String, trim: true, default: ''},
    guide: { type : Array , "default" : [] }
});

module.exports = mongoose.model('Workout', workoutSchema);