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
        };

        vm.openHiveDialog = function ($event, mode /** add or edit */) {
            var fullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            var locals = {};
            if (mode === 'edit') { locals = vm.selected; }
            
            $mdDialog.show({
                templateUrl: 'components/hives/modal/hive.modal.html',
                parent: angular.element(document.body),
                tergetEvents: $event,
                controller: 'NewHiveController',
                controllerAs: 'vm',
                clickOutsideToClose: true,
                fullscreen: fullScreen,
                locals: locals
            }).then(function (hive) {
                if (mode === 'edit') {
                    updateHive(hive);
                } else {
                    addHive(hive);
                }

            }, function () {
                console.log('Cancelled');
            });
        };

        vm.openToast = function (message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(2000)
            );
        };

        function updateHive(hive) {
            hiveService.update(hive).then(function (response) {
                        vm.selected = response.data;
                        vm.hives[vm.hives.indexOf(hive)].regNo = vm.selected.regNo;
                        vm.openToast('Hive information updated!');
                    }, function () {
                        vm.openToast('Error updating hive!');
                    });
        }

        function addHive(hive) {
            hiveService.create(hive).then(function (response) {
                        var newHive = response.data;
                        vm.hives.push(newHive);
                        vm.select(newHive);
                        vm.openToast('New hive added!');
                    }, function () {
                        vm.openToast('Error creating hive!');
                    });
        }
    

    }
})();