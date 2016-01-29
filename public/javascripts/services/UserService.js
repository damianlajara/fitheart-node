angular.module('UserService',[]).factory('User', ['$http', function($http){
    return {
        // Make a call to the backend to retrieve all nerds
        get: function() {
            return $http.get('/api/users');
        },
        create: function(userData) {
            return $http.post('/users', userData);
        },
        //put: function(id, newData) {
        //    return $http.put('/users/' + id);
        //},
        delete: function(id) {
            return $http.delete('/users/' + id);
        }
    }
}]);