var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema({
    name: {type: String, trim:true,  default: ''}, // User chooses and writes the goal they want to set
    byWhen: Date //Show a datetime picker for the user to select
});

module.exports = mongoose.model('Goal', goalSchema);