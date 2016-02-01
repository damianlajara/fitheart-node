angular.module('MainCtrl',[])
    .controller('MainController', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
        $scope.openLeftMenu = function() {
            console.log("clicked on toggle button");
            $mdSidenav('left').toggle();
        };
        $scope.menu = [
            {
                link : '',
                title: 'Dashboard',
                icon: 'dashboard'
            },
            {
                link : '',
                title: 'Friends',
                icon: 'group'
            },
            {
                link : '',
                title: 'Messages',
                icon: 'message'
            }
        ];
        $scope.admin = [
            {
                link : '',
                title: 'Trash',
                icon: 'delete'
            },
            {
                link : 'showListBottomSheet($event)',
                title: 'Settings',
                icon: 'settings'
            }
        ];
    }]);

