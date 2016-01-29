var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    default: ''
});

module.exports = mongoose.model('User', userSchema);