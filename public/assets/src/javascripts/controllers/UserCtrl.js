angular.module('UserCtrl',[])
    .controller('UserController', ['$scope', 'User', function($scope, User){
        $scope.users = User.get();
    }]);