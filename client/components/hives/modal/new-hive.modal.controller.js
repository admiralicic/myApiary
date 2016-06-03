(function () {
    'use strict';

    angular.module('apiaryApp').controller('newHiveController', newHiveController);

    newHiveController.$inject = ['$uibModalInstance'];    
    function newHiveController($uibModalInstance) {
        var vm = this;

        vm.modal = {
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        }
    };
    
})();