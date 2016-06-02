(function () {
    'use strict';

    angular.module('apiaryApp').component('apiaryHives', {
        templateUrl: 'components/hives/list/apiary-hives.component.html',
        controllerAs: 'vm',
        controller: HivesController,
        bindings: {
            $router: '<'
        }
    });

    HivesController.$inject = ['authentication', 'hiveService']
    function HivesController(authentication, hiveService) {
        var vm = this;
        vm.hives = [];
        vm.formError = '';
        
        vm.$routerOnActivate = function (next, prev) {
            vm.isLoggedIn = authentication.isLoggedIn();

            if (!vm.isLoggedIn) {
                vm.$router.navigate(['Login']);
            } else {
                hiveService.list().then(function (result) {
                    vm.hives = result.data;
                }, function (error) {
                    console.log(error);
                });
            }
        };

        vm.$onChanges = function () {
        };
        
    };
})();