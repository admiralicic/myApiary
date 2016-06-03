(function () {
    'use strict';

    angular.module('apiaryApp').controller('newHiveController', newHiveController);

    newHiveController.$inject = ['$uibModalInstance', 'hiveService'];    
    function newHiveController($uibModalInstance, hiveService) {
        var vm = this;
        vm.formData = {};
        
        vm.modal = {
            close: function (result) {
                $uibModalInstance.close(result);  
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        };

        vm.onSubmit = function () {
            vm.formError = '';
            if (!vm.formData.regNo || !vm.formData.queenYear || !vm.formData.location) {
                vm.formError = 'All fields except \'note\' are required';
                return false;
            } else {
                vm.doAddHive(vm.formData);
            }
        };

        vm.doAddHive = function (formData) {
            hiveService.create({
                regNo: formData.regNo,
                queenYear: formData.queenYear,
                location: formData.location,
                note: formData.note
            }).then(function (response) {
                vm.modal.close(response.data);
            }, function (error) {
                vm.formError = 'Hive has not been saved, please try again';
            });

            return false;
        };
    };
    
})();