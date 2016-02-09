// Load all of our dependencies
var express = require('express');
var path = require('path');
var defaultRoute = require('./app/routes/defaultRoute');
var userApiRoutes = require('./app/routes/userRoutes');
var bodyParser = require('body-parser');
var morgan = require('morgan'); // Log all requests
var dbConfig = require('./app/db/config/db.js');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var populateDB = require('./prePopulateDB');
//var favicon = require('serve-favicon'); // Make sure to install first before uncommenting this

var dbConnection = mongoose.connect(dbConfig.connection).connection;
dbConnection.on('error', function(err) {
    console.log('Mongo connection error on: ' +  dbConfig.connection, err)
});

//TODO: When server is restarted, it still parses the data and saves to db. Make sure to stop this behavior...
dbConnection.once('open', function() {
    console.log('Succeeded connecting to: ' + dbConfig.connection);
    // An admin has access to the list of collections
    var adminConn = new mongoose.mongo.Admin(dbConnection.db);
    adminConn.listDatabases(function(err, result) {
        if(err) console.error(err);
        console.log('Checking to see if workouts and/or foods collection exists');

        var dbNames = result["databases"].map(function(db){
            return db.name;
        });

        if(dbNames.indexOf("workouts") === -1) {
            console.log("Workouts collection doesn't exist. Creating and pre-populating with workout data now...");
            //populateDB.createWorkouts();
        } else {
            console.log("Workout collection already exists. Skipping...");
        }

        if(dbNames.indexOf("foods") === -1) {
            console.log("Foods collection doesn't exist. Creating and pre-populating with food data now...");
            //populateDB.createFoods();
        } else {
            console.log("Foods collection already exists. Skipping...");
        }

    });

}); // End db connection

console.log("Starting app...");
var app = express();

// Configure the app
console.log("Setting up middleware...");
// app.use(favicon(__dirname + '/public/favicon.ico')); // Make sure to put the favicon.ico in the public dir
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); //Or app.use(morgan('combined'));
app.use(methodOverride('X-HTTP-Method-Override')); // Simulate PUT and DELETE http action verbs
app.use(express.static(path.join(__dirname, '/public'))); // Set the static root mounting point (/javascripts instead of public/javascripts)
app.use('/vendor', express.static(path.join(__dirname, 'node_modules/')));

// For the view engine (Make sure to install first)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'mustache');
// app.engine('mustache', require('hogan_middleware').__express);

// Register our routes to their respective handlers
console.log("Registering Routes...");
app.use('/api', userApiRoutes);
app.use('/', defaultRoute);

module.exports = app;