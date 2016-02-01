var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String, trim:true, default: ''},
    lastName: {type: String, trim:true, default: ''},
    username: {type: String, trim:true, default: ''},
    email: {type: String, trim:true,  default: ''},
    timestamp: {type: Date, default: Date.now }

});

userSchema.methods.name = function() {
    return this.firstName + ' ' + this.lastName;
};

module.exports = mongoose.model('User', userSchema);