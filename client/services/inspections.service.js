(function () {
    'use strict';

    angular.module('apiaryApp')
        .factory('inspectionService', inspectionService);

    inspectionService.$inject = ['$http'];    
    function inspectionService($http) {

        var service = {
            list: list
        };

        return service;

        function list(hiveId) {
            return $http.get('/api/hives/' + hiveId + '/inspections');
        };
    };
})();