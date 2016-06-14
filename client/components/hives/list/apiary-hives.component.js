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

    HivesController.$inject = [
        '$mdSidenav', '$mdMedia', '$mdDialog', '$mdToast',
        'authentication', 'hiveService', 'inspectionService'];
    function HivesController(
        $mdSidenav, $mdMedia, $mdDialog, $mdToast,
        authentication, hiveService, inspectionService) {
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

        vm.addHive = function ($event) {
            var fullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            $mdDialog.show({
                templateUrl: 'components/hives/modal/new-hive.modal.html',
                parent: angular.element(document.body),
                tergetEvents: $event,
                controller: 'NewHiveController',
                controllerAs: 'vm',
                clickOutsideToClose: true,
                fullscreen: fullScreen,
            }).then(function (hive) {
                //call hiveService and add hive
                vm.hives.push(hive);
                //vm.select(hive);
                vm.openToast("New hive added!");
            }, function () {
                console.log('Cancelled');
            });
        }

        vm.openToast = function (message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(2000)
            );
        }
    

    }
})();