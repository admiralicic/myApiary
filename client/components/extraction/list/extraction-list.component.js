(function () {
    'use strict';

    angular.module('apiaryApp').component('extractionList', {
        templateUrl: 'components/extraction/list/extraction-list.component.html',
        controller: ExtractionListController,
        controllerAs: 'vm'
    });
    
    ExtractionListController.$inject = [];
    function ExtractionListController() {
        var vm = this;
        
    };
    
})();