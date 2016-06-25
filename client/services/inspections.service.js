(function () {
    'use strict';

    angular.module('apiaryApp')
        .factory('inspectionService', inspectionService);

    inspectionService.$inject = ['$http'];    
    function inspectionService($http) {

        var service = {
            list: list,
            create: create
        };

        return service;

        function list(hiveId) {
            return $http.get('/api/hives/' + hiveId + '/inspections')
                .then(function (response) {
                    return response.data;
                });
        }

        function create(inspection, hive) {
            return $http.post('/api/hives/' + hive._id + '/inspections', inspection)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();