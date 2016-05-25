(function () {
    'use strict';

    angular.module('apiaryApp').factory('authentication', authentication);

    authentication.$inject = ['$http', '$window'];    
    function authentication($http, $window) {
        
        var service = {
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            saveToken: saveToken,
            getToken: getToken,
            currentUser: currentUser
        };

        return service;

        function saveToken(token) {
            $window.localStorage['apiary-token'] = token;
        };

        function getToken() {
            return $window.localStorage['apiary-token'];
        };

        function logout() {
            $window.localStorage.removeItem('apiary-token');
        };

        function register(user) {
            return $http.post('/register', user).then(function (response) {
                saveToken(response.data.token);
            });
        };

        function login(user) {
            return $http.post('/login', user).then(function (response) {
                saveToken(response.data.token);
            });
        };

        function isLoggedIn() {
            var token = getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };  

        function currentUser() {
            if (isLoggedIn) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    firstName: payload.firstName,
                    lastName: payload.lastName
                };
            }
        };
    };
})();