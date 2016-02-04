angular.module('UserCtrl',[])
    .controller('UserController', ['$scope', 'User', function($scope, User){
        User.get().success(function(users) {
            $scope.users = users;
        });
        $scope.users = [
            {username: "damiansito", email: "haha@haha.com"},
            {username: "damiansito", email: "haha@haha.com"}
        ];
        $scope.hi = "hello"
    }]);