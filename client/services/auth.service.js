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
            // saveToken: saveToken,
            // getToken: getToken,
            currentUser: currentUser
        };

        return service;

        // function saveToken(token) {
        //     $window.localStorage['apiary-token'] = token;
        // };

        // function getToken() {
        //     return $window.localStorage['apiary-token'];
        // };

        function logout() {
            tokenService.clearToken();
           // $window.localStorage.removeItem('apiary-token');
            $location.path('/home');
        }

        function register(user) {
            return $http.post('/api/register', user).then(function (response) {
                tokenService.saveToken(response.data.token);
            });
        }

        function login(user) {
            return $http.post('/api/login', user).then(function (response) {
                tokenService.saveToken(response.data.token);
                //console.log('token saved');
            });
        }

        function isLoggedIn() {
            var token = tokenService.getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }  

        function currentUser() {
            if (isLoggedIn) {
                var token = tokenService.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    firstName: payload.firstName,
                    lastName: payload.lastName
                };
            }
        }
    }
})();