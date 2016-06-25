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
                    //vm.hives = result.data;
                    vm.hives = result;
                    vm.selected = vm.hives[0];
                }, function (error) {
                    console.log(error);
                });
            }
        };

        vm.select = function (value) {
            vm.selected = value;
            inspectionService.list(vm.selected._id).then(function (response) {
                vm.inspections = response;
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

            var sidenav = $mdSidenav('left');
            if (sidenav.isOpen()) {
                sidenav.close();
            }

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
                vm.formError = '';
                if (mode === 'edit') {
                    updateHive(hive);
                } else {
                    addHive(hive);
                }
            }, function () {
                console.log('Cancelled');
            });
        };

        vm.showConfirmDialog = function ($event) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete selected hive?')
                .textContent('You will not be able to undo this operation.')
                .targetEvent($event)
                .ok('Yes')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                deleteHive();
            }, function () {
                vm.openToast('Operation canceled');
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
                // vm.selected = response.data;
                vm.selected = response;
                vm.hives[vm.hives.indexOf(hive)].regNo = vm.selected.regNo;
                vm.openToast('Hive information updated!');
            }, function () {
                vm.formError = 'Error updating hive';
                vm.openToast(vm.formError);
            });
        }

        function addHive(hive) {
            hiveService.create(hive).then(function (response) {
                // var newHive = response.data;
                var newHive = response;
                vm.hives.push(newHive);
                vm.select(newHive);
                vm.openToast('New hive added!');
            }, function (response) {
                vm.formError = 'Error creating hive!';
                vm.openToast(vm.formError);
            });
        }

        function deleteHive() {
            hiveService.deleteHive(vm.selected).then(function () {
                vm.openToast('Hive deleted');
                var currentIndex = vm.hives.indexOf(vm.selected);
                vm.hives.splice(currentIndex, 1);
                vm.select(vm.hives[currentIndex - 1]);
            }, function () {
                vm.formError = 'Error deleting hive';
                vm.openToast(vm.formError);
            });
        }


    }
})();