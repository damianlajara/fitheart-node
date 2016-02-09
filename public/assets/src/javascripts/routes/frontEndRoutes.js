angular.module('frontEndRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/users', {
           templateUrl: 'views/user.html',
            controller: 'UserController'
        });
    $locationProvider.html5Mode(true);
}]);