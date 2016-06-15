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
            return $http.get('/api/hives');
        }

        function detail(hiveId) {
            return $http.get('/api/hives/' + hiveId);
        }

        function create(hive) {
            return $http.post('/api/hives', hive);
        }

        function update(hive) {
            return $http.put('/api/hives/' + hive._id, hive);
        }

        function deleteHive(hive) {
            return $http.delete('/api/hives/' + hive._id);
        }
    }
})();