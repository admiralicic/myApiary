(function () {
    'use strict';

    angular.module('apiaryApp').controller('editHiveController', editHiveController);

    editHiveController.$inject = ['$uibModalInstance', 'hiveData', 'hiveService'];
    function editHiveController($uibModalInstance, hiveData, hiveService) {
        var vm = this;  
        vm.formData = hiveData;
        
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
                vm.formError = 'Some required fields are empty';
                return false;
            } else {
                vm.doUpdateHive(vm.formData);
            }
        };

        vm.doUpdateHive = function (formData) {
            hiveService.update({
                id: hiveData._id,
                regNo: formData.regNo,
                queenYear: formData.queenYear,
                location: formData.location,
                note: formData.note
            }).then(function (response) {
                vm.modal.close(response.data);
            }, function (error) {
                vm.formError = 'Data has not been saved, please try again';
            });

            return false;
        };
    };
})();