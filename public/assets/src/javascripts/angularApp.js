var angular = require('angular');
require('angular-route');
require('jquery'); // Material needs jquery
require('angular-material');
window.Chart = require('chart.js'); //angular chart-js needs it (TODO: Only works when I attach it to window, try to find out why)
require('angular-chartjs');

// Require directory only so browserify can search for the index.js file by default and require it's dependencies
require('./controllers/index');
require('./routes/index');
require('./services/index');

angular.module('fitHeart', ['ngRoute', 'chartjs', 'ngMaterial', 'frontEndRoutes', 'MainCtrl', 'HomeCtrl', 'UserCtrl', 'UserService']);