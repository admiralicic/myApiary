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
        vm.returnPage = '';

        vm.$routerOnActivate = function (next, prev) {
            if (prev) {
                vm.returnPage = prev.urlPath;
            }
        };

        vm.onSubmit = function () {
            authentication.login(vm.credentials)
                .then(function (response) {

                    // if (vm.returnPage && vm.returnPage !== 'register') {
                    //     vm.$router.navigateByUrl(vm.returnPage);
                    // } else {
                    // $rootScope.$broadcast('login');
                    vm.$router.navigate(['Hives']);
                    
                    // }
                })
                .catch(function (err) {
                    vm.credentials = {};
                    vm.formError = err.data.message;
                });
        };
    }
})();