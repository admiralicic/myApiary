(function () {
    'use strict';

    angular.module('apiaryApp').factory('authentication', authentication);

    authentication.$inject = ['$http', '$window', '$location', 'tokenService'];    
    function authentication($http, $window, $location, tokenService) {
        
        var service = {
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser
        };

        return service;

        function logout() {
            tokenService.clearToken();
            $location.path('/home');
        }

        function register(user) {
            return $http.post('/api/register', user).then(function (response) {
                var token = response.data.token;
                tokenService.saveToken(token);
            });
        }

        function login(user) {
            return $http.post('/api/login', user).then(function (response) {
                var token = response.data.token;
                tokenService.saveToken(token);
            });
                
        }

        function isLoggedIn() {
            var token = tokenService.getToken();

            if (token) {
                try {
                    var payload = JSON.parse($window.atob(token.split('.')[1]));
                    return payload.exp > Date.now() / 1000;
                } catch (error) {
                    return false;
                }
            } else {
                return false;
            }
        }  

        function currentUser() {
            if (isLoggedIn()) {
                var token = tokenService.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    firstName: payload.firstName,
                    lastName: payload.lastName
                };
            } else {
                return null;
            }
        }
    }
})();