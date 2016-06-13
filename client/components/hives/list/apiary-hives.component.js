(function () {
    'use strict';

    angular.module('apiaryApp').component('apiaryHives', {
        templateUrl: 'components/hives/list/apiary-hives.component.html',
        controllerAs: 'vm',
        controller: HivesController,
        bindings: {
            $router: '<'
        }
    });

    HivesController.$inject = ['$mdSidenav', 'authentication', 'hiveService', 'inspectionService'];
    function HivesController($mdSidenav, authentication, hiveService, inspectionService) {
        var vm = this;
        vm.hives = [];
        vm.inspections = [];
        vm.formError = '';
        
        vm.$routerOnActivate = function (next, prev) {
            vm.isLoggedIn = authentication.isLoggedIn();

            if (!vm.isLoggedIn) {
                vm.$router.navigate(['Home']);
            } else {
                hiveService.list().then(function (result) {
                    vm.hives = result.data;
                    vm.selected = vm.hives[0];
                }, function (error) {
                    console.log(error);
                });
            }
        };

        vm.select = function (value) {
            vm.selected = value;
            inspectionService.list(vm.selected._id).then(function (response) {
                vm.inspections = response.data;
            });
            var sidenav = $mdSidenav('left');
            if (sidenav.isOpen()) {
                sidenav.close();
            }
        }

    }
})();