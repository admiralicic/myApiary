(function () {
    'use strict';

    angular.module('apiaryApp').component('hiveDetail', {
        templateUrl: 'components/hives/detail/hive-detail.component.html',
        controllerAs: 'vm',
        controller: HiveDetailController
    });

    HiveDetailController.$inject = ['hiveService'];
    function HiveDetailController(hiveService) {
        var vm = this;
        vm.hive = {};
        
        vm.$routerOnActivate = function (next) {
            hiveService.detail(next.params.hiveId).then(function (response) {
                vm.hive = response.data;
            });
        };
        
        vm.$onInit = function () {
            
        };

    };
    
})();