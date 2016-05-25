(function () {
    'use strict';

    angular.module('apiaryApp').component('registration', {
        templateUrl: 'components/user/registration/registration.component.html',
        controllerAs: 'vm',
        controller: RegistrationController,
        bindings: {
            $router: '<'
        }
    });

    RegistrationController.$inject = ['authentication']    
    function RegistrationController(authentication) {
        var vm = this;

        vm.formError = '';
        
        vm.credentials = {
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        };
        
        vm.$onInit = function () {
            // vm.formError = 'Just testing error notification!';

        };

        vm.$routerOnActivate = function (next, previous) {

        };

        vm.onSubmit = function () {
            authentication.register(vm.credentials)
                .then(function (response) {
                    vm.$router.navigate(['Home']);
                })
                .catch(function (err) {
                vm.formError = err.data.message;
            });
                
        };
    }
})();