(function () {
    'use strict';

    angular.module('apiaryApp').factory('hiveService', hivesService);

    hivesService.$inject = ['$http', 'authentication'];    
    function hivesService($http, authentication) {

        var head = {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        }

        var service = {
            list: list
        };

        return service;

        function list() {
            return $http.get('/api/hives', head);
        }
    }
})();