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

    HivesController.$inject = ['authentication', '$uibModal', 'hiveService']
    function HivesController(authentication, $uibModal, hiveService) {
        var vm = this;
        vm.hives = [];
        vm.formError = '';
        
        vm.$routerOnActivate = function (next, prev) {
            // vm.isLoggedIn = authentication.isLoggedIn();

            // if (!vm.isLoggedIn) {
            //     vm.$router.navigate(['Login']);
            // } else {
                hiveService.list().then(function (result) {
                    vm.hives = result.data;
                }, function (error) {
                    console.log(error);
                });
            // }
        };

        vm.$onChanges = function () {
        };

        vm.showDetail = function (hive) {
            vm.$router.navigate(['HiveDetail', { hiveId: hive._id }, 'Inspections']);
        };

        vm.popupNewHive = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'components/hives/modal/new-hive.modal.html',
                controller: 'newHiveController',
                controllerAs: 'vm',
                windowClass: 'center-modal'
            });

            modalInstance.result.then(function (data) {
                vm.hives.push(data);
            });
        };
        
    };
})();