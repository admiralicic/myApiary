(function () {
    'use strict';

    angular.module('apiaryApp').component('apiaryHives', {
        templateUrl: 'components/hives/apiary-hives.component.html',
        controllerAs: 'vm',
        controller: HivesController,
        bindings: {
            $router: '<'
        }
    });

    HivesController.$inject = ['authentication']
    function HivesController(authentication) {
        var vm = this;
        vm.isLoggedIn = authentication.isLoggedIn();
        
        vm.$routerOnActivate = function (next, prev) {
            
            if (!authentication.isLoggedIn()) {
                vm.$router.navigate(['Login']);
            }
        };

        vm.$onChanges = function () {
        };
        
    };
})();