(function () {
    'use strict';

    angular.module('apiaryApp').component('hiveDetail', {
        templateUrl: 'components/hives/detail/hive-detail.component.html',
        controllerAs: 'vm',
        controller: HiveDetailController,
        bindings: {
            hive: '<'
        },
        require: {
            parent: '^apiaryHives'
        }
    });

    HiveDetailController.$inject = ['hiveService'];
    function HiveDetailController(hiveService) {
        var vm = this;

    }

})();