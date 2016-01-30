var angular = require('angular');

// Require directory only so browserify can search for the index.js file by default and require it's dependencies
require('./controllers');
require('./routes');
require('./services');

angular.module('fitHeart', ['ngRoute', 'frontEndRoutes', 'MainCtrl', 'UserCtrl', 'UserService']);