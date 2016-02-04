var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongoose setter function that allows you to humanize the mongoose document's data
// before it gets written to the db
function humanize(string) {
    // Format the string to be all lowercase with the first letter capitalized
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}

var userSchema = new Schema({
    firstName: {type: String, trim:true, default: '', set: humanize}, // humanize firstName
    lastName: {type: String, trim:true, default: '', set: humanize}, // humanize lastName
    username: {type: String, trim:true, default: ''},
    email: {type: String, trim:true,  default: ''},
    timestamp: {type: Date, default: Date.now }
}, {
    // Set  virtual field to be displayed on client side
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

// Virtual functions allow you to manipulate data without storing it in the db
userSchema.virtual('name')
    // Mongoose virtual getter -> when user.name is invoked, it triggers this function
    // instead of retrieving the value from the db (which it doesn't exist)
    .get(function() {
        return humanize(this.firstName) + ' ' + humanize(this.lastName);
    })
    // Mongoose virtual setter -> when user.set("damian lajara") is invoked, it triggers this function
    // and sets the firstName and lastName attributes, respectively. Note: Make sure to save the document after
    .set(function (fullName) {
        var split = fullName.split(' ')
            , firstName = split[0]
            , lastName = split[1];

        this.set('firstName', firstName);
        this.set('lastName', lastName);
    });

module.exports = mongoose.model('User', userSchema);