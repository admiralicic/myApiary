(function () {
    'use strict';

    angular.module('apiaryApp').component('inspectionList', {
        templateUrl: 'components/inspection/list/inspection-list.component.html',
        controller: InspectionController,
        controllerAs: 'vm'
    });

    InspectionController.$inject = [];    
    function InspectionController() {
        var vm = this;    
    };
    
})();