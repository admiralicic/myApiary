(function () {
    'use strict';

    angular.module('apiaryApp').component('navigation', {
        templateUrl: 'components/navigation/navigation.component.html',
        controllerAs: 'vm',
        controller: controller
    });

    controller.$inject = ['authentication']
    function controller(authentication) {
        var vm = this;

        vm.$onInit = function () {
            vm.isLoggedIn = authentication.isLoggedIn();

            vm.currentUser = {
                email: '',
                name: '',
                password: ''
            };
        };

        vm.login = function () {
            vm.isLoggedIn = true;
            vm.currentUser.email = 'admir.alicic@gmail.com';
            vm.currentUser.password = 'test';
            vm.currentUser.name = 'Admir Alicic';

            authentication.login(vm.currentUser);
        };

        vm.logout = function () {
            authentication.logout();
            vm.isLoggedIn = authentication.isLoggedIn();
        };

    };
})();