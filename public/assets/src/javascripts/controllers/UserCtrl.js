angular.module('UserCtrl',[])
    .controller('UserController', ['$scope', 'User', function($scope, User){
        User.get().success(function(users) {
            $scope.users = users;
        });
    }]);