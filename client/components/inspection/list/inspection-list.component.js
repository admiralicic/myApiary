(function () {
    'use strict';

    angular.module('apiaryApp').component('inspectionList', {
        templateUrl: 'components/inspection/list/inspection-list.component.html',
        controller: InspectionController,
        controllerAs: 'vm',
        require: {
            'parent': '^hiveDetail'
        }
    });

    InspectionController.$inject = ['inspectionService'];
    function InspectionController(inspectionService) {
        var vm = this;
        vm.inspection = [];
        
        vm.$onInit = function () {
            vm.hiveId = vm.parent.hiveId;

            inspectionService.list(vm.hiveId)
                .then(function (response) {
                    vm.inspections = response.data;
                }, function (response) {
                    console.log(response);
                });
        };


    }

})();