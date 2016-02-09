angular.module('MainCtrl',[])
    .controller('MainController', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
        $scope.openLeftMenu = function() {
            console.log("clicked on toggle button");
            $mdSidenav('left').toggle();
        };
        // ICONS: https://design.google.com/icons/
        var menu = {
            social: [
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
            health: [
                {
                    link : '',
                    title: 'Fitness',
                    icon: 'fitness_center'
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
            admin: [
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

        $scope.socialMenu = menu.social;
        $scope.healthMenu = menu.health;
        $scope.adminMenu = menu.admin;
    }]);

