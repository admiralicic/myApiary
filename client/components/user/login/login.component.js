(function () {
    'use strict';

    angular.module('apiaryApp').component('login', {
        templateUrl: 'components/user/login/login.component.html',
        controllerAs: 'vm',
        controller: LoginController,
        bindings: {
            $router: '<'
        }
    });

    LoginController.$inject = ['authentication'];
    function LoginController(authentication) {
        var vm = this;
        vm.formError = '';
        vm.credentials = {
            email: '',
            password: ''
        };

        vm.$routerOnActivate = function (next) {
        };

        vm.onSubmit = function () {
            authentication.login(vm.credentials)
                .then(function (response) {
                    vm.$router.navigate(['Home']);
                })
                .catch(function (err) {

                    vm.formError = err.data.message;
                });
        }
    }
})();