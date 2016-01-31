angular.module('MainCtrl',[])
    .controller('MainController', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
        $scope.openLeftMenu = function() {
            console.log("clicken on toggle button");
            $mdSidenav('left').toggle();
        };
    }]);

