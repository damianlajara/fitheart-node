// "use strict";
// var fs = require("graceful-fs");
// var Food = require('./app/models/food');
////Asynchronous Version
//function DirParser(dirname) {
//    this._dirname = dirname;
//
//    this._USDA_NUTRIENTS = {
//        calories: 208,
//        total_fat: 204,
//        saturated_fat: 606,
//        polyunsaturated_fat: 646,
//        monounsaturated_fat: 645,
//        trans_fat: 605,
//        cholesterol: 601,
//        sodium: 307,
//        potassium: 306,
//        fiber: 291,
//        carbohydrates: 205,
//        sugars: 269,
//        protein: 203,
//        vitaminA: 320,
//        vitaminC: 401,
//        vitaminE: 323,
//        calcium: 301,
//        iron: 303
//    };
//
//    this._filterResults = function(obj) {
//        console.log("Filtering nutrients...");
//        //Filter out the nutrients array to make sure only those nutrients in the _USDA_NUTRIENTS obj are stored
//        var objValues = Object.keys(this._USDA_NUTRIENTS).map(function (key) {
//            return this._USDA_NUTRIENTS[key];
//        }, this);
//        var nutrients = obj["report"]["food"]["nutrients"].filter(function(nutrient){
//            return objValues.indexOf(Number(nutrient["nutrient_id"])) != -1;
//        });
//        return nutrients;
//    };
//
//    this._populateDB = function(data) {
//        var that = this;
//        var obj = JSON.parse(data);
//        var filteredNutrients = that._filterResults(obj);
//        console.log("adding val to nutrient...");
//        filteredNutrients.forEach(function(nutrient) {
//            // Update the nutrients measure array with a boolean for filtering out by creator later
//            nutrient["measures"]["userDefined"] = false;
//        });
//        console.log("Creating food obj...");
//        var food = new Food({
//            category: obj["report"]["food"]["fg"],
//            ndbId: obj["report"]["food"]["ndbno"],
//            name: obj["report"]["food"]["name"],
//            nutrients: filteredNutrients
//        });
//        console.log("about to save " + food.name + " to db...");
//        food.save(function(err, food) {
//            console.log("Saving " + food.name + " to db...");
//            if (err) {
//                console.error("Error on saving food populated through file: ");
//            } else {
//                console.log("Successfully saved food to the DB from file: ");
//            }
//        });
//    };
//
//    this._readDir = function() {
//        var _dirname = this._dirname;
//        var that = this;
//        fs.readdir(_dirname, function(err, filenames) {
//            console.log("scanned %s for %d files", _dirname, filenames.length);
//            if (err) {
//                console.log("error found!");
//                throw err;
//            } else {
//                filenames.forEach(function(filename) {
//                    fs.readFile(_dirname + filename, function(err, data) {
//                        console.log("Found file: ", filename);
//                        if (err) {
//                            console.error("found an error: ", err);
//                        } else {
//                            console.log("populating db...!");
//                            that._populateDB(data);
//                        }
//                    });
//                });
//            }
//        });
//    };
//}
//
// DirParser.prototype.parse = function(){
//     this._readDir();
// };
//
// var parser = new DirParser('./app/db/fixtures/foods/');

module.exports = function(dirname) {
    var _dirname = (dirname || './app/db/fixtures/foods/');
    var fs = require("graceful-fs");
    var Food = require("./app/models/food");

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

    fs.readdirSync(_dirname).forEach(function(_filename) {
        console.log("Reading file");
        var data = fs.readFileSync(_dirname + _filename);
        console.log("parsing data...");
        var obj = JSON.parse(data);
        console.log("getting obj values...");
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
        var food = new Food({
            category: obj["report"]["food"]["fg"],
            ndbId: obj["report"]["food"]["ndbno"],
            name: obj["report"]["food"]["name"],
            nutrients: filteredNutrients
        });
        //console.log(JSON.stringify(food, null, 4));
        console.log("about to save food to db...");
        food.save(function(err) {
            console.log("Saving food to db...");
            if (err) {
                console.error("Error on saving food populated through file: ");
            } else {
                console.log("Successfully saved food to the DB from file: ");
            }
        });
    });
};