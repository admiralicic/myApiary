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

    RegistrationController.$inject = ['authentication'];    
    function RegistrationController(authentication) {
        var vm = this;

        vm.formError = '';
        vm.returnPage = '';
        
        vm.credentials = {
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        };

        vm.$routerOnActivate = function (next, prev) {
            // vm.returnPage = prev.urlPath;
        };

        vm.onSubmit = function () {
            authentication.register(vm.credentials)
                .then(function (response) {
                    // if (vm.returnPage && vm.returnPage !== 'login') {
                    //     vm.$router.navigateByUrl(vm.returnPage);
                    // } else {
                        vm.$router.navigate(['Hives']);
                    // }
                })
                .catch(function (err) {
                vm.formError = err.data.message;
            });
                
        };
    }
})();