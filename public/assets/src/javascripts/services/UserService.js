angular.module('UserService',[]).factory('User', ['$http', function($http){
    return {
        // Make a call to the backend to retrieve all users
        get: function() {
            //return $http.get('/api/users'); //Returns a promise
            return $http.get('/api/users')
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        },
        create: function(userData) {
            return $http.post('/api/users', userData)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        },
        put: function(id, newData) {
            return $http.put('/api/users/' + id)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        },
        delete: function(id) {
            return $http.delete('/api/users/' + id)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        }
    };
}]);