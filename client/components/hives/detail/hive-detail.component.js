(function () {
    'use strict';

    angular.module('apiaryApp').component('hiveDetail', {
        templateUrl: 'components/hives/detail/hive-detail.component.html',
        controllerAs: 'vm',
        controller: HiveDetailController
    });

    HiveDetailController.$inject = ['$uibModal', 'hiveService'];
    function HiveDetailController($uibModal, hiveService) {
        var vm = this;
        vm.hive = {};

        vm.$routerOnActivate = function (next) {
            hiveService.detail(next.params.hiveId)
                .then(function (response) {
                    console.log('success');
                    vm.hive = response.data;
                }).catch(function (response) {
                    console.log('error');
                });



        };

        vm.$onInit = function () {

        };

        vm.popupEditHive = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'components/hives/modal/edit-hive.modal.html',
                controller: 'editHiveController',
                controllerAs: 'vm',
                resolve: {
                    hiveData: function () {
                        var hiveToUpdate = {
                            _id: vm.hive._id,
                            regNo: vm.hive.regNo,
                            queenYear: vm.hive.queenYear,
                            location: vm.hive.location,
                            note: vm.hive.note
                        };
                        return hiveToUpdate;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                vm.hive = data;
            });
        };

    };

})();