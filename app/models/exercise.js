var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    name: {type: String, trim:true, default: ''},
    force: {type: String, trim:true, default: ''},
    level: {type: String, trim:true, default: ''},
    type: {type: String, trim:true, default: ''},
    equipment: {type: Array, trim:true, default: ''},
    beforeActionPic: {type: String, trim:true, default: ''},
    afterActionPic: {type: String, trim:true, default: ''},
    guide: {type: String, trim:true, default: ''}
});

module.exports = mongoose.model('Exercise', exerciseSchema);