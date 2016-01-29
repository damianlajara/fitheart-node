// Load all of our dependencies
var express = require('express');
var path = require('path');
var defaultRoute = require('./routes/defaultRoute');
var userRoutes = require('./routes/userRoutes');
var bodyParser = require('body-parser');
var morgan = require('morgan'); // Log all requests
var dbConfig = require('./config/db.js');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var app = express();

// Configure the app
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); //Or app.use(morgan('combined'));
app.use(methodOverride('X-HTTP-Method-Override')); // Simulate PUT and DELETE http action verbs
app.use(express.static(path.join(__dirname, '/public'))); // Set the static root mounting point (/javascripts instead of public/javascripts)
//app.set('views', path.join(__dirname, 'views'));

// Tell express to use the router middleware
app.use(app.router);

// Connect to the database
mongoose.connect(dbConfig.connection);

// Register our routes to their respective handlers
app.use('/', defaultRoute);
app.use('/users', userRoutes);

module.exports = app;