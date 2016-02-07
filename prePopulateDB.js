//"3\/4 Sit-Up": {
//    "Main Muscle Worked": " Abdominals",
//        "Force": " Pull",
//        "Your Rating": " ",
//        "Level": " Beginner",
//        "pic_right": "http:\/\/www.bodybuilding.com\/exercises\/exerciseImages\/sequences\/2001\/Male\/l\/2001_1.jpg",
//        "Mechanics Type": " Compound",
//        "Equipment": " Body Only",
//        "link": "http:\/\/www.bodybuilding.com\/exercises\/detail\/view\/name\/34-sit-up",
//        "pic_left": "http:\/\/www.bodybuilding.com\/exercises\/exerciseImages\/sequences\/2001\/Male\/l\/2001_1.jpg",
//        "Sport": " No",
//        "Type": " Strength",
//        "guide": [
//        "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
//        "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
//        "Flex your hips and spine to raise your torso toward your knees.",
//        "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only \u00c2\u00be of the way down.",
//        "Repeat for the recommended amount of repetitions."
//    ]
var fs = require("graceful-fs");
var async = require('async');
var Food = require("./app/models/food");
var Workout = require("./app/models/workout");

function filterOutWorkouts(workouts) {
    // Return an array of object that has these filtered attributes
    return workouts.map(function(workout){
        var name = '';
        for (var prop in workout) {
            if(workout.hasOwnProperty(prop)) {
                name = prop; // Just want the first key
                break; //Break after the first iteration, faster than Object.keys(obj)[0]
            }
        }
        return {
            name: name,
            mainMuscleWorked: workout[name]["Main Muscle Worked"],
            otherMusclesWorked: workout[name]["Other Muscles"] || '',
            force: workout[name]["Force"],
            rating: workout[name]["Your Rating"],
            level: workout[name]["Level"],
            afterActionPic: workout[name]["pic_right"],
            mechanicsType: workout[name]["Mechanics Type"],
            equipment: workout[name]["Equipment"],
            link: workout[name]["link"],
            beforeActionPic: workout[name]["pic_left"],
            sport: workout[name]["Sport"].trim().toLowerCase().search("no") != -1,
            type: workout[name]["Type"],
            guide: workout[name]["guide"]
        }
    });
}

function filterOutFoods(obj, USDA_NUTRIENTS) {
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

var createWorkouts = function() {
    console.log("Creating workouts from JSON file...");
    fs.readFile('./app/db/fixtures/workout.json', function (err, data) {
        if (err) return callback(err);
        var workouts = filterOutWorkouts(JSON.parse(data));
        Workout.create(workouts, function(err) {
            if(err) console.error("workouts not created: ", err.message);
            console.log("Workouts saved to db!");
        })
    });
};


var createFoods = function() {
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
    var foodObjects = [];
    var _dirname = './app/db/fixtures/foods/';
    console.log("Reading files from %s ...", _dirname);
    var filenames = fs.readdirSync(_dirname);
    async.forEachOfLimit(filenames, 100, function(filename, index, callback) {
        console.log("Parsing %s ...", filename);
        fs.readFile(_dirname + filename, function (err, data) {
            if (err) return callback(err);
            var foodObj = filterOutFoods(JSON.parse(data), USDA_NUTRIENTS);
            foodObjects.push(foodObj);
            console.log("%d) stored %s ", index, filename);
            callback();
        });
    }, function(err) {
        if (err) console.error(err.message);
        // All the async calls finished, pre-populate the db now
        console.log("Saving to db...");
        Food.collection.insert(foodObjects, function (err, foodsDocs) {
            if(err) {
                console.error("Error Bulk Importing");
            } else {
                console.log("Success. Imported all documents!");
                console.log("total amount: ", foodsDocs.insertedCount);
                console.log("First docs name: ", foodsDocs.ops[0].name);
            }
        });
    }); // End Async call
};


module.exports = {
    createWorkouts: createWorkouts,
    createFoods: createFoods
};