(function () {
    'use strict';

    angular.module('apiaryApp').factory('hiveService', hivesService);

    hivesService.$inject = ['$http', 'authentication'];
    function hivesService($http, authentication) {


        var service = {
            list: list,
            detail: detail,
            create: create,
            update: update,
            deleteHive: deleteHive
        };

        return service;

        function list() {
            return $http.get('/api/hives')
                .then(function (response) {
                    return response.data;
                });
        }

        function detail(hiveId) {
            return $http.get('/api/hives/' + hiveId)
                .then(function (response) {
                    return response.data; 
                });
        }

        function create(hive) {
            return $http.post('/api/hives', hive)
                .then(function (response) {
                    return response.data;
                });
        }

        function update(hive) {
            return $http.put('/api/hives/' + hive._id, hive)
                .then(function (response) {
                    return response.data; 
                });
        }

        function deleteHive(hive) {
            return $http.delete('/api/hives/' + hive._id)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();