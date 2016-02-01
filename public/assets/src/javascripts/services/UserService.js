angular.module('UserService',[]).factory('User', ['$http', function($http){
    return {
        // Make a call to the backend to retrieve all nerds
        get: function() {
            return $http.get('/api/users')
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        },
        create: function(userData) {
            return $http.post('/users', userData)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        },
        put: function(id, newData) {
            return $http.put('/users/' + id)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        },
        delete: function(id) {
            return $http.delete('/users/' + id)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        }
    };
}]);