(function () {
    'use strict';

    angular.module('apiaryApp').component('inspectionList', {
        templateUrl: 'components/inspection/list/inspection-list.component.html',
        controller: InspectionController,
        controllerAs: 'vm',
        bindings: {
            inspections: '<'
        },
        require: {
            parent: '^apiaryHives'
        }
    });

    InspectionController.$inject = ['inspectionService'];
    function InspectionController(inspectionService) {
        var vm = this;

    }

})();