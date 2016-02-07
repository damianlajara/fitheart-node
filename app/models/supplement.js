var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supplementSchema = new Schema({

});

module.exports = mongoose.model('Supplement', supplementSchema);