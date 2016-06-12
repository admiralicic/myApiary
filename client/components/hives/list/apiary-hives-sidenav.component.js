(function () {
    'use strict';

    angular.module('apiaryApp').component('hivesSidenav', {
        templateUrl: 'components/hives/list/apiary-hives-sidenav.component.html',
        controller: HiveSidenavController,
        controllerAs: 'vm',
        bindings: {
            hives: '<'
        },
        require: {
            parent: 'apiaryHives'
        }
    });

    HiveSidenavController.$inject = [];
    function HiveSidenavController() {
        var vm = this;
        
        vm.searchText = '';
    };
})();