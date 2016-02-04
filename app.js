// Load all of our dependencies
var express = require('express');
var path = require('path');
var defaultRoute = require('./app/routes/defaultRoute');
var userRoutes = require('./app/routes/userRoutes');
var bodyParser = require('body-parser');
var morgan = require('morgan'); // Log all requests
var dbConfig = require('./app/db/config/db.js');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
//var favicon = require('serve-favicon'); // Make sure to install first before uncommenting this

// Connect to the database
mongoose.connect(dbConfig.connection, function(err,res) {
    err ? console.log('Mongo connection error on: ' +  dbConfig.connection, err) : console.log('Succeeded connecting to: ' + dbConfig.connection)
});

var app = express();

// Configure the app
// app.use(favicon(__dirname + '/public/favicon.ico')); // Make sure to put the favicon.ico in the public dir
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); //Or app.use(morgan('combined'));
app.use(methodOverride('X-HTTP-Method-Override')); // Simulate PUT and DELETE http action verbs
app.use(express.static(path.join(__dirname, '/public'))); // Set the static root mounting point (/javascripts instead of public/javascripts)
app.use('/vendor-css', express.static(path.join(__dirname, 'node_modules/')));

// For the view engine (Make sure to install first)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'mustache');
// app.engine('mustache', require('hogan_middleware').__express);

// Register our routes to their respective handlers
app.use('/', defaultRoute);
app.use('/users', userRoutes);

module.exports = app;