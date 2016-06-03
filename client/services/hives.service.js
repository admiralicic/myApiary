(function () {
    'use strict';

    angular.module('apiaryApp').factory('hiveService', hivesService);

    hivesService.$inject = ['$http', 'authentication'];
    function hivesService($http, authentication) {


        var service = {
            list: list,
            detail: detail
        };

        return service;

        function list() {
            return $http.get('/api/hives');
        };

        function detail(hiveId) {
            return $http.get('/api/hives/' + hiveId);
        };
    }
})();