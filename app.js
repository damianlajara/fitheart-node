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
var fs = require("graceful-fs");
var Food = require("./app/models/food");
//var favicon = require('serve-favicon'); // Make sure to install first before uncommenting this

var dbConnection = mongoose.connect(dbConfig.connection).connection;
dbConnection.on('error', function(err) {
    console.log('Mongo connection error on: ' +  dbConfig.connection, err)
});
dbConnection.once('open', function() {
    console.log('Succeeded connecting to: ' + dbConfig.connection);
    var _dirname = './app/db/fixtures/foods/';
    var foodObjects = [];
    var USDA_NUTRIENTS = {
        calories: 208,
        total_fat: 204,
        saturated_fat: 606,
        polyunsaturated_fat: 646,
        monounsaturated_fat: 645,
        trans_fat: 605,
        cholesterol: 601,
        sodium: 307,
        potassium: 306,
        fiber: 291,
        carbohydrates: 205,
        sugars: 269,
        protein: 203,
        vitaminA: 320,
        vitaminC: 401,
        vitaminE: 323,
        calcium: 301,
        iron: 303
    };

    function filterout(obj) {
        var objValues = Object.keys(USDA_NUTRIENTS).map(function (key) {
            return USDA_NUTRIENTS[key];
        });
        console.log("filtering nutrients...");
        var filteredNutrients = obj["report"]["food"]["nutrients"].filter(function(nutrient){
            return objValues.indexOf(Number(nutrient["nutrient_id"])) != -1;
        });
        console.log("adding val to nutrient...");
        filteredNutrients.forEach(function(nutrient) {
            // Update the nutrients measure array with a boolean for filtering out by creator later
            nutrient["measures"]["userDefined"] = false;
        });
        console.log("Creating food obj...");
        return {
            category: obj["report"]["food"]["fg"],
            ndbId: obj["report"]["food"]["ndbno"],
            name: obj["report"]["food"]["name"],
            nutrients: filteredNutrients
        };
    }
    fs.readdirSync(_dirname).forEach(function(filename) {
        console.log("storing file in array: ", filename);
        var foodObj = filterout(JSON.parse(fs.readFileSync(_dirname + filename)));
        foodObjects.push(foodObj);
    });
    console.log("Finished saving to array");
    console.log("Stored: ", foodObjects.length + " food objects in total");
    Food.collection.insert(foodObjects, function (err, docs) {
        if(err) {
            console.error("Error Bulk Importing");
        } else {
            console.log("Success. Imported all %d documents!", docs.length);
        }
    });




});

// If the Node process ends, close the Mongoose connection
//process.on('SIGINT', function() {
//    mongoose.connection.close(function () {
//        console.log('Mongoose default connection disconnected through app termination');
//        process.exit(0);
//    });
//});

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
app.use('/api', userApiRoutes);
app.use('/', defaultRoute);

//parser.parse(); // Pre-populate DB
















module.exports = app;