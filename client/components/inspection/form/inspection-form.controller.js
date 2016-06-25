(function () {
    'use strict';

    angular.module('apiaryApp').controller('NewInspectionController', NewInspectionController);

    NewInspectionController.$inject = ['$mdDialog'];    
    function NewInspectionController($mdDialog) {
        /*jshint validthis: true */
        var vm = this;
        
        vm.inspection = {};
        vm.types = ['Regular', 'Unscheduled', 'Emergency'];
        
        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.save = function () {
            $mdDialog.hide(vm.inspection);
        };
    }
})();