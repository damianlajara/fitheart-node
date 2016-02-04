angular.module('MainCtrl',[])
    .controller('MainController', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
        $scope.openLeftMenu = function() {
            console.log("clicked on toggle button");
            $mdSidenav('left').toggle();
        };
        // ICONS: https://design.google.com/icons/
        var menu = {
            socialMenu: [
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
            ],
            healthMenu: [
                {
                    link : '',
                    title: 'Fitness',
                    icon: 'rowing'
                },
                {
                    link : '',
                    title: 'Nutrition',
                    icon: 'battery_charging_full'
                },
                {
                    link : '',
                    title: 'Goals',
                    icon: 'timeline'
                },
                {
                    link : '',
                    title: 'Meal Plan',
                    icon: 'assignment'
                },
                {
                    link : '',
                    title: 'Mood',
                    icon: 'insert_emoticon'
                }
            ],
            adminMenu: [
                {
                    link : '',
                    title: 'Trash',
                    icon: 'delete'
                },
                {
                    link : '',
                    title: 'Settings',
                    icon: 'settings'
                }
            ]
        };

        $scope.socialMenu = menu.socialMenu;
        $scope.healthMenu = menu.healthMenu;
        $scope.adminMenu = menu.adminMenu;
    }]);

